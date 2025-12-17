from litellm import (
    APIError,
    AuthenticationError,
    RateLimitError,
    acompletion,
    completion,
)


class BaseLLM:
    def __init__(self, model: str):
        self.model = model

    def chat(self, prompt: str):
        try:
            response = completion(
                model=self.model, messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message.content
        except AuthenticationError as e:
            print(f"Authentication failed: {e}")
        except RateLimitError as e:
            print(f"Rate limited: {e}")
        except APIError as e:
            print(f"API error: {e}")
        except Exception as e:
            raise RuntimeError(f"Undetected LiteLLM error: {e}") from e

    async def achat(self, prompt: str):
        try:
            response = await acompletion(
                model=self.model, messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message.content
        except AuthenticationError as e:
            print(f"Authentication failed: {e}")
        except RateLimitError as e:
            print(f"Rate limited: {e}")
        except APIError as e:
            print(f"API error: {e}")
        except Exception as e:
            raise RuntimeError(f"Undetected LiteLLM error: {e}") from e
