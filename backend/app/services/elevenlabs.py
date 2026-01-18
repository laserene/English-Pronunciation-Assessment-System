import os
import uuid
from pathlib import Path
from dotenv import load_dotenv

from elevenlabs.client import ElevenLabs

load_dotenv()

AUDIO_DIR = Path("static/tts")
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)


def text_to_speech_service(text: str) -> str:
    filename = f"{uuid.uuid4()}.mp3"
    output_path = AUDIO_DIR / filename

    audio = elevenlabs.text_to_speech.convert(
        text=text,
        voice_id="8eshQulzWsENvVIGmyBJ",
        model_id="eleven_multilingual_v2",
        output_format="mp3_44100_128",
    )

    with open(output_path, "wb") as f:
        f.write(audio)

    return f"/static/tts/{filename}"
