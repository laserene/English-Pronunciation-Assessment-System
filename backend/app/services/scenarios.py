from typing import List

import soundfile as sf
import torch
from jiwer import cer, wer
from sqlalchemy import or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.config import settings
from app.models import Scenario, Vocabulary
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
    image_path = f"{settings.backend_url}{image_path}" if image_path else None
    new_scenario = Scenario(
        user_id=user_id,
        scenario_name=scenario_name,
        level=level,
        description=description,
        image_path=image_path,
    )
    db.add(new_scenario)
    await db.flush()

    for word in vocabulary:
        new_word = Vocabulary(scenario_id=new_scenario.id, word=word)
        db.add(new_word)

    await db.commit()
    await db.refresh(new_scenario)
    return new_scenario


async def get_all_scenarios_metadata_service(user_id: int, db: AsyncSession):
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
    scenarios = await db.execute(
        select(Scenario).where(
            Scenario.id == scenario_id,
            or_(Scenario.user_id == user_id, Scenario.user_id.is_(None)),
        )
    )
    scenarios = scenarios.scalars().first()
    if not scenarios:
        raise Exception("Scenario not found or not authorized by user.")

    vocabulary = await db.execute(
        select(Vocabulary).where(Vocabulary.scenario_id == scenario_id)
    )
    vocabulary = vocabulary.scalars().all()
    vocabulary_words = [v.word for v in vocabulary]

    formatted_prompt = generate_script_lines_prompt.format(
        scenario_id=scenario_id,
        scenario_name=scenarios.scenario_name,
        vocabulary=vocabulary_words,
        level=scenarios.level,
        description=scenarios.description,
    )
    script_lines_response = generate_json(formatted_prompt)
    script_lines = script_lines_response.get("script_lines", [])

    return (scenarios.scenario_name, vocabulary_words, script_lines)


def evaluate_script_line_service(
    filepath: str,
    expected_text: str,
):
    # ASR
    waveform, _ = sf.read(filepath, dtype="float32")
    waveform = torch.from_numpy(waveform)
    transcription = convert_speech_to_text_service(waveform).lower()

    transcription_phoneme = text_to_phonemes(transcription)
    expected_phoneme = text_to_phonemes(expected_text)
    wer_score = round(wer(expected_phoneme, transcription_phoneme), 2)
    cer_score = round(cer(expected_phoneme, transcription_phoneme), 2)

    if wer_score > 1:
        wer_score = 1

    if cer_score > 1:
        cer_score = 1

    return {
        "transcription": transcription,
        "expected_text": expected_text,
        "transcription_phoneme": transcription_phoneme,
        "expected_phoneme": expected_phoneme,
        "wer": wer_score,
        "cer": cer_score,
    }
