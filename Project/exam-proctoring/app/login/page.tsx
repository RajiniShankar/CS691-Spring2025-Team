"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import Image from "next/image"

export default function LoginPage() {
  const [role, setRole] = useState("student")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (role === "lecturer") {
      router.push("/lecturer-dashboard")
    } else {
      router.push("/student-dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-light-green flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            {/* <Image src="/logo.svg" alt="ProctorTech Logo" width={60} height={60} /> */}
            <h1 className="text-2xl font-bold text-black">Pro</h1>
            <h1 className="text-2xl font-bold text-green">Tech</h1>
            <h1 className="text-2xl font-bold text-black">Ta</h1>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-dark-gray">Welcome back</CardTitle>
          <CardDescription className="text-center text-very-dark-gray">Login to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-dark-gray">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-gray-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-dark-gray">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-200"
                required
              />
            </div>
            <RadioGroup value={role} onValueChange={setRole} className="flex space-x-4 justify-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="text-very-dark-gray">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lecturer" id="lecturer" />
                <Label htmlFor="lecturer" className="text-very-dark-gray">
                  Lecturer
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-green hover:bg-green/90 text-white py-2">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

