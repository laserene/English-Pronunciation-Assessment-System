from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.pool import StaticPool

from app.database import engine, Base
from app.routers import user_routes, conversation_routes, message_routes


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create tables on startup, clean up on shutdown"""
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

# Include Routers
app.include_router(user_routes.router)
app.include_router(conversation_routes.router)
app.include_router(message_routes.router)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
