"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {useEffect} from "react"

const page = () => {
  const [data, setData] = useState<any[] | null>(null)
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/users')
      const data = await res.json()
      setData(data);
    }
    fetchData()
  },[])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    fetch('/api/users',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name,email})
    })  
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <Button type="submit">Submit</Button>
      </form>
    <div>
      {(!data) ? (
        <p>Loading...</p>
      ) : (
        data.map((user: any) => (
          <div key={user.id}>
            <p>{user.name} || {user.email}</p>
          </div>
        ))
      )}
    </div>
    </div>
  )
}

export default page