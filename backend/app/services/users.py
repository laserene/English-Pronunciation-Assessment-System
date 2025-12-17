from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database import get_db
from app.models import User
from app.services.auth import get_password_hash


async def register_service(
    username: str,
    email: str,
    password: str,
    first_name: str,
    last_name: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Register a new user with the provided email and password.
    """
    new_user = User(
        username=username,
        email=email,
        password_hash=get_password_hash(password),
        first_name=first_name,
        last_name=last_name,
    )
    db.add(new_user)  # Add new user to the session
    await db.flush()  # Send the insert to the database
    await db.refresh(new_user)  # Refresh to get the new user's data (like ID)
    return new_user


async def get_user_by_email_service(email: str, db: AsyncSession = Depends(get_db)):
    """
    Retrieve a user by their email.
    """
    user = await db.execute(select(User).filter(User.email == email))
    user = user.scalars().first()
    return user


async def get_user_by_id_service(user_id: int, db: AsyncSession = Depends(get_db)):
    """
    Retrieve a user by their ID.
    """
    user = await db.execute(select(User).filter(User.id == user_id))
    user = user.scalars().first()
    return user
