from pydantic import BaseModel, Field, ConfigDict


class TextToSpeechRequest(BaseModel):
    text: str = Field(..., description="The text to be converted to speech")
    model_config = ConfigDict(from_attributes=True)


class TextToSpeechResponse(BaseModel):
    audio_path: str = Field(
        ..., description="The file path of the generated speech audio content"
    )
    model_config = ConfigDict(from_attributes=True)
