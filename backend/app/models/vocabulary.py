from sqlalchemy import Column, Integer, String, ForeignKey

from app.database import Base


class Vocabulary(Base):
    __tablename__ = "vocabularies"

    scenario_id = Column(
        Integer,
        ForeignKey("scenarios.id", ondelete="CASCADE"),
        primary_key=True,
    )

    word = Column(String, primary_key=True)
