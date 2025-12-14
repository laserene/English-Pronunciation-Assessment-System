from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

engine = create_async_engine(
    settings.sqlalchemy_database_url,
    echo=False,
    future=True,
    pool_pre_ping=True,
)

async_session_local = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()


async def get_db():
    """Dependency for getting async database session"""
    async with async_session_local() as session:
        try:
            yield session
        finally:
            await session.close()
