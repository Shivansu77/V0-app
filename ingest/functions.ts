import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

// Initialize the Gemini model
const model = gemini({ model: "gemini-2.5-flash" });

export const processTask = inngest.createFunction(
  {
    id: "process-project-task",
    triggers: [{ event: "app/task.created" }],
  },
  async ({ event, step }) => {
    const result = await step.run("run-project-agent", async () => {
      const agent = createAgent({
        name: "forge-ui-agent",
        description: "Generates a helpful response for a Forge-UI project brief.",
        system: "You are a helpful assistant that turns product ideas into clear UI plans.",
        model,
      });

      return agent.run(event.data.content, { step });
    });

    return {
      message: `Task ${event.data.id} complete`,
      result,
    };
  },
);
