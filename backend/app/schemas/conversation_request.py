from pydantic import BaseModel

class ConversationRequest(BaseModel):
    user_id: int