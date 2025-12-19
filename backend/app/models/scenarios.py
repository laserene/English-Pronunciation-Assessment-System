from sqlalchemy import JSON, Column, Float, ForeignKey, Integer, String

from app.database import Base


class Scenario(Base):
    __tablename__ = "scenarios"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    topic = Column(String, nullable=False)
    vocabulary = Column(JSON, nullable=False)
    level = Column(String, nullable=False, default="beginner")
    image_path = Column(String, nullable=True)


class ScenarioScriptVersion(Base):
    __tablename__ = "scenario_scripts"

    id = Column(Integer, primary_key=True)
    scenario_id = Column(Integer, ForeignKey("scenarios.id"), nullable=False)

    turn_index = Column(Integer, nullable=False)
    speaker = Column(String, nullable=False)  # AI | USER
    expected_text = Column(String, nullable=False)
