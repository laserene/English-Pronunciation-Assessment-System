# English Pronunciation Assessment System

An AI-powered system for evaluating English pronunciation through interactive conversations with an AI character. The system analyzes user speech, converts it into phoneme representations, and evaluates pronunciation quality while maintaining a real-time conversational experience.

## Features

* Interactive AI conversation interface
* Speech-to-text transcription
* Pronunciation evaluation pipeline
* Phoneme-based pronunciation analysis
* Real-time asynchronous audio processing
* AI character with lip-sync and emotion animation

## Tech Stack

### Backend

* FastAPI
* Python
* PostgreSQL

### Frontend

* React.js

### AI / ML

* Hugging Face models
* Speech-to-text models
* LLM integration

## Project Structure

```text
.
├── backend
│   ├── app
│   │   ├── auth
│   │   ├── helpers
│   │   ├── models
│   │   ├── prompts
│   │   ├── routers
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   ├── pyproject.toml
│   └── uv.lock
│
├── frontend
│   ├── public
│   │   └── Resources
│   ├── src
│   │   ├── live2d
│   │   ├── pages
│   │   ├── utils
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## Requirements

* Python 3.11+
* Node.js 18+
* uv package manager

## Backend Setup

```bash
cd backend

uv sync

uv run uvicorn main:app --reload
```

## Frontend Setup

```bash
cd frontend

npm install

npm run start
```

## Demo Video

