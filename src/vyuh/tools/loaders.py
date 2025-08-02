import yaml
from pathlib import Path
from typing import Dict, Any


def load_agents() -> Dict[str, Any]:
    """
    Load and parse the agents configuration from YAML file.
    
    Returns:
        Dictionary keyed by agent ID containing agent configurations
        
    Raises:
        ValueError: If the file is malformed, missing, or empty
        FileNotFoundError: If the agents.yaml file doesn't exist
    """
    # Get the project root and construct path to agents.yaml
    project_root = Path(__file__).parent.parent.parent.parent
    agents_file = project_root / "src" / "vyuh" / "config" / "agents.yaml"
    
    if not agents_file.exists():
        raise FileNotFoundError(f"Agents configuration file not found at {agents_file}")
    
    try:
        with open(agents_file, 'r', encoding='utf-8') as file:
            agents_config = yaml.safe_load(file)
        
        if not agents_config:
            raise ValueError("Agents configuration file is empty")
        
        if not isinstance(agents_config, dict):
            raise ValueError("Agents configuration must be a dictionary")
        
        return agents_config
        
    except yaml.YAMLError as e:
        raise ValueError(f"Malformed YAML in agents configuration file: {str(e)}")
    except Exception as e:
        raise ValueError(f"Error loading agents configuration: {str(e)}")


def load_tasks() -> Dict[str, Any]:
    """
    Load and parse the tasks configuration from YAML file.
    
    Returns:
        Dictionary keyed by task ID containing task configurations
        
    Raises:
        ValueError: If the file is malformed, missing, or empty
        FileNotFoundError: If the tasks.yaml file doesn't exist
    """
    # Get the project root and construct path to tasks.yaml
    project_root = Path(__file__).parent.parent.parent.parent
    tasks_file = project_root / "src" / "vyuh" / "config" / "tasks.yaml"
    
    if not tasks_file.exists():
        raise FileNotFoundError(f"Tasks configuration file not found at {tasks_file}")
    
    try:
        with open(tasks_file, 'r', encoding='utf-8') as file:
            tasks_config = yaml.safe_load(file)
        
        if not tasks_config:
            raise ValueError("Tasks configuration file is empty")
        
        if not isinstance(tasks_config, dict):
            raise ValueError("Tasks configuration must be a dictionary")
        
        return tasks_config
        
    except yaml.YAMLError as e:
        raise ValueError(f"Malformed YAML in tasks configuration file: {str(e)}")
    except Exception as e:
        raise ValueError(f"Error loading tasks configuration: {str(e)}")


def validate_agent_task_mapping(agents_config: Dict[str, Any], tasks_config: Dict[str, Any]) -> None:
    """
    Validate that all tasks have corresponding agents defined.
    
    Args:
        agents_config: Dictionary of agent configurations
        tasks_config: Dictionary of task configurations
        
    Raises:
        ValueError: If any task references an agent that doesn't exist
    """
    available_agents = set(agents_config.keys())
    
    for task_id, task_config in tasks_config.items():
        agent_id = task_config.get("agent")
        if agent_id and agent_id not in available_agents:
            raise ValueError(f"Task '{task_id}' references agent '{agent_id}' which is not defined")


if __name__ == "__main__":
    # Test the loaders
    try:
        print("Testing load_agents():")
        agents = load_agents()
        print(f"Loaded {len(agents)} agents:")
        for agent_id, config in agents.items():
            print(f"  - {agent_id}: {config.get('role', 'No role')}")
        print()
        
        print("Testing load_tasks():")
        tasks = load_tasks()
        print(f"Loaded {len(tasks)} tasks:")
        for task_id, config in tasks.items():
            print(f"  - {task_id}: {config.get('description', 'No description')[:50]}...")
        print()
        
        print("Testing validation:")
        validate_agent_task_mapping(agents, tasks)
        print("✅ All tasks have valid agent mappings")
        
    except Exception as e:
        print(f"❌ Error: {e}")