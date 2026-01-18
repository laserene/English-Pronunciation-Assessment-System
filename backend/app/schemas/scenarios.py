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
    scenario_name: str = Field(..., description="Name of the scenario")
    vocabulary: List[str] = Field(..., description="Vocabulary of the scenario")
    script_lines: List[ScriptLine] = Field(
        ..., description="Script lines of the scenario"
    )

    model_config = ConfigDict(from_attributes=True)


# EvaluateScriptLineResponse
class EvaluateScriptLineResponse(BaseModel):
    transcription: str = Field(
        ..., description="The user's spoken text after ASR transcription"
    )
    expected_text: str = Field(..., description="The reference / ground-truth text")
    transcription_phoneme: str = Field(
        ..., description="Phoneme representation of the transcribed speech"
    )
    expected_text_phoneme: str = Field(
        ..., description="Phoneme representation of the expected text"
    )
    wer: float = Field(
        ..., description="Word Error Rate between expected text and transcription"
    )
    cer: float = Field(
        ..., description="Character Error Rate between expected text and transcription"
    )

    model_config = ConfigDict(from_attributes=True)
