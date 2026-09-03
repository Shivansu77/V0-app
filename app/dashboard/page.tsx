import { onBoardUser } from '@/modules/auth/actions'
import ProjectForm from '@/components/project/project-form'
import { ForgeUiLogo } from '@/components/brand/forge-ui-logo'

const Dashboard = async () => {
  await onBoardUser()

  return (
    <main className='min-h-screen bg-transparent'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:px-8'>
        <ForgeUiLogo className='h-10 w-[152px] text-foreground' />
        <header className='max-w-2xl space-y-3'>
          <p className='text-sm font-medium text-muted-foreground'>Forge-UI workspace</p>
          <h1 className='text-4xl font-semibold tracking-tight text-foreground sm:text-5xl'>
            Turn an idea into an interface.
          </h1>
          <p className='text-base leading-7 text-muted-foreground'>
            Start with a clear brief. Forge-UI will help you shape the first version of your product.
          </p>
        </header>

        <ProjectForm />
      </div>
    </main>
  )
}

export default Dashboard
