from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database import get_db
from app.models import Scenario


async def get_conversations_from_user_service(
    user_id: int, db: AsyncSession = Depends(get_db)
):
    scenarios = await db.execute(
        select(Scenario).where(
            Scenario.user_id == user_id or Scenario.user_id.is_(None)
        )
    )
    scenarios = scenarios.scalars().all()
    return scenarios
