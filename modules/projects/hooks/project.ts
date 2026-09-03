"use client"

import { useCallback, useState } from "react"

interface CreateProjectResult {
  id: string
}

export function useCreateProject() {
  const [isPending, setIsPending] = useState(false)

  const mutateAsync = useCallback(async (content: string): Promise<CreateProjectResult> => {
    setIsPending(true)

    try {
      const id = crypto.randomUUID()

      const response = await fetch("/api/create-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, content }),
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null
        throw new Error(body?.message ?? "Failed to start project processing")
      }

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          `forge-ui-project-${id}`,
          JSON.stringify({ id, content, createdAt: new Date().toISOString() }),
        )
      }

      return { id }
    } finally {
      setIsPending(false)
    }
  }, [])

  return { mutateAsync, isPending }
}
