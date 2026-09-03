import { onBoardUser } from '@/modules/auth/actions'

const Dashboard = async () => {
  await onBoardUser()

  return (
    <div className='min-h-screen'>
      <h1 className=''>Dashboard</h1>
      <div>

      </div>
    </div>
  )
}

export default Dashboard
