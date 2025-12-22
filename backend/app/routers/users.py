from fastapi import APIRouter, Depends
from starlette import status

from app.auth.oauth2 import get_current_user

router = APIRouter(prefix="/me", tags=["users"])


@router.get("/protected", status_code=status.HTTP_200_OK)
async def protected_route(current_user=Depends(get_current_user)):
    """
    A protected route to verify authentication.
    """
    return {"current_user": current_user}


@router.get("/", status_code=status.HTTP_200_OK)
async def get_current_user_info(current_user=Depends(get_current_user)):
    """
    Get the authenticated user's information.
    """
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        # Add other fields you want to expose
    }
