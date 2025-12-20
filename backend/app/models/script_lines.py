from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String

from app.database import Base


class ScriptLine(Base):
    __tablename__ = "script_lines"

    id = Column(Integer, primary_key=True)
    script_version_id = Column(
        Integer, ForeignKey("script_versions.id"), nullable=False
    )

    speaker = Column(Enum("user", "ai", name="speaker_type"), nullable=False)
    line_number = Column(Integer, nullable=False)
    text = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
