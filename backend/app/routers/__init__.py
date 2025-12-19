from .auth import router as auth_routers
from .scenarios import router as scenario_routers
from .users import router as user_routers

__all__ = [
    "user_routers",
    "auth_routers",
    "scenario_routers",
]
