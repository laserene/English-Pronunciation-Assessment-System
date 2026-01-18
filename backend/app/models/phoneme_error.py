from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Integer, ForeignKey, String

from app.database import Base


class PhonemeError(Base):
    __tablename__ = "phoneme_errors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    phoneme = Column(String, nullable=False)
    phoneme_error_count = Column(Integer, nullable=False)
    phoneme_total_count = Column(Integer, nullable=False)

    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
