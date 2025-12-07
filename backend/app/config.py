from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    uploads_folder: str
    sqlalchemy_database_url: str
    groq_api_key: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    refresh_token_expire_days: int
    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
