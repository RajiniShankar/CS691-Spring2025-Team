
// import ProtectedRoute from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const upcomingExams = [
  { id: 1, name: "Mathematics 101", date: "2023-06-15", time: "10:00 AM" },
  { id: 2, name: "Physics 202", date: "2023-06-18", time: "2:00 PM" },
]

const completedExams = [
  { id: 3, name: "Chemistry 301", date: "2023-06-10", score: 85 },
  { id: 4, name: "Biology 102", date: "2023-06-05", score: 92 },
]

export default function StudentDashboard() {
  return (
    // <ProtectedRoute allowedRoles={["student"]}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
              <CardDescription>Your scheduled exams</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>{exam.name}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell>
                        <Button size="sm">Start Exam</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed Exams</CardTitle>
              <CardDescription>Your past exam results</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>{exam.name}</TableCell>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.score}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    // </ProtectedRoute>
  )
}

