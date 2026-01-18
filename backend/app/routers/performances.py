from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.oauth2 import get_current_user
from app.schemas.performances import CreatePerformanceRequest
from app.services.performances import (
    get_performances_service,
    create_performance_service,
)
from app.database import get_db

router = APIRouter(prefix="/performances", tags=["performances"])


@router.get("/", status_code=status.HTTP_200_OK)
async def get_performances(
    current_user=Depends(get_current_user), db: AsyncSession = Depends(get_db)
):
    """
    Get the authenticated user's performances.
    """
    try:
        print("Fetching performances for user:", current_user.id)
        performances = await get_performances_service(current_user.id, db=db)
        return {"performances": performances}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch performances: {str(e)}",
        )


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_performance(
    request: CreatePerformanceRequest,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new performance for the authenticated user.
    """
    try:
        performance = await create_performance_service(
            wer=request.wer, cer=request.cer, user_id=current_user.id, db=db
        )
        return {"performance": performance}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create scenario: {str(e)}",
        )
