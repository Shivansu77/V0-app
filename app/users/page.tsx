"use client"
import { Button } from "@/components/ui/button"
import { useCallback, useState, useEffect } from "react"

const Page = () => {
  const [data, setData] = useState<any[] | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const fetchData = useCallback(async () => {
    const res = await fetch('/api/users')
    const json = await res.json()
    setData(json)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })

    if (res.ok) {
      setStatus('success')
      await fetchData()
      form.reset()
    } else {
      setStatus('error')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <Button type="submit">Submit</Button>

        {status === 'success' && (
          <p className="text-green-500">User created successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-red-500">Failed to create user.</p>
        )}
      </form>

      <div>
        {!data ? (
          <p>Loading...</p>
        ) : (
          data.map((user: any) => (
            <div className="border-b py-2" key={user.id}>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Page