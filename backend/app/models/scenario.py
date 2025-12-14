from sqlalchemy import Column, Integer, String, ForeignKey, Float
from database import Base


class Scenario(Base):
    __tablename__ = "scenarios"

    id = Column(Integer, primary_key=True)
    topic = Column(String, nullable=False)
    level = Column(String, nullable=False)


class ScenarioScript(Base):
    __tablename__ = "scenario_scripts"

    id = Column(Integer, primary_key=True)
    scenario_id = Column(Integer, ForeignKey("scenarios.id"), nullable=False)

    turn_index = Column(Integer, nullable=False)
    speaker = Column(String, nullable=False)  # AI | USER
    expected_text = Column(String, nullable=False)


class ScenarioPerformance(Base):
    __tablename__ = "scenario_performances"

    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("practice_sessions.id"), nullable=False)

    turn_index = Column(Integer, nullable=False)
    audio_path = Column(String, nullable=False)
    recognized_text = Column(String)

    pronunciation_score = Column(Float)
    vocabulary_score = Column(Float)
