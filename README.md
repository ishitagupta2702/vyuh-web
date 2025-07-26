# identity-crew

This a new CrewAI Project created by DX Starter Kit

> This project was generated with the Starter Kit framework. It includes built-in support for:
>
> - Walmart's LLM Gateway for large language model capabilities
> - The A2A protocol for inter-agent communication
> - MCP (Model Context Protocol) integration.

## Installation

Set up your environment using [uv](https://docs.astral.sh/uv/getting-started/installation/):

```bash
uv venv
source .venv/bin/activate
uv sync
```

## Configuration

Set the required environment variables before running the project:

```bash
export OTEL_SDK_DISABLED=true
export MODEL=walmart_llm_gateway/llama-3-2-90b-vision-instruct
export BASE_URL=https://wmtllmgateway.stage.walmart.com/wmtllmgateway
export X_API_KEY=<your_api_key_here>
```

> Important: Replace <your_api_key_here> with a valid API key authorized to access Walmart's LLM Gateway.

## Modify Agent Definitions

Agents are defined in `agents.yaml`. This file specifies your crew's capabilities and behavior.

To customize your agents:

1. Open `src/identityCrew/config/agents.yaml` in your editor.

2. Adjust the agent properties, for example:

```yaml
researcher:
  role: >
    {topic} Senior Data Researcher
  goal: >
    Uncover cutting-edge developments in {topic}
  backstory: >
    You're a seasoned researcher with a knack for uncovering the latest
    developments in {topic}. Known for your ability to find the most relevant
    information and present it in a clear and concise manner.
```

3. Update the following fields as needed:

- Agent name (key before the : — e.g., researcher)
- `role`: The title or position your agent should represent.
- `goal`: A clear statement of the agent’s purpose.
- `backstory`: Context or narrative describing the agent’s expertise.

Your changes will take effect the next time you restart the A2A server.

## Connect to a MCP Server

To connect a CrewAI agent to a MCP server:

1. Set the `MCP_SERVER_URL` environment variable

Provide a value for `MCP_SERVER_URL`. This value will override the server parameters used by the `MCPServerAdapter` class.

2. Enable the MCP integration code

In `src/identityCrew/agent.py`, locate the `invoke` method. Uncomment the section that creates an `MCPServerAdapter` instance and extends your agent’s toolset:

```python
# mcp_server = MCPServerAdapter(serverparams)
# self.crew.agents[0].tools.extend(mcp_server.tools)
```

This will attach the MCP tools to your first CrewAI agent, enabling it to communicate with the MCP server you configured.

## Deploy Locally

Start the A2A server locally to accept requests for your crew of agents:

```bash
identityCrew
```

This command launches your agent server, which will:

- Provide an agent card defining the agent’s capabilities
- Listen for incoming requests over the A2A protocol
- Process tasks through the `TaskManager` class

### Validate Server Availability

Once your A2A server is running, verify that it is responsive and accepting requests:

1. Check the agent metadata endpoint

Run the following command to query the agent's metadata:

```bash
curl http://localhost:10001/.well-known/agent.json
```

Expected output (example):

```json
{
  "name": "identityCrew",
  "description": "This a new CrewAI Project created by DX Starter Kit",
  "url": "http://localhost:10001/",
  "version": "0.0.1",
  "capabilities": {
    "streaming": false,
    "pushNotifications": false,
    "stateTransitionHistory": false
  },
  "defaultInputModes": ["text"],
  "defaultOutputModes": ["text"],
  "skills": [
    {
      "id": "identityCrew",
      "name": "identityCrew",
      "description": "This a new CrewAI Project created by DX Starter Kit",
      "tags": [""],
      "examples": [""]
    }
  ]
}
```

2. Send a test task request

Use `curl` to send a sample JSON-RPC request to your A2A server:

```bash
curl -X POST http://localhost:10001/ \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "message/send",
    "params": {
      "id": "1",
      "sessionId": "8f01f3d172cd4396a0e535ae8aec6687",
      "message": {
        "messageId": "1",
        "role": "user",
        "parts": [
          { "type": "text", "text": "CrewAI", "metadata": {"input": "topic"} },
          { "type": "text", "text": "2025", "metadata": {"input": "current_year"}}
        ]
      }
    }
  }'
```
