from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    backend_url: str
    uploads_folder: str
    sqlalchemy_database_url: str
    groq_api_key: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    refresh_token_expire_days: int
    elevenlabs_api_key: str
    elevenlabs_voice_id: str
    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
