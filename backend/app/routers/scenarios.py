from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.auth.oauth2 import get_current_user
from app.database import get_db
from app.schemas.scenarios import ScenarioRequest
from app.services.scenarios import create_scenario_scripts_service

router = APIRouter(prefix="/scenarios", tags=["scenarios"])


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
async def create_scenario_for_user(
    request: ScenarioRequest,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Placeholder implementation for creating a scenario for a user
    # In a real implementation, you would add logic to create and store the scenario in
    # the database
    return {"message": f"Scenario created for user {current_user.id}"}


@router.post("/{scenario_id}/script", status_code=status.HTTP_201_CREATED)
async def create_scenario_script(
    scenario_id: int,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Placeholder implementation for adding a script to a scenario
    # In a real implementation, you would add logic to associate the script with the
    # scenario
    try:
        scripts = await create_scenario_scripts_service(
            scenario_id=scenario_id,
            user_id=current_user.id,  # Use authenticated user's ID
            db=db,
        )
        return scripts
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create scenario scripts: {str(e)}",
        )
