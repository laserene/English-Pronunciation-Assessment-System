from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    username: str = Field(..., min_length=5, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
