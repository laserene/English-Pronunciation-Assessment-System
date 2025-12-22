from typing import List

from fastapi import Depends
from sqlalchemy import or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models import Scenario
from app.models.script_lines import ScriptLine
from app.prompts import generate_script_lines_prompt
from app.services.ai import generate_json


async def create_scenario_service(
    scenario_name: str,
    vocabulary: List[str],
    level: str,
    user_id: int | None = None,
    description: str | None = None,
    image_path: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    new_scenario = Scenario(
        user_id=user_id,
        scenario_name=scenario_name,
        vocabulary=vocabulary,
        level=level,
        description=description,
        image_path=image_path,
    )
    db.add(new_scenario)
    await db.flush()  # Ensure the new scenario is written to the DB

    formatted_prompt = generate_script_lines_prompt.format(
        scenario_id=new_scenario.id,
        scenario_name=scenario_name,
        vocabulary=vocabulary,
        level=level,
        description=description,
    )
    script_lines_response = await generate_json(formatted_prompt)
    script_lines_data = script_lines_response.get("script_lines", [])

    script_line_objects = [
        ScriptLine(
            scenario_id=new_scenario.id,
            speaker=line["speaker"],
            turn_index=line["turn_index"],
            expected_text=line["expected_text"],
        )
        for line in script_lines_data
    ]

    db.add_all(script_line_objects)
    await db.commit()

    return new_scenario


async def get_scenario_by_id_service(
    scenario_id: int, db: AsyncSession = Depends(get_db)
):
    scenario = await db.get(Scenario, scenario_id)
    return scenario


async def get_scenarios_service(user_id: int, db: AsyncSession = Depends(get_db)):
    scenarios = await db.execute(
        select(Scenario).where(
            or_(Scenario.user_id == user_id, Scenario.user_id.is_(None))
        )
    )
    scenarios = scenarios.scalars().all()
    return scenarios


async def get_scenario_with_script_lines_service(
    scenario_id: int,
    user_id: int,
    db: AsyncSession = Depends(get_db),
):
    scenario = await db.execute(
        select(Scenario)
        .where(Scenario.id == scenario_id)
        .options(selectinload(Scenario.script_lines))
    )
    scenario = scenario.scalars().first()

    if not scenario or (scenario.user_id is not None and scenario.user_id != user_id):
        raise Exception("Scenario not found or access denied.")

    return scenario
