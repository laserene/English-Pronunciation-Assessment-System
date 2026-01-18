from fastapi import APIRouter, Cookie, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.auth.jwt import create_token, decode_token
from app.database import get_db
from app.schemas.tokens import Token
from app.schemas.users import UserLoginRequest, UserRegisterRequest
from app.services.auth import authenticate_user
from app.services.users import (
    get_user_by_email_service,
    get_user_by_id_service,
    register_service,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(request: UserRegisterRequest, db: AsyncSession = Depends(get_db)):
    """
    Register a new user.
    """
    try:
        await register_service(
            username=request.username,
            email=request.email,
            password=request.password,
            first_name=request.first_name,
            last_name=request.last_name,
            db=db,
        )
        return {"message": "User registered successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to register: {str(e)}",
        )


@router.post("/login", response_model=Token)
async def login(
    request: UserLoginRequest, response: Response, db: AsyncSession = Depends(get_db)
):
    """
    Login user and return access and refresh tokens.
    """
    user = await get_user_by_email_service(request.email, db)
    if not authenticate_user(user, request.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    access_token = create_token(data={"sub": str(user.id)}, token_type="access")
    refresh_token = create_token(data={"sub": str(user.id)}, token_type="refresh")

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,  # HTTPS only
        samesite="lax",  # or "lax"
        max_age=60 * 60 * 24 * 7,  # 7 days
    )

    return {
        "access_token": access_token,
    }


@router.post("/refresh", response_model=Token)
async def refresh_access_token(
    response: Response,
    refresh_token: str | None = Cookie(default=None),
    db: AsyncSession = Depends(get_db),
):
    payload = decode_token(refresh_token)
    if payload is None or payload.get("type") != "refresh":
        raise HTTPException(status_code=401)

    user_id = payload.get("sub")
    user_id = int(user_id)
    user = await get_user_by_id_service(user_id, db)
    if not user:
        raise HTTPException(status_code=401)

    new_access_token = create_token({"sub": str(user.id)}, token_type="access")
    new_refresh_token = create_token({"sub": str(user.id)}, token_type="refresh")

    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
    )

    return {"access_token": new_access_token}


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(
        key="refresh_token",
        path="/",
        httponly=True,
        secure=False,
        samesite="lax",
    )
    return {"detail": "Logged out"}
