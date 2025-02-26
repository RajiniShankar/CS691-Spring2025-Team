"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"

export default function CreateExamPage() {
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState("")
  const [questions, setQuestions] = useState([{ text: "", options: ["", "", "", ""], correctAnswer: "" }])
  const router = useRouter()

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], correctAnswer: "" }])
  }

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setQuestions(newQuestions)
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options[optionIndex] = value
    setQuestions(newQuestions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual exam creation logic
    console.log("Exam created:", { title, duration, questions })
    router.push("/lecturer-dashboard")
  }

  return (
    <ProtectedRoute allowedRoles={["lecturer"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Create Exam</h1>
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
              <CardDescription>Enter the basic information for the exam</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exam Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {questions.map((question, index) => (
            <Card key={index} className="mb-6">
              <CardHeader>
                <CardTitle>Question {index + 1}</CardTitle>
                <CardDescription>Enter the question details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`question-${index}`}>Question Text</Label>
                  <Textarea
                    id={`question-${index}`}
                    value={question.text}
                    onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                    required
                  />
                </div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="space-y-2">
                    <Label htmlFor={`question-${index}-option-${optionIndex}`}>Option {optionIndex + 1}</Label>
                    <Input
                      id={`question-${index}-option-${optionIndex}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                      required
                    />
                  </div>
                ))}
                <div className="space-y-2">
                  <Label htmlFor={`question-${index}-correct`}>Correct Answer</Label>
                  <Input
                    id={`question-${index}-correct`}
                    value={question.correctAnswer}
                    onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="button" variant="destructive" onClick={() => handleRemoveQuestion(index)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Remove Question
                </Button>
              </CardFooter>
            </Card>
          ))}

          <div className="flex justify-between">
            <Button type="button" onClick={handleAddQuestion}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Question
            </Button>
            <Button type="submit">Create Exam</Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  )
}

