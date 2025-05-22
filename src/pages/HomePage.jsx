import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import Model from '../components/IPhone'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <main className="bg-black">
      <Hero />
      <Highlights />
      {/* <Model /> */}
      <Features />
      <HowItWorks />
    </main>
  )
}

export default HomePage