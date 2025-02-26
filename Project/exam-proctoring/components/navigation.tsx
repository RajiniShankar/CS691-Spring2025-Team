"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, User } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  // const num = 1;

  const isActive = (path: string) => pathname === path

  return (
    <nav className="flex space-x-4">
      <Link href="/student-dashboard">
        <Button variant={isActive("/student-dashboard") ? "default" : "ghost"}>
          <Home className="mr-2 h-4 w-4" /> Dashboard
        </Button>
      </Link>
      <Link href="/exam/1">
        <Button variant={isActive("/exams") ? "default" : "ghost"}>
          <BookOpen className="mr-2 h-4 w-4" /> Exams
        </Button>
      </Link>
      <Link href="/profile">
        <Button variant={isActive("/profile") ? "default" : "ghost"}>
          <User className="mr-2 h-4 w-4" /> Profile
        </Button>
      </Link>
    </nav>
  )
}

