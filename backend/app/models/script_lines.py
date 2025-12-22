from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class ScriptLine(Base):
    __tablename__ = "script_lines"

    id = Column(Integer, primary_key=True)
    scenario_id = Column(
        Integer, ForeignKey("scenarios.id", ondelete="CASCADE"), nullable=False
    )

    speaker = Column(Enum("user", "ai", name="speaker_type"), nullable=False)
    turn_index = Column(Integer, nullable=False)
    expected_text = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    scenario = relationship("Scenario", back_populates="script_lines")
