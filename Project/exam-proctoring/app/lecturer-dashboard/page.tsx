'use client';

import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Exam 1", avgScore: 75 },
  { name: "Exam 2", avgScore: 82 },
  { name: "Exam 3", avgScore: 78 },
  { name: "Exam 4", avgScore: 85 },
  { name: "Exam 5", avgScore: 80 },
]

export default function LecturerDashboard() {
  return (
    // <ProtectedRoute allowedRoles={["lecturer"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Lecturer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Management</CardTitle>
              <CardDescription>Create, edit, and delete exams</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mr-2">Create Exam</Button>
              <Button variant="outline">View All Exams</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Exam Analytics</CardTitle>
              <CardDescription>View exam results and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgScore" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>LLM-Based Grading</CardTitle>
              <CardDescription>Trigger automated grading for exams</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Start LLM Grading</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    // </ProtectedRoute>
  )
}

