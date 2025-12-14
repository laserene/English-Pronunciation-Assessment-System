from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class MessageType(str, Enum):
    LLM = "LLM"
    USER = "USER"
    LLM_SUGGESTION = "LLM_SUGGESTION"


class MessageRequest(BaseModel):
    id: Optional[int] = Field(None, description="Unique identifier for the message")
    text: str = Field(..., min_length=1, description="The message content")
    audio_path: Optional[str] = Field(
        None, description="Path to the audio file associated with the message"
    )
    conversation_id: int = Field(..., description="ID of the conversation")
    user_id: Optional[int] = Field(
        None, description="ID of the user sending the message"
    )
    type: MessageType = Field(
        ..., description="Type of the message (LLM, USER, LLM_SUGGESTION)"
    )
