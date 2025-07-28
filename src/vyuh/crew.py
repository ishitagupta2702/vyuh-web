from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from langchain_community.chat_models import ChatLiteLLM
import os

from dotenv import load_dotenv
load_dotenv()

# Set environment variables for API key
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY", "")

@CrewBase
class publishCrew:
    """Publishing House Crew"""

    agents_config = "config/agents.yaml"
    tasks_config = "config/tasks.yaml"
    
    @agent
    def researcher(self) -> Agent:
        return Agent(
            config=self.agents_config['researcher'],
            llm=ChatLiteLLM(model="gpt-3.5-turbo"),
            verbose=True
        )

    @agent
    def writer(self) -> Agent:
        return Agent(
            config=self.agents_config['writer'],
            llm=ChatLiteLLM(model="gpt-3.5-turbo"),
            verbose=True
        )

    @task
    def research_task(self) -> Task:
        return Task(
            config=self.tasks_config['research_task'],
            agent = self.researcher()
        )

    @task
    def blog_task(self) -> Task:
        return Task(
            config=self.tasks_config['blog_task'],
            agent = self.writer()
        )

    @crew
    def crew(self) -> Crew:
        """Creates the crew"""
        return Crew(
            agents=[self.researcher(), self.writer()],
            tasks=[self.research_task(), self.blog_task()]
        )

if __name__ == "__main__":
    publish_crew = publishCrew()
    publish_crew.crew().kickoff(inputs={"topic": "The future of content creation"})