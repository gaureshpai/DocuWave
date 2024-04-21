import React from 'react'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reader from '@/components/Reader';

const page = () => {
  return (
    <div>
        <Navbar />
        <Reader/>
        <Footer />
    </div>
  )
}

export default page