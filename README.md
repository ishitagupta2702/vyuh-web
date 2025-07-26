# Vyuh - Collaborative AI Agent Framework

Vyuh is a powerful framework for building intelligent, collaborative AI agents that work together to solve complex tasks. It leverages the crewai framework and LangChain's advanced language models to create sophisticated multi-agent systems.

## Key Features

- 🤖 Multi-agent collaboration using crewai framework
- 🧠 Integration with LangChain and OpenAI's GPT models
- 📝 YAML-based configuration for easy customization
- 📚 Modular architecture for extensibility
- 🛠️ Built-in tools for web scraping and search
- 🔄 Dynamic task execution and agent coordination
- 📈 Scalable architecture for growing agent systems

## Requirements

- Python 3.10 or higher
- OpenAI API key
- Required dependencies (automatically installed via pip)

## Installation

1. **Clone the Repository**

```bash
git clone <repository-url>
cd vyuh
```

2. **Set Up Virtual Environment**

```bash
python3.10 -m venv .venv
source .venv/bin/activate
pip install -e .
```

3. **Configure Environment**

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
```

## Usage

Run the application:

```bash
python src/vyuh/crew.py
```

The application will automatically load agent configurations from `src/vyuh/config/agents.yaml` and task definitions from `src/vyuh/config/tasks.yaml`.

## Configuration

### Agents

Agents are defined in `agents.yaml`. Each agent has:

- A unique name
- Role description
- Goal statement
- Backstory
- Associated tools and capabilities

### Tasks

Tasks are defined in `tasks.yaml` and specify:

- Task description
- Expected output
- Assigned agent
- Input parameters
- Execution constraints

## Extending the System

1. **Add New Agents**
   - Define new agents in `agents.yaml`
   - Create corresponding agent implementations in `crew.py`

2. **Add New Tools**
   - Implement tools in `src/vyuh/tools/`
   - Register tools with agents in `crew.py`

3. **Customize Behavior**
   - Modify agent configurations in `agents.yaml`
   - Adjust task definitions in `tasks.yaml`
   - Update LLM parameters in `crew.py`

## Best Practices

1. Keep agent roles specific and focused
2. Define clear task boundaries
3. Maintain consistent agent configurations
4. Regularly update dependencies
5. Test new configurations before deployment

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

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