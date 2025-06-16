import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Reader from "@/components/Reader"

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Reader />
      </main>
      <Footer />
    </div>
  )
}

export default page