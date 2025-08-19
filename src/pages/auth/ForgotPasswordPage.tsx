import React, { useState } from 'react'
import logo from '../../assets/logo.svg'
import AuthButton from '../../components/auth/AuthButton'

interface ForgotPasswordPageProps {
  onResetPassword?: (email: string) => void
  onBackToSignIn?: () => void
  email?: string
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onResetPassword,
  onBackToSignIn,
  email = '',
}) => {
  const [formData, setFormData] = useState({
    email: email,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Resetting password for:', formData.email)
      onResetPassword?.(formData.email)
    } catch (error) {
      console.error('Password reset failed:', error)
      setErrors({ general: 'Password reset failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.email && Object.keys(errors).length === 0

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
              <h1 className="font-bold text-[#122d35] text-2xl leading-tight">
                Forgot password?
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <label className="text-sm font-medium text-[#344054]">
                  Email
                </label>
                <span className="text-[#d92d20] text-sm">*</span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Input your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#d0d5dd] rounded-xl text-base placeholder:text-[#667085] text-[#182230] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Back to Sign In Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onBackToSignIn}
                className="text-[#266273] font-medium text-base hover:text-[#1e4d59] transition-colors"
              >
                ← Back to Sign In
              </button>
            </div>

            {/* Send Code Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-3 px-4 rounded-2xl font-semibold text-base transition-all duration-200 ${
                  isFormValid && !loading
                    ? 'bg-[#266273] text-white hover:bg-[#1e4d59] border border-[#266273]'
                    : 'bg-[#f2f4f7] text-[#98a2b3] cursor-not-allowed border border-[#f2f4f7]'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </div>
                ) : (
                  'Send Code'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      </div>
    </div>
  )
}

export default ForgotPasswordPage 