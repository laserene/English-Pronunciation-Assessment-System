from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer

from app.database import Base


class ScriptVersion(Base):
    __tablename__ = "script_versions"

    id = Column(Integer, primary_key=True)
    scenario_id = Column(Integer, ForeignKey("scenarios.id"), nullable=False)

    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
