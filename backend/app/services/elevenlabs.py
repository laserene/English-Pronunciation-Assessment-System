import os
import uuid
from pathlib import Path
from dotenv import load_dotenv

from elevenlabs.client import ElevenLabs

from app.config import settings

load_dotenv()

AUDIO_DIR = Path("static/tts")
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

elevenlabs = ElevenLabs(
    base_url="https://api.elevenlabs.io",
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)


def text_to_speech_service(text: str) -> str:
    filename = f"{uuid.uuid4()}.mp3"
    audio_path = AUDIO_DIR / filename

    audio_stream = elevenlabs.text_to_speech.convert(
        text=text,
        voice_id="8eshQulzWsENvVIGmyBJ",
        model_id="eleven_multilingual_v2",
        output_format="mp3_44100_128",
    )

    with open(audio_path, "wb") as f:
        for chunk in audio_stream:
            f.write(chunk)

    return f"{settings.backend_url}/static/tts/{filename}"
