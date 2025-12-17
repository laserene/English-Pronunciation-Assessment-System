from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Integer, String

from app.database import Base


class User(Base):
    __tablename__ = "users"  # "user" is reserved in PostgreSQL

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)

    username = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
