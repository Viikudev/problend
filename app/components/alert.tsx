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
    }, duration)

    return () => clearTimeout(timer)
  }, [message, duration])

  if (!message || !visible) return null

  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
