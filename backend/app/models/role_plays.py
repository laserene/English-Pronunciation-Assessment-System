from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class RolePlay(Base):
    __tablename__ = "role_play"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    role_play_name = Column(String, nullable=False)
    user_role = Column(String, nullable=True)
    level = Column(
        Enum("beginner", "intermediate", "advanced", name="level_type"),
        nullable=False,
    )
    description = Column(String, nullable=True)
    image_path = Column(String, nullable=True)

    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
