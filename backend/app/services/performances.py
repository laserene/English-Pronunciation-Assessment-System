from datetime import date

from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import Performance


async def get_performances_service(user_id: int, db: AsyncSession):
    stmt = (
        select(
            func.date(Performance.created_at).label("date"),
            Performance.wer,
            Performance.cer,
            Performance.session_count,
        )
        .where(Performance.user_id == user_id)
        .order_by(Performance.created_at.asc())
        .limit(20)
    )
    result = await db.execute(stmt)
    rows = result.all()

    # Convert to list of dicts for easier handling
    performances = [
        {
            "date": row.date,
            "wer": row.wer,
            "cer": row.cer,
            "session_count": row.session_count,
        }
        for row in rows
    ]
    return performances


async def create_performance_service(
    wer: float, cer: float, user_id: int, db: AsyncSession
):
    stmt = select(Performance).where(
        Performance.user_id == user_id,
        func.date(Performance.created_at) == date.today(),
    )

    result = await db.execute(stmt)
    performance = result.scalar_one_or_none()

    if performance:
        performance.wer = (performance.wer * performance.session_count + wer) / (
            performance.session_count + 1
        )

        performance.cer = (performance.cer * performance.session_count + cer) / (
            performance.session_count + 1
        )

        performance.session_count += 1
    else:
        performance = Performance(
            wer=wer,
            cer=cer,
            user_id=user_id,
            session_count=1,
        )
        db.add(performance)

    await db.commit()
    await db.refresh(performance)
    return performance
