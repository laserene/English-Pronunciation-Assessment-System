from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from app.auth.jwt import create_token
from app.database import get_db
from app.services.users import register_service, get_user_by_email_service
from app.services.auth import authenticate_user
from app.schemas import UserRequest, UserLoginRequest, Token


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(request: UserRequest, db: AsyncSession = Depends(get_db)):
    """
    Register a new user.
    """
    try:
        print(f"Here is pass {request.password}")
        new_user = await register_service(
            username=request.username,
            email=request.email,
            password=request.password,
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
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
