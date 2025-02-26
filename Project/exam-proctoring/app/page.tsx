import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const clientLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
  "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png",
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-dark-gray">
      <main>
        <section className="bg-light-green py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-6 text-dark-gray">AI-Powered Exam Proctoring</h1>
                <p className="text-very-dark-gray text-lg mb-8">
                  Ensure exam integrity with our advanced AI proctoring solution. Anytime, anywhere.
                </p>
                <div className="flex space-x-4">
                  <Button className="bg-green hover:bg-green/90 text-white px-8 py-3 text-lg">Get Started</Button>
                  <Button className="bg-green hover:bg-green/90 text-white px-8 py-3 text-lg">Request Demo</Button>
                </div>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg"
                  alt="Online Proctoring Illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">Trusted by Leading Institutions</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
              {clientLogos.map((logo, index) => (
                <div key={index} className="h-16 relative grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt={`Client logo ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-light-green py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-dark-gray mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Image
                  src="https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-7000.jpg"
                  alt="AI Monitoring"
                  width={200}
                  height={200}
                  className="mb-6 mx-auto"
                />
                <h3 className="text-xl font-bold text-dark-gray mb-4">AI-Powered Monitoring</h3>
                <p className="text-very-dark-gray">
                  Advanced artificial intelligence ensures exam integrity through real-time monitoring and analysis.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Image
                  src="https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg"
                  alt="Secure Platform"
                  width={200}
                  height={200}
                  className="mb-6 mx-auto"
                />
                <h3 className="text-xl font-bold text-dark-gray mb-4">Secure Platform</h3>
                <p className="text-very-dark-gray">
                  Enterprise-grade security ensures your exams and data are protected at all times.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Image
                  src="https://img.freepik.com/free-vector/data-analysis-illustration-flat-style-design_159144-40.jpg"
                  alt="Analytics Dashboard"
                  width={200}
                  height={200}
                  className="mb-6 mx-auto"
                />
                <h3 className="text-xl font-bold text-dark-gray mb-4">Real-time Analytics</h3>
                <p className="text-very-dark-gray">
                  Comprehensive analytics and reporting for better insight into exam performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark-gray text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-green">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green">
                    Request Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-green">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-green">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-green">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2025 ProTechTa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

