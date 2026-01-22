import asyncio
import json
import os
import uuid
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.auth.oauth2 import get_current_user
from app.database import get_db
from app.helpers.audio import convert_to_wav
from app.schemas.scenarios import (
    GetScenarioMetadataResponse,
    GetScenarioWithScriptLinesResponse,
    EvaluateScriptLineResponse,
)
from app.services.scenarios import (
    create_scenario_service,
    evaluate_script_line_service,
    get_scenario_with_script_lines_service,
    get_all_scenarios_metadata_service,
)

router = APIRouter(prefix="/scenarios", tags=["scenarios"])

executor = ThreadPoolExecutor(max_workers=4)

UPLOAD_DIR = Path("uploads/scenarios")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_scenario(
    scenario_name: str = Form(...),
    vocabulary: str = Form(...),  # Will be JSON string
    level: str = Form(...),
    description: str = Form(...),
    image: Optional[UploadFile] = File(None),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Create a scenario with optional image upload
    """
    try:
        vocabulary_list = json.loads(vocabulary)
        image_path = None
        if image:
            allowed_types = {"image/jpeg", "image/png", "image/gif", "image/webp"}
            if image.content_type not in allowed_types:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
                )

            file_extension = image.filename.split(".")[-1]
            unique_filename = f"{uuid.uuid4()}.{file_extension}"
            file_path = UPLOAD_DIR / unique_filename

            with open(file_path, "wb") as buffer:
                content = await image.read()
                buffer.write(content)

            image_path = f"/uploads/scenarios/{unique_filename}"

        new_scenario = await create_scenario_service(
            user_id=current_user.id,
            scenario_name=scenario_name,
            vocabulary=vocabulary_list,
            level=level,
            description=description,
            image_path=image_path,
            db=db,
        )

        return {"message": "Scenario created successfully.", "scenario": new_scenario}

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid vocabulary format. Must be a valid JSON array.",
        )
    except Exception as e:
        # Clean up uploaded file if scenario creation fails
        if image_path and os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create scenario: {str(e)}",
        )


@router.get(
    "", response_model=list[GetScenarioMetadataResponse], status_code=status.HTTP_200_OK
)
async def get_all_scenarios_metadata(
    current_user=Depends(get_current_user), db: AsyncSession = Depends(get_db)
):
    """
    Get all scenarios metadata for the authenticated user.
    Now secure - users can only access their own scenarios.
    """
    try:
        scenarios = await get_all_scenarios_metadata_service(
            user_id=current_user.id,  # Use authenticated user's ID
            db=db,
        )
        return scenarios
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve all scenarios metadata: {str(e)}",
        )


@router.get(
    "/{scenario_id}/scripts",
    response_model=GetScenarioWithScriptLinesResponse,
    status_code=status.HTTP_200_OK,
)
async def get_scenario_with_script_lines(
    scenario_id: int,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Get scripts for a specific scenario belonging to the authenticated user.
    """
    try:
        (
            scenario_name,
            vocabulary,
            script_lines,
        ) = await get_scenario_with_script_lines_service(
            scenario_id=scenario_id,
            user_id=current_user.id,
            db=db,
        )
        return {
            "id": scenario_id,
            "scenario_name": scenario_name,
            "vocabulary": vocabulary,
            "script_lines": script_lines,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve scenario scripts: {str(e)}",
        )


@router.post(
    "/speech/submit",
    response_model=EvaluateScriptLineResponse,
    status_code=status.HTTP_200_OK,
)
async def evaluate_speech(
    audio: UploadFile = File(
        ...,
        description="User-recorded speech audio (webm/opus) for the current "
        "scenario turn",
    ),
    expected_text: str = Form(..., description="Reference text for evaluation"),
    current_user=Depends(get_current_user),
):
    try:
        suffix = ".webm"

        # Save uploaded file to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as f:
            f.write(await audio.read())
            temp_input_path = f.name  # full path to the temp file

        temp_wav_path = temp_input_path.replace(suffix, ".wav")

        loop = asyncio.get_event_loop()
        await loop.run_in_executor(
            executor, convert_to_wav, temp_input_path, temp_wav_path
        )

        evaluation = await loop.run_in_executor(
            executor, evaluate_script_line_service, temp_wav_path, expected_text
        )

        return evaluation
    except Exception as e:
        print(f"Failed to evaluate scenario script: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to evaluate scenario script: {str(e)}",
        )
