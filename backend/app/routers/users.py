from fastapi import APIRouter, Path, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from app.database import get_db
from app.services.conversations import get_conversations_from_user_service

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}/conversations", status_code=status.HTTP_200_OK)
async def get_conversations_from_user(
    user_id: int = Path(..., gt=0),
    db: Session = Depends(get_db)
):
    """
    Retrieve conversations for a specific user.
    """
    try:
        conversations = await get_conversations_from_user_service(user_id=user_id, db=db)
        return conversations
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve conversations: {str(e)}"
        )
