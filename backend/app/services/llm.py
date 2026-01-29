import json

from dotenv import load_dotenv

from app.llm import BaseLLM

load_dotenv()

llm = BaseLLM(model="groq/moonshotai/kimi-k2-instruct")


def generate_json(prompt: str) -> str:
    response = llm.chat(prompt)
    try:
        parsed_response = json.loads(response)
        return parsed_response
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse LLM response as JSON: {response}")
    except Exception as e:
        raise Exception(f"Failed to generate scripts: {e}")
