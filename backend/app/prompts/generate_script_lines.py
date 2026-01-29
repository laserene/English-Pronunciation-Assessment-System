generate_script_lines_prompt = """
You are generating dialogue script lines for a language-learning scenario.
The conversation must be natural, realistic, and suitable for real-life communication.
Do NOT use poetic, literary, or overly artistic language.

Input:
- scenario_id (integer): {scenario_id}
- scenario_name: {scenario_name}
- vocabulary: {vocabulary}
- level: {level}
- description: {description}

IMPORTANT:
- Generate dialogue for ONLY the provided level.
- Return EXACTLY ONE conversation.
- Return EXACTLY ONE JSON object.
- Do NOT generate multiple conversations or multiple JSON objects.

Level guidelines (STRICT):

Beginner (IELTS < 6.0):
- Short, simple sentences (5–8 words)
- Basic questions and direct answers
- Everyday topics only
- No idioms, passive voice, or complex clauses

Intermediate (IELTS 6.0–7.0):
- Natural conversational English
- Some compound and complex sentences
- Use basic connectors (because, so, but, although)
- Maintain context across turns

Advanced (IELTS ≥ 8.0):
- Fluent, precise, context-aware language
- Complex sentence structures
- Use discourse markers (however, therefore, in contrast)
- Express opinions and reasoning naturally
- Confident, not literary

Instructions:
- Generate a coherent conversation based on the scenario.
- Alternate speakers strictly between "user" and "ai".
- Start turn_index at 1 and increment sequentially.
- Use the provided vocabulary naturally (not all words are required).
- Include "emotion" ONLY for ai messages.
- Possible emotions: neutral, annoyance, happy, rejoice, surprised, shy.
- Vary emotions when natural.
- Do NOT include any fields other than:
  scenario_id, speaker, turn_index, expected_text, emotion.

Turn count:
- Beginner and Intermediate: EXACTLY 5 pairs (10 turns)
- Advanced: EXACTLY 10 pairs (20 turns)

Output:
- Return ONLY valid JSON.
- No explanations.
- No markdown.

Required format:
{{
  "script_lines": [
    {{
      "scenario_id": <scenario_id>,
      "speaker": "user",
      "turn_index": 1,
      "expected_text": "..."
    }},
    {{
      "scenario_id": <scenario_id>,
      "speaker": "ai",
      "emotion": "happy",
      "turn_index": 2,
      "expected_text": "..."
    }}
  ]
}}
"""
