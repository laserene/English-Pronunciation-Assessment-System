from fastapi import APIRouter, Path, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.orm import Session
from starlette import status
from app.models import Conversation
from app.database import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}/conversations", status_code=status.HTTP_200_OK)
async def get_conversations_from_user(
    user_id: int = Path(..., gt=0),
    conversation_id: int = Path(..., gt=0),
    db: Session = Depends(get_db)
):
    """
    Retrieve conversations for a specific user.
    """
    conversations = await db.execute(
        select(Conversation).where(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id
        )
    )

    conversations = conversations.scalars().all()
    # Handle case where conversation is not found
    if not conversations:
        raise HTTPException(status_code=404, detail="Not found")

    return {
        "conversations": conversations
    }
