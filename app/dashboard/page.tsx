import { Activity, ArrowUpRight, Command, Layers3, Sparkles, WandSparkles } from 'lucide-react'
import { onBoardUser } from '@/modules/auth/actions'
import ProjectForm from '@/components/project/project-form'
import { ForgeUiLogo } from '@/components/brand/forge-ui-logo'

const Dashboard = async () => {
  await onBoardUser()

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <header className="flex items-center justify-between border-b border-border/60 pb-5">
          <ForgeUiLogo className="h-8 w-[122px] text-foreground" />
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="hidden items-center gap-2 sm:flex"><span className="size-1.5 rounded-full bg-primary" /> Workspace ready</span>
            <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1.5 font-medium text-foreground">v1.0 beta</span>
          </div>
        </header>

        <section className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" /> Your creative workspace
            </div>
            <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">
              What will you <span className="text-primary">build</span> today?
            </h1>
            <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Describe an idea, and Forge-UI will shape it into a considered product interface.
            </p>
          </div>
          <div className="hidden gap-4 border-l border-border/60 pl-6 lg:flex lg:flex-col">
            <div className="flex items-center gap-3 text-sm font-medium"><WandSparkles className="size-4 text-primary" /> From thought to interface</div>
            <p className="text-xs leading-5 text-muted-foreground">Start with a prompt or explore a direction below. You can refine everything later.</p>
          </div>
        </section>

        <ProjectForm />

        <section className="grid gap-3 border-t border-border/60 pt-6 sm:grid-cols-3">
          {[
            { icon: Command, label: 'Prompt-first', text: 'Start with natural language' },
            { icon: Layers3, label: 'Composable', text: 'Built for thoughtful iteration' },
            { icon: Activity, label: 'In your flow', text: 'Keep momentum as you create' },
          ].map(({ icon: Icon, label, text }) => (
            <div key={label} className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/35 p-4">
              <Icon className="mt-0.5 size-4 text-primary" aria-hidden="true" />
              <div><p className="text-sm font-medium text-foreground">{label}</p><p className="mt-1 text-xs text-muted-foreground">{text}</p></div>
              <ArrowUpRight className="ml-auto size-3.5 text-muted-foreground/50" aria-hidden="true" />
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

export default Dashboard
