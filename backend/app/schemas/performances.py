from pydantic import BaseModel, Field


class CreatePerformanceRequest(BaseModel):
    wer: float = Field(..., description="Word Error Rate of the performance")
    cer: float = Field(..., description="Character Error Rate of the performance")
