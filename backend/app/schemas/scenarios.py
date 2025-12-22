from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.script_lines import GetScriptLinesResponse


class CreateScenarioRequest(BaseModel):
    user_id: Optional[int] = Field(
        None, description="The ID of the user creating the scenario"
    )
    scenario_name: str = Field(..., description="The name of the conversation scenario")
    vocabulary: List[str] = Field(
        ..., description="A list of vocabulary words relevant to the scenario"
    )
    level: str = Field(
        ..., description="The difficulty level of the conversation scenario"
    )
    description: Optional[str] = Field(
        None, description="A brief description of the conversation scenario"
    )
    image_path: str = Field(
        None, description="The file path to an image associated with the scenario"
    )


class GetScenarioResponse(BaseModel):
    id: int
    scenario_name: str
    vocabulary: list[str]
    level: str
    description: Optional[str]
    image_path: Optional[str]


class GetScenarioWithScriptLinesResponse(GetScenarioResponse):
    script_lines: List[GetScriptLinesResponse] = Field(
        ..., description="A list of script lines associated with the scenario"
    )
