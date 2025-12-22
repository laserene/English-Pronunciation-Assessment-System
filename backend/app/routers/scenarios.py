from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.auth.oauth2 import get_current_user
from app.database import get_db
from app.schemas.scenarios import (
    CreateScenarioRequest,
    GetScenarioWithScriptLinesResponse,
)
from app.services.scenarios import (
    create_scenario_service,
    get_scenario_with_script_lines_service,
    get_scenarios_service,
)

router = APIRouter(prefix="/scenarios", tags=["scenarios"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_scenario(
    request: CreateScenarioRequest,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
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


@router.get("/", status_code=status.HTTP_200_OK)
async def get_scenarios(
    current_user=Depends(get_current_user), db: AsyncSession = Depends(get_db)
):
    """
    Get scenarios for the authenticated user.
    Now secure - users can only access their own scenarios.
    """
    try:
        scenarios = await get_scenarios_service(
            user_id=current_user.id,  # Use authenticated user's ID
            db=db,
        )
        return scenarios
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve scenarios: {str(e)}",
        )


@router.get(
    "/{scenario_id}/scripts",
    status_code=status.HTTP_200_OK,
    response_model=GetScenarioWithScriptLinesResponse,
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
        scenario = await get_scenario_with_script_lines_service(
            user_id=current_user.id,
            scenario_id=scenario_id,
            db=db,
        )
        return scenario
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve scenario scripts: {str(e)}",
        )
