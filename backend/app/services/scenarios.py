from fastapi import Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from starlette import status

from app.database import get_db
from app.models import Scenario


async def get_scenario_by_id_service(
    scenario_id: int, db: AsyncSession = Depends(get_db)
):
    scenario = await db.get(Scenario, scenario_id)
    return scenario


async def get_my_scenarios_service(user_id: int, db: AsyncSession = Depends(get_db)):
    scenarios = await db.execute(
        select(Scenario).where(
            or_(Scenario.user_id == user_id, Scenario.user_id.is_(None))
        )
    )
    scenarios = scenarios.scalars().all()
    return scenarios


async def create_scenario_scripts_service(
    scenario_id: int, user_id: int, db: AsyncSession = Depends(get_db)
):
    # Placeholder implementation for creating scenario scripts
    # In a real implementation, you would add logic to create and store the scripts in
    # the database
    scenario = await get_scenario_by_id_service(scenario_id, db)
    scenario_topic = scenario.topic
    scenario_vocabulary = scenario.vocabulary

    if not scenario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Scenario not found"
        )

    return {"message": f"Scenario scripts created for user {user_id}"}
