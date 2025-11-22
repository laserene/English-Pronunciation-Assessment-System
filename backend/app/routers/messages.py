from fastapi import APIRouter, Path, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.orm import Session
from starlette import status
from app.models import Message
from app.database import get_db
from app.schemas import MessageRequest

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
        new_message = Message(
            conversation_id=request.conversation_id,
            sender_id=request.sender_id,
            content=request.content,
            timestamp=request.timestamp,
        )
        db.add(new_message)
        await db.commit()
        await db.refresh(new_message)

        return {"message": new_message}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create conversation: {str(e)}"
        )
