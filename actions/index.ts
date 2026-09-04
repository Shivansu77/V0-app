"use server";

import { createAgent, gemini } from "@inngest/agent-kit";

const model = gemini({ model: "gemini-2.5-flash" });

export async function onInvoke(content: string) {
  const id = crypto.randomUUID();
  const agent = createAgent({
    name: "forge-ui-agent",
    description: "Generates a helpful response for a Forge-UI project brief.",
    system: "You are a helpful assistant that turns product ideas into clear UI plans.",
    model,
  });

  const result = await agent.run(content);
  const response = result.output
    .filter((message) => message.type === "text")
    .map((message) => {
      if (message.type !== "text") return "";
      return typeof message.content === "string"
        ? message.content
        : message.content.map((part) => part.text).join("");
    })
    .join("\n");

  return { id, response };
}
