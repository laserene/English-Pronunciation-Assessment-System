from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from app.models import Message
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
            conversation_id=request.conversation_id,
            sender_id=request.sender_id,
            content=request.content,
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
