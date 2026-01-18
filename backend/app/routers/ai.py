from fastapi import APIRouter, Depends
from starlette import status

from app.auth.oauth2 import get_current_user
from app.schemas.ai import TextToSpeechRequest, TextToSpeechResponse
from app.services.elevenlabs import text_to_speech_service

router = APIRouter(prefix="/ai", tags=["ai"])


@router.get("/tts", response_model=TextToSpeechResponse, status_code=status.HTTP_200_OK)
async def convert_text_to_speech(
    request: TextToSpeechRequest, current_user=Depends(get_current_user)
):
    """
    Get the authenticated user's information.
    """
    audio_path = text_to_speech_service(text=request.text)
    return audio_path
