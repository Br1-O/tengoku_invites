"use client"

import { useEffect, useState } from "react"
import Loader from "./Loader"

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loading on route changes
    setIsLoading(true)

    // Hide loading screen when page is fully loaded
    const handleLoad = () => {
      setIsLoading(false)
    }

    // Check if document is already loaded
    if (document.readyState === "complete") {
      setIsLoading(false)
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  // Don't render anything if not loading
  if (!isLoading) return null

  return (
    <Loader />
  )
}