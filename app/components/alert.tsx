import { useEffect, useState } from "react"
import { Terminal } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert"

type AlertDemoProps = {
  message?: string
  duration?: number
}

export function AlertDemo({ message, duration = 3000 }: AlertDemoProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      setVisible(false)

      // Limpiar el parámetro "message" de la URL actual
      const url = new URL(window.location.href)
      url.searchParams.delete("message")
      window.history.replaceState({}, "", url.toString())
    }, duration)

    const cancelTimer = () => {
      clearTimeout(timer)
    }

    window.addEventListener("beforeunload", cancelTimer)
    window.addEventListener("popstate", cancelTimer)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("beforeunload", cancelTimer)
      window.removeEventListener("popstate", cancelTimer)
    }
  }, [message, duration])

  if (!message || !visible) return null

  return (
    <Alert className="bg-green-100 border border-green-400 text-green-800">
      <Terminal className="h-4 w-4" />
      <AlertTitle>alert!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
