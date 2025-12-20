from typing import Optional

from pydantic import BaseModel, Field


class ScenarioRequest(BaseModel):
    id: Optional[int] = Field(
        None, description="The unique identifier of the conversation"
    )
    user_id: int = Field(
        ..., description="The ID of the user who owns the conversation"
    )
    scenario_name: str = Field(..., description="The name of the conversation scenario")
    vocabulary: list[str] = Field(
        ..., description="A list of vocabulary words relevant to the scenario"
    )
    level: str = Field(
        ..., description="The difficulty level of the conversation scenario"
    )
    image_path: str = Field(
        None, description="The file path to an image associated with the scenario"
    )
