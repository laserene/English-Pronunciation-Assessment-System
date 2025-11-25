from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth import auth_routers
from app.database import engine, Base
from app.models import User, Conversation, Message
from app.routers import user_routers, conversation_routers, message_routers

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield

    await engine.dispose()


app = FastAPI(
    title="AI English Practice App",
    description="Practice English speaking with AI characters",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routers)
app.include_router(user_routers)
app.include_router(conversation_routers)
app.include_router(message_routers)

