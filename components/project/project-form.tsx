"use client";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaAutosize from "react-textarea-autosize";
import { ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import z from "zod";
import { Spinner } from "@/components/ui/spinner"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useCreateProject } from "@/modules/projects/hooks/project";

const formSchema = z.object({ content: z.string().min(1, "Project description is required").max(1000, "Description is too long") })
type ProjectFormValues = z.infer<typeof formSchema>;

const PROJECT_TEMPLATES = [
  {
    emoji: "🎬",
    title: "Build a Netflix clone",
    prompt:
      "Build a Netflix-style homepage with a hero banner (use a nice, dark-mode compatible gradient here), movie sections, responsive cards, and a modal for viewing details using mock data and local state. Use dark mode.",
  },
  {
    emoji: "📦",
    title: "Build an admin dashboard",
    prompt:
      "Create an admin dashboard with a sidebar, stat cards, a chart placeholder, and a basic table with filter and pagination using local state. Use clear visual grouping and balance in your design for a modern, professional look.",
  },
  {
    emoji: "📋",
    title: "Build a kanban board",
    prompt:
      "Build a kanban board with drag-and-drop using react-beautiful-dnd and support for adding and removing tasks with local state. Use consistent spacing, column widths, and hover effects for a polished UI.",
  },
  {
    emoji: "🗂️",
    title: "Build a file manager",
    prompt:
      "Build a file manager with folder list, file grid, and options to rename or delete items using mock data and local state. Focus on spacing, clear icons, and visual distinction between folders and files.",
  },
  {
    emoji: "📺",
    title: "Build a YouTube clone",
    prompt:
      "Build a YouTube-style homepage with mock video thumbnails, a category sidebar, and a modal preview with title and description using local state. Ensure clean alignment and a well-organized grid layout.",
  },
  {
    emoji: "🛍️",
    title: "Build a store page",
    prompt:
      "Build a store page with category filters, a product grid, and local cart logic to add and remove items. Focus on clear typography, spacing, and button states for a great e-commerce UI.",
  },
  {
    emoji: "🏡",
    title: "Build an Airbnb clone",
    prompt:
      "Build an Airbnb-style listings grid with mock data, filter sidebar, and a modal with property details using local state. Use card spacing, soft shadows, and clean layout for a welcoming design.",
  },
  {
    emoji: "🎵",
    title: "Build a Spotify clone",
    prompt:
      "Build a Spotify-style music player with a sidebar for playlists, a main area for song details, and playback controls. Use local state for managing playback and song selection. Prioritize layout balance and intuitive control placement for a smooth user experience. Use dark mode.",
  },
];

const ProjectsForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateProject()

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
    mode: "onChange",
  });
  const content = useWatch({
    control: form.control,
    name: "content",
    defaultValue: "",
  });

  const handleTemplate = (prompt: string) => {
    form.setValue("content", prompt);
  };

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      const res = await mutateAsync(values.content);
      router.push(`/projects/${res.id}`);
      toast.success("Project created successfully");
      form.reset();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to create project");
    }
  };


  const isButtonDisabled = isPending || !content.trim()

  return (
    <div className="space-y-8">
      {/* Template Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PROJECT_TEMPLATES.map((template, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleTemplate(template.prompt)}
            // disabled={isPending}
            className="group relative rounded-xl border border-border/70 bg-card/70 p-4 text-left backdrop-blur-md transition-all duration-200 hover:border-primary/30 hover:bg-accent/50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex flex-col gap-2">
              <span className="text-3xl" role="img" aria-label={template.title}>
                {template.emoji}
              </span>
              <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                {template.title}
              </h3>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or describe your own idea
          </span>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative rounded-xl border border-border/70 bg-sidebar/70 p-4 pt-1 backdrop-blur-xl transition-all",
            isFocused && "shadow-lg ring-2 ring-primary/20"
          )}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <TextAreaAutosize
                {...field}
                // disabled={isPending}
                placeholder="Describe what you want to create..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={3}
                maxRows={8}
                className={cn(
                  "pt-4 resize-none border-none w-full outline-none bg-transparent",
                  //   isPending && "opacity-50"
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)(e);
                  }
                }}
              />
            )}
          />

          <div className="flex gap-x-2 items-end justify-between pt-2">
            <div className="text-[10px] text-muted-foreground font-mono">
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span>&#8984;</span>Enter
              </kbd>
              &nbsp; to submit
            </div>
            <Button
              className={cn("size-8 rounded-full",
                isButtonDisabled && "bg-muted-foreground border"
              )}
              disabled={isButtonDisabled}
              type="submit"
            >
              {
                isPending ? (<Spinner />) : (<ArrowUpIcon className="size-4" aria-hidden="true" />)
              }

            </Button>
          </div>
        </form>
      </Form>

    </div>
  )
}

export default ProjectsForm
