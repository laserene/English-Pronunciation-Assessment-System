from typing import List, Optional

from pydantic import BaseModel, Field, ConfigDict

from app.schemas.script_lines import ScriptLine


# CreateScenarioRequest
class CreateScenarioRequest(BaseModel):
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
    image_path: Optional[str] = Field(
        None, description="The file path to an image associated with the scenario"
    )


# GetAllScenariosMetadataResponse
class GetScenarioMetadataResponse(BaseModel):
    id: int = Field(..., description="ID of the scenario")
    scenario_name: str = Field(..., description="Name of the scenario")
    level: str = Field(..., description="Level of the scenario")
    image_path: str = Field(..., description="Image path of the scenario")

    model_config = ConfigDict(from_attributes=True)


# GetScenarioWithScriptLinesResponse
class GetScenarioWithScriptLinesResponse(BaseModel):
    id: int = Field(..., description="ID of the scenario")
    vocabulary: List[str] = Field(..., description="Vocabulary of the scenario")
    script_lines: List[ScriptLine] = Field(
        ..., description="Script lines of the scenario"
    )

    model_config = ConfigDict(from_attributes=True)
