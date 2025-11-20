from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.conversation import Conversation
from app.models.user import User
from app.schemas import ConversationRequest

router = APIRouter(prefix="/api/conversations", tags=["conversations"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_conversation(
    conv_data: ConversationRequest,
    db: AsyncSession = Depends(get_db)
):
    """Create a new conversation"""
    # Verify user exists
    stmt = select(User).where(User.id == conv_data.user_id)
    result = await db.execute(stmt)
    if not result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    new_conversation = Conversation(user_id=conv_data.user_id)
    db.add(new_conversation)
    await db.commit()
    await db.refresh(new_conversation)

    return {
        "id": new_conversation.id,
        "user_id": new_conversation.user_id,
        "created_at": new_conversation.created_at
    }


@router.get("/user/{user_id}")
async def get_user_conversations(
    user_id: int,
    skip: int = 0,
    limit: int = 10,
    db: AsyncSession = Depends(get_db)
):
    """Get all conversations for a specific user"""
    # Verify user exists
    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    if not result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    stmt = select(Conversation).where(
        Conversation.user_id == user_id
    ).offset(skip).limit(limit)
    result = await db.execute(stmt)
    conversations = result.scalars().all()

    return [
        {
            "id": c.id,
            "user_id": c.user_id,
            "created_at": c.created_at
        }
        for c in conversations
    ]
