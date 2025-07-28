# Vyuh Backend

FastAPI backend for the Vyuh AI Agent System.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
Create a `.env` file in the root directory with:
```
OPENAI_API_KEY=your_openai_api_key_here
```

## Running the Server

### Development Mode
```bash
python run.py
```

### Production Mode
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health check
- `POST /run-agent` - Run the AI agent with a topic

### Example Usage

```bash
curl -X POST "http://localhost:8000/run-agent" \
     -H "Content-Type: application/json" \
     -d '{"topic": "The future of content creation"}'
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc