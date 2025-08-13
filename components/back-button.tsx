"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      className="mb-8"
      variant="outline"
      onClick={() => router.back()}
    >
      ← Back
    </Button>
  )
}
