import warnings
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openinference.instrumentation.crewai import CrewAIInstrumentor
from opentelemetry.instrumentation.starlette import StarletteInstrumentor
from starlette.requests import Request
from starlette.responses import JSONResponse

from vyuh.agent import CrewAgent

warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=UserWarning, module="google.protobuf")


class AgentRequest(BaseModel):
    topic: str
    current_year: str

app = FastAPI()

@app.post("/process")
async def process_request(request: AgentRequest):
    try:
        agent = CrewAgent()
        response = await agent.invoke({"topic": request.topic, "current_year": request.current_year})
        return JSONResponse({"response": response})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def healthcheck(request: Request):
    return JSONResponse({"status": "ok", "message": "Agent is live"})


def main():
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
