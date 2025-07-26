import os
import warnings
from langchain.chat_models import ChatLiteLLM
from langchain.schema.messages import HumanMessage

from vyuh.crew import identityCrew

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# Initialize ChatLiteLLM
llm = ChatLiteLLM(
    model_name="gpt-3.5-turbo",
    temperature=0.7,
    max_tokens=1000,
)

# Set environment variables for API key
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY", "")


class CrewAgent:
    SUPPORTED_CONTENT_TYPES = ["text", "text/plain"]

    def __init__(self):
        self.crew = identityCrew().crew()

    async def invoke(self, parts) -> str:
        """Process input with ChatLiteLLM and return the response."""

        try:
            # Convert parts to a message
            messages = [HumanMessage(content=parts.get("topic", ""))]
            
            # Get response from LLM
            response = llm.invoke(messages)
            
            # Return the response content
            return response.content
        except Exception as e:
            raise Exception(f"An error occurred while processing with LLM: {e}")
