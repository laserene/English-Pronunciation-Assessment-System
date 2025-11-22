from fastapi import APIRouter, Path, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.orm import Session
from starlette import status
from app.models import Conversation, Message
from app.database import get_db
from app.schemas import ConversationRequest

router = APIRouter(prefix="/conversations", tags=["conversations"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_conversation(
    request: ConversationRequest,
    db: Session = Depends(get_db)
):
    """
    Create a new conversation for a specific user.
    """
    try:
        new_conversation = Conversation(
            user_id=request.user_id
        )
        db.add(new_conversation)
        await db.commit()
        await db.refresh(new_conversation)

        return {"conversation": new_conversation}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create conversation: {str(e)}"
        )


@router.get("/{conversation_id}/messages", status_code=status.HTTP_200_OK)
async def get_messages_from_conversation(
    conversation_id: int = Path(..., gt=0),
    db: Session = Depends(get_db)
):
    """
    Retrieve messages for a specific conversation.
    """
    # Query messages directly
    messages = await db.execute(
        select(Message).where(Message.conversation_id == conversation_id)
    )
    messages = messages.scalars().all()

    return {"messages": messages}
