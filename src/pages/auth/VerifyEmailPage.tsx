import React, { useState, useEffect, useRef } from 'react'
import logo from '../../assets/logo.svg'

interface VerifyEmailPageProps {
  email?: string
  onVerified?: () => void
  onResendEmail?: () => void
  onBackToSignIn?: () => void
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({
  email = 'david-strike@safemate.com',
  onVerified,
  onResendEmail,
  onBackToSignIn,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async () => {
    const otpString = otp.join('')
    if (otpString.length !== 6) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Verifying OTP:', otpString)
      onVerified?.()
    } catch (error) {
      console.error('OTP verification failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = () => {
    onResendEmail?.()
  }

  const isOtpComplete = otp.every(digit => digit !== '')

  return (
    <div className="bg-white overflow-hidden relative w-full min-h-screen">
      <div className="flex flex-col h-screen">
        <div className="absolute box-border content-stretch flex flex-col gap-8 h-[calc(100vh-120px)] items-center justify-start left-1/2 transform -translate-x-1/2 pb-3 pt-6 px-5 top-0 w-full max-w-sm">
          
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="SafeMate"
              className="h-10 w-auto"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 w-full">
            {/* Header */}
            <div className="text-center">
              <h1 className="font-bold text-[#122d35] text-2xl leading-tight mb-2">
                Verify your email
              </h1>
              <p className="text-[#101828] text-base leading-6">
                We've sent an one-time passcode to{' '}
                <span className="font-semibold text-[#266273]">{email}</span>
                . Enter the code below in the next 20 minutes
              </p>
            </div>

            {/* OTP Input */}
            <div className="space-y-4">
            <div className="flex gap-1.5">
              {otp.map((digit, index) => (
                <div key={index} className="flex-1">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-full px-4 py-4 border border-[#d0d5dd] rounded-xl text-center text-lg font-medium text-[#182230] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent transition-all duration-200"
                    placeholder=""
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="mb-6">
            <button
              onClick={handleSubmit}
              disabled={!isOtpComplete || loading}
              className={`w-full py-3 px-4 rounded-2xl font-semibold text-base transition-all duration-200 ${
                isOtpComplete && !loading
                  ? 'bg-[#266273] text-white hover:bg-[#1e4d59]'
                  : 'bg-[#f2f4f7] text-[#98a2b3] cursor-not-allowed'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Verifying...
                </div>
              ) : (
                'Continue'
              )}
            </button>
          </div>

          {/* Resend Code */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-1">
              <span className="text-[#464c5e] text-base">
                Don't see an email?
              </span>
              <button
                onClick={handleResendCode}
                className="text-[#2a6c7e] font-semibold text-base hover:text-[#1e4d59] transition-colors"
              >
                Resend code
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="text-center">
            <p className="text-xs text-[#667085]">
              I agree to the{' '}
              <span className="underline cursor-pointer hover:text-[#266273]">Terms & Conditions</span>
              {' '}of SafeMate and acknowledge the{' '}
              <span className="underline cursor-pointer hover:text-[#266273]">Privacy Policy</span>.
            </p>
          </div>
        </div>

              </div>
    </div>
      </div>
  )
}

export default VerifyEmailPage