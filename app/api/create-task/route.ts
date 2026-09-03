import { inngest } from "@/ingest/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const taskSchema = z.object({
  id: z.string().uuid(),
  content: z.string().trim().min(1).max(1000),
});

export async function POST(request: Request) {
  try {
    const payload = taskSchema.parse(await request.json());

    await inngest.send({
      name: "app/task.created",
      data: payload,
    });

    return NextResponse.json({ message: "Event sent", id: payload.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "A valid project id and description are required" },
        { status: 400 },
      );
    }

    console.error("Unable to send project task:", error);
    return NextResponse.json(
      { message: "Unable to start project processing" },
      { status: 502 },
    );
  }
}
