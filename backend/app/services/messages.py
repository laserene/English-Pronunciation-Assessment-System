from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Message, MessageType
from app.database import get_db


async def create_message_service(
    text: str,
    audio_path: str,
    conversation_id: int,
    user_id: int,
    type: MessageType,
    db: AsyncSession = Depends(get_db),
):
    new_message = Message(
        text=text,
        audio_path=audio_path,
        conversation_id=conversation_id,
        user_id=user_id,
        type=type,
    )
    db.add(new_message)
    await db.flush()
    await db.refresh(new_message)
    return new_message


async def get_messages_from_conversation_service(
    conversation_id: int, db: AsyncSession = Depends(get_db)
):
    messages = await db.execute(
        select(Message).where(Message.conversation_id == conversation_id)
    )
    messages = messages.scalars().all()
    return messages
