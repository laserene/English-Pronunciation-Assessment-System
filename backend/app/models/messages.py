from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from app.database import Base
from datetime import datetime, timezone


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(
        Integer, ForeignKey("conversations.id"), nullable=False, index=True
    )

    sender = Column(String, nullable=False)  # USER | AI
    content_text = Column(String, nullable=True)
    audio_path = Column(String, nullable=True)

    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
