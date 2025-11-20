from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.message import Message
from app.models.conversation import Conversation
from app.schemas import MessageRequest

router = APIRouter(prefix="/api/messages", tags=["messages"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_message(
    msg_data: MessageRequest,
    db: AsyncSession = Depends(get_db)
):
    """Create a new message"""
    # Verify conversation exists
    stmt = select(Conversation).where(
        Conversation.id == msg_data.conversation_id)
    result = await db.execute(stmt)
    if not result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )

    new_message = Message(
        text=msg_data.text,
        audio_path=msg_data.audio_path,
        sender_type=msg_data.sender_type,
        conversation_id=msg_data.conversation_id,
        user_id=msg_data.user_id
    )
    db.add(new_message)
    await db.commit()
    await db.refresh(new_message)

    return {
        "id": new_message.id,
        "text": new_message.text,
        "audio_path": new_message.audio_path,
        "sender_type": new_message.sender_type,
        "conversation_id": new_message.conversation_id,
        "user_id": new_message.user_id,
        "created_at": new_message.created_at
    }


@router.get("/conversation/{conversation_id}")
async def get_conversation_messages(
    conversation_id: int,
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
):
    """Get all messages in a conversation"""
    # Verify conversation exists
    stmt = select(Conversation).where(Conversation.id == conversation_id)
    result = await db.execute(stmt)
    if not result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )

    stmt = select(Message).where(
        Message.conversation_id == conversation_id
    ).offset(skip).limit(limit)
    result = await db.execute(stmt)
    messages = result.scalars().all()

    return [
        {
            "id": m.id,
            "text": m.text,
            "audio_path": m.audio_path,
            "sender_type": m.sender_type,
            "conversation_id": m.conversation_id,
            "user_id": m.user_id,
            "created_at": m.created_at
        }
        for m in messages
    ]
