"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const mockExam = {
  id: 1,
  title: "Mathematics 101",
  duration: 60, // in minutes
  questions: [
    {
      id: 1,
      text: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      id: 2,
      text: "What is the square root of 16?",
      options: ["2", "4", "6", "8"],
      correctAnswer: "4",
    },
  ],
}

export default function ExamPage({ params }: { params: { id: string } }) {
  const [timeLeft, setTimeLeft] = useState(mockExam.duration * 60)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [mouseWarnings, setMouseWarnings] = useState(0)
  const [faceDetected, setFaceDetected] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [headMovementWarnings, setHeadMovementWarnings] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && !isPC()) {
      alert("This exam can only be taken on a PC.")
      router.push("/student-dashboard")
    }
  }, [router])

  useEffect(() => {
    const handleMouseLeave = () => {
      setMouseWarnings((prev) => {
        const newWarnings = prev + 1
        if (newWarnings >= 3) {
          alert("You have left the exam window too many times. The exam will be submitted.")
          handleSubmit()
        }
        return newWarnings
      })
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [])

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error("Error accessing the camera:", err)
          setFaceDetected(false)
        })
    }
  }, [])

  useEffect(() => {
    let lastX = 0
    let lastY = 0
    const movementThreshold = 50 // Adjust this value to change sensitivity

    const checkHeadMovement = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")

        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          let sumX = 0
          let sumY = 0
          let count = 0

          for (let y = 0; y < canvas.height; y += 5) {
            for (let x = 0; x < canvas.width; x += 5) {
              const red = data[(y * canvas.width + x) * 4]
              const green = data[(y * canvas.width + x) * 4 + 1]
              const blue = data[(y * canvas.width + x) * 4 + 2]

              if (red > 60 && green > 40 && blue > 20 && red > green && red > blue) {
                sumX += x
                sumY += y
                count++
              }
            }
          }

          if (count > 0) {
            const avgX = sumX / count
            const avgY = sumY / count

            if (Math.abs(avgX - lastX) > movementThreshold || Math.abs(avgY - lastY) > movementThreshold) {
              setHeadMovementWarnings((prev) => prev + 1)
            }

            lastX = avgX
            lastY = avgY
          }
        }
      }

      requestAnimationFrame(checkHeadMovement)
    }

    checkHeadMovement()
  }, [])

  const isPC = () => {
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  const handleSubmit = () => {
    // TODO: Implement actual exam submission logic
    console.log("Exam submitted with answers:", answers)
    router.push("/student-dashboard")
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    // <ProtectedRoute allowedRoles={["student"]}>
      <div className="container mx-auto p-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>{mockExam.title}</CardTitle>
            <CardDescription>Time remaining: {formatTime(timeLeft)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <h2 className="text-xl font-semibold mb-4">Question {currentQuestion + 1}</h2>
                <p className="mb-4">{mockExam.questions[currentQuestion].text}</p>
                <RadioGroup
                  value={answers[mockExam.questions[currentQuestion].id] || ""}
                  onValueChange={(value) => setAnswers({ ...answers, [mockExam.questions[currentQuestion].id]: value })}
                >
                  {mockExam.questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Proctoring</h3>
                <video ref={videoRef} autoPlay muted className="w-full mb-2" />
                <canvas ref={canvasRef} className="hidden" width="320" height="240" />
                {!faceDetected && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Face not detected</AlertTitle>
                    <AlertDescription>Please ensure your face is visible in the camera.</AlertDescription>
                  </Alert>
                )}
                {mouseWarnings > 0 && (
                  <Alert variant="warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Mouse left exam window</AlertTitle>
                    <AlertDescription>Warning {mouseWarnings}/3</AlertDescription>
                  </Alert>
                )}
                {headMovementWarnings > 0 && (
                  <Alert variant="warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Suspicious head movement detected</AlertTitle>
                    <AlertDescription>Warning {headMovementWarnings}/3</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion < mockExam.questions.length - 1 ? (
              <Button onClick={() => setCurrentQuestion((prev) => Math.min(mockExam.questions.length - 1, prev + 1))}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Exam</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    // </ProtectedRoute>
  )
}

