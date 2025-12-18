from fastapi import Depends
from sqlalchemy import or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database import get_db
from app.models import Scenario


async def get_my_scenarios_service(user_id: int, db: AsyncSession = Depends(get_db)):
    scenarios = await db.execute(
        select(Scenario).where(
            or_(Scenario.user_id == user_id, Scenario.user_id.is_(None))
        )
    )
    scenarios = scenarios.scalars().all()
    return scenarios
