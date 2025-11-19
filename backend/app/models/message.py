from app.database import Base
from sqlalchemy import (
    Column, Integer, String, DateTime, Enum, ForeignKey
)
from datetime import datetime, timezone
import enum


class SenderType(str, enum.Enum):
    user = "user"
    bot = "bot"
    system = "suggestion"


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    audio_path = Column(String(200), nullable=True)
    sender_type = Column(Enum(SenderType), nullable=False)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
