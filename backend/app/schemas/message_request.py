from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class SenderType(str, Enum):
    user = "user"
    bot = "bot"
    system = "suggestion"

class MessageRequest(BaseModel):
    text: str = Field(..., min_length=1)
    conversation_id: int
    user_id: int
    audio_path: Optional[str] = Field(None, max_length=200)
    sender_type: SenderType