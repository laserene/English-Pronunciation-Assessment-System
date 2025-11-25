from sqlalchemy.orm import Session
from sqlalchemy.future import select
from app.models import Message
from fastapi import Depends
from app.database import get_db


async def create_message_service(conversation_id: int, sender_id: int, content: str, db: Session = Depends(get_db)):
    new_message = Message(
        conversation_id=conversation_id,
        sender_id=sender_id,
        content=content
    )
    db.add(new_message)
    await db.flush()
    await db.refresh(new_message)
    return new_message


async def get_messages_from_conversation_service(conversation_id: int, db: Session = Depends(get_db)):
    messages = await db.execute(
        select(Message).where(Message.conversation_id == conversation_id)
    )
    messages = messages.scalars().all()
    return messages
