from typing import Literal

from pydantic import BaseModel, Field


class GetScriptLinesResponse(BaseModel):
    speaker: Literal["user", "ai"] = Field(
        ..., description="The speaker of the script line"
    )
    turn_index: int = Field(..., description="The turn index of the script line")
    expected_text: str = Field(..., description="The expected text for the script line")
