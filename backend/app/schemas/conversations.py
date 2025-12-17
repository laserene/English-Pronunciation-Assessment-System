from typing import Optional

from pydantic import BaseModel, Field


class ConversationRequest(BaseModel):
    id: Optional[int] = Field(
        None, description="The unique identifier of the conversation"
    )
    user_id: int = Field(
        ..., description="The ID of the user who owns the conversation"
    )
