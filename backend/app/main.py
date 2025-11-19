from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.database import engine
from app.models import User, Conversation, Message


app = FastAPI(
    title="AI English Practice App",
    description="Practice English speaking with AI characters",
    version="0.1.0",
)

User.metadata.create_all(bind=engine)
Conversation.metadata.create_all(bind=engine)
Message.metadata.create_all(bind=engine)

# ---------------------------
# Include Routers
# ---------------------------
