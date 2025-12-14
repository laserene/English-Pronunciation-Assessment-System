from sqlalchemy import Column, Integer, String, ForeignKey, Float
from database import Base


class IELTSTest(Base):
    __tablename__ = "ielts_tests"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String)


class IELTSQuestion(Base):
    __tablename__ = "ielts_questions"

    id = Column(Integer, primary_key=True)
    test_id = Column(Integer, ForeignKey("ielts_tests.id"), nullable=False)

    part = Column(Integer, nullable=False)  # 1,2,3
    question_text = Column(String, nullable=False)
    cue_card = Column(String, nullable=True)


class IELTSResponse(Base):
    __tablename__ = "ielts_responses"

    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("practice_sessions.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("ielts_questions.id"), nullable=False)

    audio_path = Column(String, nullable=False)
    recognized_text = Column(String)

    pronunciation_score = Column(Float)
    vocabulary_score = Column(Float)
    fluency_score = Column(Float)
