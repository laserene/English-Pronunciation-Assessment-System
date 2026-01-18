generate_script_lines_prompt = """
You are generating dialogue script lines for a language-learning scenario.
The conversation must be natural, realistic, and suitable for casual or formal 
real-life communication.
Do NOT use poetic, literary, or overly artistic language.

Input:
- scenario_id: {scenario_id}
- scenario_name: {scenario_name}
- vocabulary: {vocabulary}
- level: {level}
- description: {description}

Level definitions (STRICT):

Beginner (IELTS < 6.0):
- Use short, simple sentences (5–8 words on average)
- Focus on basic questions and direct answers
- Use concrete, everyday topics
- Avoid idioms, passive voice, and complex clauses
- Language should reflect limited fluency but remain natural

Intermediate (IELTS 6.0–7.0):
- Use clear, natural conversational English
- Include compound and some complex sentences
- Use basic connectors (because, so, but, although)
- Maintain context across turns
- Language should sound like a competent, everyday speaker

Advanced (IELTS ≥ 8.0):
- Use fluent, precise, and context-sensitive language
- Include complex sentence structures and embedded clauses
- Use discourse markers (however, therefore, in contrast)
- Express opinions, reasoning, and polite disagreement
- Maintain a professional or natural formal/casual tone as appropriate
- Language should sound confident, not poetic or literary

Instructions:
- Generate a coherent conversation based on the scenario.
- Alternate speakers strictly between "user" and "ai".
- Generate EXACTLY 5 PAIRS of dialogue (10 turns total) for Beginner and Intermediate level.
- Generate EXACTLY 10 PAIRS of dialogue (20 turns total) for Advanced level.
- Start turn_index at 1 and increment sequentially.
- Naturally incorporate the provided vocabulary. It is not strictly necessary to use all words, as well
as some words may not fit naturally. 
- Do NOT prioritize or introduce vocabulary items based on their order in the list. The opening lines should be determined 
solely by narrative flow, not by vocabulary position.
- Emotion is applicable with ai message only. Possible emotions are: neutral, annoyance, happy, rejoice, surprised, 
shy only. Try to make AI message as diverse in emotions as possible.
- Do NOT include id, created_at, or updated_at.
- Do NOT include any fields other than: scenario_id, speaker, turn_index, expected_text.
- Output ONLY valid JSON. No explanations. No markdown.

Required output format:
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
