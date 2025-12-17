from datetime import datetime, timedelta, timezone
from typing import Any, Dict

from jose import JWTError, jwt

from app.config import settings


def create_token(
    data: Dict[str, Any],
    token_type: str = "access",
    expires_delta: timedelta | None = None,
) -> str:
    to_encode = data.copy()

    # Fix: Handle different expiration times for access and refresh tokens
    if expires_delta is None:
        if token_type == "refresh":
            expires_delta = timedelta(days=settings.refresh_token_expire_days)
        else:
            expires_delta = timedelta(minutes=settings.access_token_expire_minutes)

    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire, "type": token_type})
    encoded_jwt = jwt.encode(
        to_encode, settings.secret_key, algorithm=settings.algorithm
    )
    return encoded_jwt


def decode_token(token: str) -> Dict[str, Any] | None:
    """
    Decode JWT token and return payload.
    Returns None if token is invalid or expired.
    """
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[settings.algorithm]
        )
        return payload
    except JWTError:
        return None
