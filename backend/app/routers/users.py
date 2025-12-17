from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.auth.oauth2 import get_current_user
from app.database import get_db
from app.services.conversations import get_conversations_from_user_service

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/protected", status_code=status.HTTP_200_OK)
async def protected_route(current_user=Depends(get_current_user)):
    """
    A protected route to verify authentication.
    """
    return {"current_user": current_user}


@router.get("/me", status_code=status.HTTP_200_OK)
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


@router.get("/me/conversations", status_code=status.HTTP_200_OK)
async def get_my_conversations(
    current_user=Depends(get_current_user), db: AsyncSession = Depends(get_db)
):
    """
    Get conversations for the authenticated user.
    Now secure - users can only access their own conversations.
    """
    try:
        conversations = await get_conversations_from_user_service(
            user_id=current_user.id,  # Use authenticated user's ID
            db=db,
        )
        return conversations
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve conversations: {str(e)}",
        )


@router.get("/me/scenarios", status_code=status.HTTP_200_OK)
async def get_my_scenarios(
    current_user=Depends(get_current_user), db: AsyncSession = Depends(get_db)
):
    """
    Get scenarios for the authenticated user.
    Now secure - users can only access their own scenarios.
    """
    try:
        scenarios = await get_conversations_from_user_service(
            user_id=current_user.id,  # Use authenticated user's ID
            db=db,
        )
        return scenarios
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve scenarios: {str(e)}",
        )
