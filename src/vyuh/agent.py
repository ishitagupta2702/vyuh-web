import os
import warnings

import litellm

# from crewai_tools import MCPServerAdapter
from wmtllmgateway.llm import LLM

from identityCrew.crew import identityCrew

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

serverparams = {
    "url": os.getenv("MCP_SERVER_URL", "http://localhost:8000/mcp/"),
    "transport": os.getenv("MCP_TRANSPORT", "streamable-http"),
}

litellm.custom_provider_map = [
    {"provider": "walmart_llm_gateway", "custom_handler": LLM()}
]


class CrewAgent:
    SUPPORTED_CONTENT_TYPES = ["text", "text/plain"]

    def __init__(self):
        self.crew = identityCrew().crew()

    async def invoke(self, parts) -> str:
        """Kickoff CrewAI and return the response."""

        try:
            # mcp_server = MCPServerAdapter(serverparams)
            # self.crew.agents[0].tools.extend(mcp_server.tools)
            response = self.crew.kickoff(inputs=parts)
        except Exception as e:
            raise Exception(f"An error occurred while running the crew: {e}")

        return response.raw
