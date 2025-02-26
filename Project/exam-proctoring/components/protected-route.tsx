"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedRoute({
  children,
  allowedRoles,
}: { children: React.ReactNode; allowedRoles: string[] }) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // TODO: Implement actual authentication check
    const userRole = localStorage.getItem("userRole")
    if (!userRole || !allowedRoles.includes(userRole)) {
      router.push("/login")
    } else {
      setIsAuthorized(true)
    }
  }, [allowedRoles, router])

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}

