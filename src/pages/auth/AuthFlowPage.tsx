import React, { useState } from 'react'
import CreateAccountPage from './CreateAccountPage'
import VerifyEmailPage from './VerifyEmailPage'
import SuccessPage from './SuccessPage'
import WelcomeBackPage from './WelcomeBackPage'

type AuthStep = 'welcome' | 'create-account' | 'verify-email' | 'success' | 'sign-in'

const AuthFlowPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('welcome')
  const [userEmail, setUserEmail] = useState('')

  const handleCreateAccountNext = () => {
    // In a real app, you'd extract email from the form
    setUserEmail('user@example.com')
    setCurrentStep('verify-email')
  }

  const handleEmailVerified = () => {
    setCurrentStep('success')
  }

  const handleSuccessContinue = () => {
    // Navigate to main app
    console.log('Navigating to main app...')
    alert('Welcome to SafeMate! 🎉')
  }

  const handleSignInSuccess = (email: string, password: string) => {
    console.log('Sign in successful:', { email, password })
    // Navigate to main app
    alert('Welcome back to SafeMate! 🎉')
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
      case 'sign-in':
        return (
          <WelcomeBackPage
            onSignIn={handleSignInSuccess}
            onCreateAccount={() => setCurrentStep('create-account')}
            onForgotPassword={() => alert('Forgot password flow would go here')}
          />
        )
      
      case 'create-account':
        return (
          <CreateAccountPage
            onNext={handleCreateAccountNext}
            onSignInClick={() => setCurrentStep('sign-in')}
          />
        )
      
      case 'verify-email':
        return (
          <VerifyEmailPage
            email={userEmail}
            onVerified={handleEmailVerified}
            onResendEmail={() => console.log('Resending email...')}
            onBackToSignIn={() => setCurrentStep('sign-in')}
          />
        )
      
      case 'success':
        return (
          <SuccessPage
            onContinue={handleSuccessContinue}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {renderCurrentStep()}
    </div>
  )
}

export default AuthFlowPage