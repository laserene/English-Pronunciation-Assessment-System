from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.auth.jwt import create_token, decode_token
from app.database import get_db
from app.schemas import Token, UserLoginRequest, UserRequest
from app.services.auth import authenticate_user
from app.services.users import (
    get_user_by_email_service,
    get_user_by_id_service,
    register_service,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(request: UserRequest, db: AsyncSession = Depends(get_db)):
    """
    Register a new user.
    """
    try:
        new_user = await register_service(
            username=request.username,
            email=request.email,
            password=request.password,
            first_name=request.first_name,
            last_name=request.last_name,
            db=db,
        )
        await db.commit()
        return {"user": new_user}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to register: {str(e)}",
        )


@router.post("/login", response_model=Token)
async def login(user_credentials: UserLoginRequest, db: AsyncSession = Depends(get_db)):
    """
    Login user and return access and refresh tokens.
    """
    try:
        user = await get_user_by_email_service(user_credentials.email, db)
        if not authenticate_user(user, user_credentials.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
            )

        access_token = create_token(data={"sub": str(user.id)}, token_type="access")
        refresh_token = create_token(data={"sub": str(user.id)}, token_type="refresh")

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}",
        )


@router.post("/refresh", response_model=Token)
async def refresh_access_token(refresh_token: str, db: AsyncSession = Depends(get_db)):
    """
    Get new access and refresh tokens using a valid refresh token.
    """
    try:
        # Decode the refresh token
        payload = decode_token(refresh_token)
        if payload is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"
            )

        # Verify it's actually a refresh token
        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type"
            )

        # Get user ID and verify user exists
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload"
            )

        user = await get_user_by_id_service(user_id, db)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

        # Generate new tokens
        new_access_token = create_token(data={"sub": str(user.id)}, token_type="access")
        new_refresh_token = create_token(
            data={"sub": str(user.id)}, token_type="refresh"
        )

        return {
            "access_token": new_access_token,
            "refresh_token": new_refresh_token,
            "token_type": "bearer",
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to refresh token: {str(e)}",
        )
