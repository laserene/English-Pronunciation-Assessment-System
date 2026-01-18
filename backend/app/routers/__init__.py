from .auth import router as auth_routers
from .scenarios import router as scenario_routers
from .users import router as user_routers
from .ai import router as ai_routers

__all__ = ["user_routers", "auth_routers", "scenario_routers", "ai_routers"]
