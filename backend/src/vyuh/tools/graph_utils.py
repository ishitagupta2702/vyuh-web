from typing import List, Dict


def list_to_graph(agent_list: List[str]) -> Dict[str, List[str]]:
    """
    Convert a linear list of agent IDs into an adjacency list graph.
    
    Each agent points to the next agent in the sequence, except for the last agent
    which points to an empty list.
    
    Args:
        agent_list: List of agent IDs in execution order
        
    Returns:
        Adjacency list where each agent points to the next agent(s) in the chain
        
    Examples:
        >>> list_to_graph(["agent1", "agent2", "agent3"])
        {'agent1': ['agent2'], 'agent2': ['agent3'], 'agent3': []}
        
        >>> list_to_graph(["agent1"])
        {'agent1': []}
        
        >>> list_to_graph([])
        {}
    """
    if not agent_list:
        return {}
    
    if len(agent_list) == 1:
        return {agent_list[0]: []}
    
    adjacency = {}
    
    for i, agent_id in enumerate(agent_list):
        if i == len(agent_list) - 1:
            # Last agent has no successors
            adjacency[agent_id] = []
        else:
            # Agent points to the next agent in the list
            adjacency[agent_id] = [agent_list[i + 1]]
    
    return adjacency


def graph_to_list(graph: Dict[str, List[str]]) -> List[str]:
    """
    Convert an adjacency list graph back to a linear list of agent IDs.
    
    This is the inverse operation of list_to_graph().
    
    Args:
        graph: Adjacency list where keys are agent IDs and values are lists of successor agent IDs
        
    Returns:
        Linear list of agent IDs in execution order
        
    Examples:
        >>> graph_to_list({'agent1': ['agent2'], 'agent2': ['agent3'], 'agent3': []})
        ['agent1', 'agent2', 'agent3']
        
        >>> graph_to_list({'agent1': []})
        ['agent1']
        
        >>> graph_to_list({})
        []
    """
    if not graph:
        return []
    
    # Find the starting agent (one with no incoming edges)
    all_agents = set(graph.keys())
    all_successors = set()
    for successors in graph.values():
        all_successors.update(successors)
    
    # Agents that are not successors of any other agent are potential starting points
    starting_agents = all_agents - all_successors
    
    if not starting_agents:
        # If no clear starting point, return empty list
        return []
    
    # For simplicity, take the first starting agent
    current_agent = list(starting_agents)[0]
    result = []
    visited = set()
    
    while current_agent and current_agent not in visited:
        result.append(current_agent)
        visited.add(current_agent)
        
        # Get the next agent
        successors = graph.get(current_agent, [])
        current_agent = successors[0] if successors else None
    
    return result


if __name__ == "__main__":
    # Test cases
    test_cases = [
        ["agent1", "agent2", "agent3"],
        ["agent1"],
        [],
        ["researcher", "writer"],
        ["agent1", "agent2", "agent3", "agent4"]
    ]
    
    print("Testing list_to_graph():")
    for test_list in test_cases:
        result = list_to_graph(test_list)
        print(f"Input: {test_list}")
        print(f"Output: {result}")
        print()
    
    print("Testing graph_to_list() (inverse operation):")
    for test_list in test_cases:
        graph = list_to_graph(test_list)
        result = graph_to_list(graph)
        print(f"Original: {test_list}")
        print(f"Graph: {graph}")
        print(f"Reconstructed: {result}")
        print(f"Match: {test_list == result}")
        print()