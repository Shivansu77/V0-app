"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ForgeUiLogo } from "@/components/brand/forge-ui-logo";

interface ProjectData {
  id: string;
  content: string;
  response?: string;
  createdAt: string;
}

export default function ProjectWorkspace({ id }: { id: string }) {
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(`forge-ui-project-${id}`);

    if (!stored) {
      return;
    }

    let parsed: ProjectData;

    try {
      parsed = JSON.parse(stored) as ProjectData;
    } catch {
      window.sessionStorage.removeItem(`forge-ui-project-${id}`);
      return;
    }

    if (parsed.id !== id || typeof parsed.content !== "string") {
      return;
    }

    const timeoutId = window.setTimeout(() => setProject(parsed), 0);
    return () => window.clearTimeout(timeoutId);
  }, [id]);

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <ForgeUiLogo className="h-8 w-[122px] text-foreground" />
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to workspace
          </Link>
        </div>

        {project ? (
          <section className="space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Project brief</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
                Your interface is being prepared.
              </h1>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur-md">
              <p className="whitespace-pre-wrap text-base leading-7 text-foreground/85">
                {project.content}
              </p>
            </div>
            {project.response ? (
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
                <p className="text-sm font-medium text-muted-foreground">Gemini response</p>
                <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-foreground/85">
                  {project.response}
                </p>
              </div>
            ) : null}
          </section>
        ) : (
          <section className="rounded-2xl border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur-md">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Project not found
            </h1>
            <p className="mt-2 text-muted-foreground">
              This project is only available in the browser session where it was created.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
