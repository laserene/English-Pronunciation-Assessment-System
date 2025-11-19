from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    uploads_folder: str
    sqlalchemy_database_url: str
    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
