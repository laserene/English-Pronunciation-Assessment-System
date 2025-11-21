from pydantic import BaseModel, Field, Optional
from enum import Enum


class MessageType(str, Enum):
    LLM = "LLM"
    USER = "USER"
    LLM_SUGGESTION = "LLM_SUGGESTION"


class MessageCreateRequest(BaseModel):
    id: Optional[int] = Field(None,
                              description="Unique identifier for the message")
    text: str = Field(..., min_length=1, description="The message content")
    conversation_id: int = Field(..., description="ID of the conversation")
    user_id: int = Field(..., description="ID of the user sending the message")
    type: MessageType = Field(...,
                              description="Type of the message (LLM, USER, LLM_SUGGESTION)")
