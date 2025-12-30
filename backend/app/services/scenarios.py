from typing import List

import soundfile as sf
import torch
from jiwer import cer, wer
from sqlalchemy import or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.models import Scenario
from app.models.script_lines import ScriptLine
from app.prompts import generate_script_lines_prompt
from app.services.llm import generate_json
from app.services.wav2vec import convert_speech_to_text_service
from app.helpers.phoneme import text_to_phonemes


async def create_scenario_service(
    scenario_name: str,
    vocabulary: List[str],
    level: str,
    db: AsyncSession,
    user_id: int | None = None,
    description: str | None = None,
    image_path: str | None = None,
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


async def get_scenario_by_id_service(scenario_id: int, db: AsyncSession):
    scenario = await db.get(Scenario, scenario_id)
    return scenario


async def get_scenarios_service(user_id: int, db: AsyncSession):
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
    db: AsyncSession,
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


async def evaluate_script_line_service(
    filepath: str,
    user_id: int,
    scenario_id: int,
    turn_index: int,
    db: AsyncSession,
):
    script_line = (
        (
            await db.execute(
                select(ScriptLine)
                .join(Scenario, ScriptLine.scenario_id == Scenario.id)
                .where(
                    or_(
                        Scenario.user_id == user_id,
                        Scenario.user_id.is_(None),
                    ),
                    ScriptLine.scenario_id == scenario_id,
                    ScriptLine.turn_index == turn_index,
                )
            )
        )
        .scalars()
        .first()
    )

    if not script_line:
        raise Exception("Script line not found")

    expected_text = script_line.expected_text

    # ASR
    waveform, _ = sf.read(filepath, dtype="float32")
    waveform = torch.from_numpy(waveform)
    transcription = convert_speech_to_text_service(waveform).lower()

    return {
        "transcription": transcription,
        "expected_text": expected_text,
        "transcription_phoneme": text_to_phonemes(transcription),
        "expected_text_phoneme": text_to_phonemes(expected_text),
        "wer": wer(expected_text, transcription),
        "cer": cer(expected_text, transcription),
    }
