import { inngest } from "./client";

/**
 * Background work for a newly submitted project brief.
 *
 * This is intentionally small for now: it gives the app a durable workflow
 * boundary where generation, persistence, or AI steps can be added later.
 */
export const processTask = inngest.createFunction(
  {
    id: "process-project-task",
    triggers: [{ event: "app/task.created" }],
  },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return {
        processed: true,
        id: event.data.id,
        content: event.data.content,
      };
    });

    await step.sleep("pause-before-completion", "1s");

    return {
      message: `Task ${event.data.id} complete`,
      result,
    };
  },
);
