from dotenv import load_dotenv

from app.llm import BaseLLM

load_dotenv()

llm = BaseLLM(model="groq/moonshotai/kimi-k2-instruct")


async def generate_scenario_script(prompt: str) -> str:
    response = await llm.achat(prompt)
    return response
