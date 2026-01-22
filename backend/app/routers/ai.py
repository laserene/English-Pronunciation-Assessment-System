import asyncio
from concurrent.futures import ThreadPoolExecutor

from fastapi import APIRouter, Depends
from starlette import status

from app.auth.oauth2 import get_current_user
from app.schemas.ai import TextToSpeechRequest, TextToSpeechResponse
from app.services.elevenlabs import text_to_speech_service

router = APIRouter(prefix="/ai", tags=["ai"])

executor = ThreadPoolExecutor(max_workers=4)


@router.post(
    "/tts", response_model=TextToSpeechResponse, status_code=status.HTTP_200_OK
)
async def convert_text_to_speech(
    request: TextToSpeechRequest, current_user=Depends(get_current_user)
):
    """
    Get the authenticated user's information.
    """
    try:
        loop = asyncio.get_event_loop()
        audio_path = await loop.run_in_executor(
            executor, text_to_speech_service, request.text
        )
        return {"audio_path": audio_path}
    except Exception as e:
        return {"error": f"Text-to-speech conversion failed: {str(e)}"}
