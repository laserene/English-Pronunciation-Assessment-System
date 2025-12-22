import json

from dotenv import load_dotenv

from app.llm import BaseLLM

load_dotenv()

llm = BaseLLM(model="groq/moonshotai/kimi-k2-instruct")


async def generate_json(prompt: str) -> str:
    response = await llm.achat(prompt)
    try:
        parsed_response = json.loads(response)
        return parsed_response
    except json.JSONDecodeError:
        raise ValueError(f"Failed to parse LLM response as JSON: {response}")
