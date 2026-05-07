import json

from dotenv import load_dotenv

from app.llm import BaseLLM

load_dotenv()

llm = BaseLLM(model="groq/llama-3.3-70b-versatile")


def generate_json(prompt: str) -> str:
    response = llm.chat(prompt)
    try:
        parsed_response = json.loads(response)
        return parsed_response
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse LLM response as JSON: {response}")
    except Exception as e:
        raise Exception(f"Failed to generate scripts: {e}")


def generate_recommendation_from_performances(prompt: str):
    try:
        response = llm.chat(prompt)
        return response
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse LLM response as JSON: {response}")
    except Exception as e:
        raise Exception(f"Failed to generate scripts: {e}")
