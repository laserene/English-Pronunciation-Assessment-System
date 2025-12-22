from datetime import datetime, timezone

from sqlalchemy import JSON, Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Scenario(Base):
    __tablename__ = "scenarios"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    scenario_name = Column(String, nullable=False)
    vocabulary = Column(JSON, nullable=False)
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

    script_lines = relationship(
        "ScriptLine",
        back_populates="scenario",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
