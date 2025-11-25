from sqlalchemy.orm import Session
from sqlalchemy.future import select
from app.models import Conversation
from fastapi import Depends
from app.database import get_db


async def create_conversation_service(user_id: int, db: Session = Depends(get_db)):
    new_conversation = Conversation(
        user_id=user_id
    )
    db.add(new_conversation)
    await db.flush()
    await db.refresh(new_conversation)
    return new_conversation


async def get_conversations_from_user_service(user_id: int, db: Session = Depends(get_db)):
    conversations = await db.execute(
        select(Conversation).where(
            Conversation.user_id == user_id
        )
    )
    conversations = conversations.scalars().all()
    return conversations
