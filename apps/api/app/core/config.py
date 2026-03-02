from __future__ import annotations

import re
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Job Tracker API"
    SECRET_KEY: str = "change_me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/job_tracker"
    CORS_ORIGINS: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

    @property
    def db_url(self) -> str:
        """Normalize DATABASE_URL for SQLAlchemy.

        Railway sometimes gives postgres:// but SQLAlchemy needs postgresql+psycopg2://
        """
        url = self.DATABASE_URL
        url = re.sub(r"^postgres://", "postgresql+psycopg2://", url)
        if url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
        return url

    @property
    def cors_origins(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


settings = Settings()
