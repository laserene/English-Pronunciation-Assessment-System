from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from app.database import get_db
from app.schemas import MessageRequest
from app.services.messages import create_message_service

router = APIRouter(prefix="/messages", tags=["messages"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_message(
    request: MessageRequest,
    db: Session = Depends(get_db),
):
    """
    Create a new message in a specific conversation.
    """
    try:
        new_message = await create_message_service(
            text=request.text,
            audio_path=request.audio_path,
            conversation_id=request.conversation_id,
            user_id=request.user_id,
            type=request.type,
            db=db
        )
        await db.commit()
        return {"message": new_message}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create message: {str(e)}"
        )
