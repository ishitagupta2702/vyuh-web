from fastapi import APIRouter, HTTPException
import yaml
import os
from pathlib import Path
from typing import Dict, Any

router = APIRouter()

def load_agents_config() -> Dict[str, Any]:
    """
    Load agents configuration from the YAML file
    """
    try:
        # Get the project root and construct path to agents.yaml
        project_root = Path(__file__).parent.parent
        agents_file = project_root / "src" / "vyuh" / "config" / "agents.yaml"
        
        if not agents_file.exists():
            raise FileNotFoundError(f"Agents configuration file not found at {agents_file}")
        
        with open(agents_file, 'r', encoding='utf-8') as file:
            agents_data = yaml.safe_load(file)
        
        return agents_data
    
    except yaml.YAMLError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error parsing YAML file: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error loading agents configuration: {str(e)}"
        )

@router.get("/api/agents")
async def get_agents() -> Dict[str, Any]:
    """
    Get all available agents from the configuration file
    
    Returns:
        Dict containing agent IDs as keys and their role, goal, and backstory as values
    """
    try:
        agents_data = load_agents_config()
        
        # Transform the data to match the expected format
        # Each agent should have role, goal, and backstory
        formatted_agents = {}
        
        for agent_id, agent_info in agents_data.items():
            formatted_agents[agent_id] = {
                "role": agent_info.get("role", "").strip(),
                "goal": agent_info.get("goal", "").strip(),
                "backstory": agent_info.get("backstory", "").strip()
            }
        
        return formatted_agents
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving agents: {str(e)}"
        )