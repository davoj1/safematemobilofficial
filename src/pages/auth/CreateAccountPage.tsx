import React, { useState } from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import AuthButton from '../../components/auth/AuthButton'
import AuthInput from '../../components/auth/AuthInput'
import logo from '../../assets/logo.svg'

interface CreateAccountPageProps {
  onNext?: () => void
  onSignInClick?: () => void
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({
  onNext,
  onSignInClick,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      console.log('Creating account:', formData)
      onNext?.()
    } catch (error) {
      console.error('Account creation failed:', error)
      setErrors({ general: 'Account creation failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword

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
                Create account
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <label className="text-sm font-medium text-[#344054]">
                  Password
                </label>
                <span className="text-[#d92d20] text-sm">*</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Input your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 border border-[#d0d5dd] rounded-xl text-base placeholder:text-[#667085] text-[#182230] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${showPassword ? 'text-[#667085]' : 'text-[#98a2b3]'}`}
                >
                  <div className="relative">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {!showPassword && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-px bg-[#98a2b3] transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                </button>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>
              <p className="text-sm text-[#475467]">
                Min 6 characters, 1 lowercase, 1 uppercase and 1 number. Only the following special characters are allowed: !@#$%^
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <label className="text-sm font-medium text-[#344054]">
                  Confirm Password
                </label>
                <span className="text-[#d92d20] text-sm">*</span>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Input your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 border border-[#d0d5dd] rounded-xl text-base placeholder:text-[#667085] text-[#182230] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${showConfirmPassword ? 'text-[#667085]' : 'text-[#98a2b3]'}`}
                >
                  <div className="relative">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {!showConfirmPassword && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-px bg-[#98a2b3] transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                </button>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Create Account Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-3 px-4 rounded-2xl font-semibold text-base transition-all duration-200 ${
                  isFormValid && !loading
                    ? 'bg-[#266273] text-white hover:bg-[#1e4d59]'
                    : 'bg-[#f2f4f7] text-[#98a2b3] cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={onSignInClick}
                className="text-[#2a6c7e] font-semibold text-base hover:text-[#1e4d59] transition-colors"
              >
                I already have an account
              </button>
            </div>

            {/* Terms & Conditions */}
            <div className="text-center pt-4">
              <p className="text-xs text-[#667085]">
                I agree to the{' '}
                <span className="underline cursor-pointer hover:text-[#266273]">Terms & Conditions</span>
                {' '}of SafeMate and acknowledge the{' '}
                <span className="underline cursor-pointer hover:text-[#266273]">Privacy Policy</span>.
              </p>
            </div>
          </form>
        </div>
      </div>

      </div>
    </div>
  )
}

export default CreateAccountPage