import tempfile

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.auth.oauth2 import get_current_user
from app.database import get_db
from app.helpers.audio import convert_to_wav
from app.schemas.scenarios import (
    CreateScenarioRequest,
    GetScenarioMetadataResponse,
    GetScenarioWithScriptLinesResponse,
)
from app.services.scenarios import (
    create_scenario_service,
    evaluate_script_line_service,
    get_scenario_with_script_lines_service,
    get_all_scenarios_metadata_service,
)

router = APIRouter(prefix="/scenarios", tags=["scenarios"])


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_scenario(
    request: CreateScenarioRequest,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Create a scenario router
    """
    try:
        # Use the authenticated user's ID
        new_scenario = await create_scenario_service(
            user_id=current_user.id,
            scenario_name=request.scenario_name,
            vocabulary=request.vocabulary,
            level=request.level,
            description=request.description,
            image_path=request.image_path,
            db=db,
        )
        return {"message": "Scenario created successfully.", "scenario": new_scenario}
    except Exception as e:
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
        vocabulary, script_lines = await get_scenario_with_script_lines_service(
            scenario_id=scenario_id,
            user_id=current_user.id,
            db=db,
        )
        return {
            "id": scenario_id,
            "vocabulary": vocabulary,
            "script_lines": script_lines,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve scenario scripts: {str(e)}",
        )


@router.post("/speech/submit", status_code=status.HTTP_200_OK)
async def evaluate_speech(
    audio: UploadFile = File(
        ...,
        description="User-recorded speech audio (webm/opus) for the current "
        "scenario turn",
    ),
    scenario_id: str = Form(
        ..., description="Unique identifier of the learning scenario"
    ),
    turn_index: str = Form(
        ..., description="Current dialogue turn index to evaluate against the script"
    ),
    expected_text: str = Form(..., description="Reference text for evaluation"),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        suffix = ".webm"

        # Save uploaded file to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as f:
            f.write(await audio.read())
            temp_input_path = f.name  # full path to the temp file

        temp_wav_path = temp_input_path.replace(suffix, ".wav")
        convert_to_wav(temp_input_path, temp_wav_path)

        evaluation = await evaluate_script_line_service(
            filepath=temp_wav_path,
            user_id=current_user.id,
            scenario_id=int(scenario_id),
            turn_index=int(turn_index),
            db=db,
        )
        return evaluation
    except Exception as e:
        print(f"Failed to evaluate scenario script: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to evaluate scenario script: {str(e)}",
        )
