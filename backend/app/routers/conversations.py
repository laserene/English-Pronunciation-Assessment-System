from fastapi import APIRouter, Path, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from app.database import get_db
from app.schemas import ConversationRequest
from app.services.conversations import create_conversation_service
from app.services.messages import get_messages_from_conversation_service

router = APIRouter(prefix="/conversations", tags=["conversations"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_conversation(
    request: ConversationRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new conversation for a specific user.
    """
    try:
        new_conversation = await create_conversation_service(user_id=request.user_id, db=db)
        await db.commit()
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
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieve messages for a specific conversation.
    """
    try:
        messages = await get_messages_from_conversation_service(conversation_id, db)
        await db.commit()
        return {"messages": messages}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve messages: {str(e)}"
        )
