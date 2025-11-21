from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime, timezone
import enum


class MessageType(enum.Enum):
    LLM = "LLM"
    USER = "USER"
    LLM_SUGGESTION = "LLM_SUGGESTION"


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    conversation_id = Column(Integer, ForeignKey(
        "conversations.id"), nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id"),
                     nullable=False, index=True)
    type = Column(Enum(MessageType), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="messages")
    conversation = relationship("Conversation", back_populates="messages")
