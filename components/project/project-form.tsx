"use client"

import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TextAreaAutosize from "react-textarea-autosize"
import { ArrowUpIcon, BarChart3, Clapperboard, FolderKanban, FolderOpen, ShoppingBag, Tv2, Music2, Home, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import z from "zod"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { useCreateProject } from "@/modules/projects/hooks/project"

const formSchema = z.object({ content: z.string().min(1, "Project description is required").max(1000, "Description is too long") })
type ProjectFormValues = z.infer<typeof formSchema>

const PROJECT_TEMPLATES = [
  { icon: Clapperboard, title: "Streaming platform", prompt: "Build a Netflix-style homepage with a hero banner, movie sections, responsive cards, and a details modal using mock data and local state. Use dark mode." },
  { icon: BarChart3, title: "Admin dashboard", prompt: "Create an admin dashboard with a sidebar, stat cards, a chart placeholder, and a basic table with filter and pagination using local state. Use clear visual grouping and balance." },
  { icon: FolderKanban, title: "Kanban board", prompt: "Build a kanban board with drag-and-drop and support for adding and removing tasks with local state. Use consistent spacing and polished hover effects." },
  { icon: FolderOpen, title: "File manager", prompt: "Build a file manager with a folder list, file grid, and options to rename or delete items using mock data and local state. Focus on clear icons and visual distinction." },
  { icon: Tv2, title: "Video library", prompt: "Build a YouTube-style homepage with mock video thumbnails, a category sidebar, and a modal preview with title and description using local state." },
  { icon: ShoppingBag, title: "Storefront", prompt: "Build a store page with category filters, a product grid, and local cart logic to add and remove items. Focus on clear typography and button states." },
  { icon: Home, title: "Property listings", prompt: "Build an Airbnb-style listings grid with mock data, a filter sidebar, and a modal with property details using local state." },
  { icon: Music2, title: "Music player", prompt: "Build a Spotify-style music player with a playlist sidebar, song details, and playback controls. Use local state for song selection." },
]

const ProjectsForm = () => {
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  const { mutateAsync, isPending } = useCreateProject()
  const form = useForm<ProjectFormValues>({ resolver: zodResolver(formSchema), defaultValues: { content: "" }, mode: "onChange" })
  const content = useWatch({ control: form.control, name: "content", defaultValue: "" })

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      const res = await mutateAsync(values.content)
      router.push(`/projects/${res.id}`)
      toast.success("Project created successfully")
      form.reset()
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to create project")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"><Sparkles className="size-3.5 text-primary" /> Start from a direction</div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {PROJECT_TEMPLATES.map(({ icon: Icon, title, prompt }) => (
          <button key={title} type="button" disabled={isPending} onClick={() => form.setValue("content", prompt, { shouldValidate: true })} className="group flex min-h-24 flex-col justify-between rounded-xl border border-border/60 bg-card/45 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-50">
            <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">{title}</span>
          </button>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("rounded-2xl border border-border/70 bg-card/70 p-3 shadow-2xl shadow-background/30 backdrop-blur-xl transition-all", isFocused && "border-primary/50 ring-4 ring-primary/10")}>
          <FormField control={form.control} name="content" render={({ field }) => (
            <TextAreaAutosize {...field} disabled={isPending} placeholder="Describe what you want to create..." onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} minRows={4} maxRows={8} className="w-full resize-none border-none bg-transparent px-2 pt-2 text-base leading-7 outline-none placeholder:text-muted-foreground/60 disabled:opacity-50" onKeyDown={(event) => { if (event.key === "Enter" && (event.ctrlKey || event.metaKey) && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); form.handleSubmit(onSubmit)() } }} />
          )} />
          <div className="flex items-center justify-between gap-3 border-t border-border/50 px-2 pt-3">
            <p className="text-xs text-muted-foreground"><kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">⌘ Enter</kbd><span className="ml-1.5 hidden sm:inline">to generate</span></p>
            <Button size="icon" aria-label="Create project" disabled={isPending || !content.trim()} type="submit" className="size-9 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">{isPending ? <Spinner /> : <ArrowUpIcon aria-hidden="true" />}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ProjectsForm
