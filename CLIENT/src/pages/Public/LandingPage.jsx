import React from 'react'

// pages/Home.jsx
import Navbar from "../../components/Navbar";
import Hero from "../../components/landingPage/Hero";
import HowItWorks from "../../components/landingPage/HowItWorks";
import Features from "../../components/landingPage/Features";
import Testimonials from "../../components/landingPage/Testemonials";
import CTA from "../../components/landingPage/CTA";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

