import warnings

import click
import uvicorn
from a2a.server.agent_execution import AgentExecutor, RequestContext
from a2a.server.apps import A2AStarletteApplication
from a2a.server.events import EventQueue
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.tasks import InMemoryTaskStore
from a2a.types import (AgentCapabilities, AgentCard, AgentSkill,
                       InvalidParamsError)
from a2a.utils import new_agent_text_message
from a2a.utils.errors import ServerError
from crewai.telemetry import Telemetry
from openinference.instrumentation.crewai import CrewAIInstrumentor
from opentelemetry.instrumentation.starlette import StarletteInstrumentor
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import Route
from walmart_gtp_observability import logger, tracer_provider
from walmart_gtp_observability.utils.helper import fetch_trace_endpoint

from identityCrew.agent import CrewAgent

warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=UserWarning, module="google.protobuf")


class CrewAIAgentExecutor(AgentExecutor):
    """Test AgentProxy Implementation."""

    def __init__(self):
        self.agent = CrewAgent()

    async def execute(
        self,
        context: RequestContext,
        event_queue: EventQueue,
    ) -> None:
        error = self._validate_request(context)
        if error:
            raise ServerError(error=InvalidParamsError())

        result = await self.agent.invoke(
            {p.root.metadata["input"]: p.root.text for p in context.message.parts}
        )
        await event_queue.enqueue_event(new_agent_text_message(result))

    def _validate_request(self, context: RequestContext) -> bool:
        return False

    async def cancel(self, context: RequestContext, event_queue: EventQueue) -> None:
        raise Exception("cancel not supported")


def healthcheck(request: Request):
    return JSONResponse({"status": "ok", "message": "Agent is live"})


@click.command()
@click.option("--host", "host", default="localhost")
@click.option("--port", "port", default=10001)
def main(host, port):
    try:
        skill = AgentSkill(
            id="identityCrew",
            name="identityCrew",
            description=("This a new CrewAI Project created by DX Starter Kit"),
            tags=[""],
            examples=[""],
        )

        agent_card = AgentCard(
            name="identityCrew",
            description=("This a new CrewAI Project created by DX Starter Kit"),
            url=f"http://{host}:{port}/",
            version="0.0.1",
            defaultInputModes=["text"],
            defaultOutputModes=["text"],
            capabilities=AgentCapabilities(streaming=False),
            skills=[skill],
        )

        request_handler = DefaultRequestHandler(
            agent_executor=CrewAIAgentExecutor(),
            task_store=InMemoryTaskStore(),
        )

        server = A2AStarletteApplication(
            agent_card=agent_card,
            http_handler=request_handler,
        )
        app = server.build()

        logger.debug("Telemetry Configuration")
        Telemetry._instance.provider._active_span_processor._span_processors[
            0
        ].span_exporter._endpoint = fetch_trace_endpoint()
        CrewAIInstrumentor().instrument(
            skip_dep_check=True, tracer_provider=tracer_provider
        )
        StarletteInstrumentor().instrument(tracer_provider=tracer_provider)
        StarletteInstrumentor.instrument_app(app, tracer_provider=tracer_provider)

        app.routes.append(Route("/health", endpoint=healthcheck, methods=["GET"]))

        logger.info(f"Starting server on {host}:{port}")
        uvicorn.run(app, host=host, port=port)
    except Exception as e:
        logger.error(f"An error occurred during server startup: {e}")
        exit(1)


if __name__ == "__main__":
    main()
