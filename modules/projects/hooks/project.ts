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
