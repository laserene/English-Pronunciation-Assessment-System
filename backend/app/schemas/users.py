from pydantic import BaseModel, Field, EmailStr
from typing import Optional


class UserRequest(BaseModel):
    id: Optional[int] = Field(
        None, description="User ID, optional for new users")
    username: str = Field(..., min_length=3, max_length=20,
                          description="Username of the user")
    email: EmailStr = Field(..., max_length=120,
                            description="User email address")
    password: str = Field(..., min_length=6,
                          description="Password (min 6 characters)")
