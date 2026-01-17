from typing import Literal, Optional

from pydantic import BaseModel, Field, ConfigDict


class ScriptLine(BaseModel):
    speaker: Literal["user", "ai"] = Field(
        ..., description="The speaker of the script line"
    )
    emotion: Optional[str] = Field(
        None,
        description="Emotion of the AI script line. Not applicable to user script line",
    )
    turn_index: int = Field(..., description="The turn index of the script line")
    expected_text: str = Field(..., description="The expected text for the script line")

    model_config = ConfigDict(from_attributes=True)
