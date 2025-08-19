import React, { useState, useEffect } from 'react'

// Import your actual Figma images
import onboarding1 from '../assets/safemateonboard1.png'
import onboarding2 from '../assets/safemateonboard2.png'
import onboarding3 from '../assets/safemateonboard3.png'

function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: 'Start Safe, Stay Safe',
      subtitle: 'Begin every shift with a quick risk check to protect yourself and your team.',
      image: onboarding1
    },
    {
      title: 'Stay On Track', 
      subtitle: 'Complete short safety check-ins throughout the day to stay alert and compliant.',
      image: onboarding2
    },
    {
      title: 'Report Fast, Act Fast',
      subtitle: 'Easily flag issues or hazards so your team can act before it\'s too late.',
      image: onboarding3
    }
  ]

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // 5 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  // Smooth transition state
  const [isTransitioning, setIsTransitioning] = useState(false)

  return (
    <div className="bg-white overflow-hidden relative w-full min-h-screen">
      {/* Main Container - Mobile Optimized */}
      <div className="flex flex-col h-screen">
        
        {/* Hero Image - Full Width with Curved Bottom */}
        <div className="h-[45vh] min-h-[280px] max-h-[350px] w-full relative">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
            style={{
              clipPath: 'ellipse(100% 100% at 50% 0%)'
            }}
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl" style="clip-path: ellipse(100% 100% at 50% 0%)">
                  🏗️
                </div>
              `
            }}
          />
        </div>

        {/* Content Section - Flexible */}
        <div className="flex-1 flex flex-col justify-between px-4 py-6 max-w-sm mx-auto w-full">
          
          {/* Text Content */}
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="font-bold text-[#182230] text-2xl leading-tight px-2">
                {slides[currentSlide].title}
              </h1>
              <p className="font-normal text-[#667085] text-sm leading-relaxed px-2">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Pagination Dots */}
            <div className="flex flex-row gap-1.5 items-center">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'bg-[#266273] h-1.5 w-8' 
                      : 'bg-[#eaecf0] size-2'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 w-full mt-8">
            {/* Create Account Button */}
            <button 
              onClick={() => alert('Create account clicked!')}
              className="bg-[#266273] w-full py-3.5 rounded-xl border border-[#266273] transition-colors"
            >
              <span className="font-semibold text-white text-base">
                Create account
              </span>
            </button>

            {/* Sign In Button */}
            <button 
              onClick={() => alert('Sign in clicked!')}
              className="bg-white w-full py-3.5 rounded-xl border border-[#2a6c7e] transition-colors hover:bg-gray-50"
            >
              <span className="font-semibold text-[#1e4d59] text-base">
                Sign in
              </span>
            </button>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pb-2">
          <div className="bg-black h-1 rounded-full w-32 opacity-60" />
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage