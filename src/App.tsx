import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import JobsSelectCompanyPage from './pages/JobsSelectCompanyPage'
import JobsCreateJobPage from './pages/JobsCreateJobPage'
import JobsCompletedReviewPage from './pages/JobsCompletedReviewPage'
import JobTeamChatPage from './pages/JobTeamChatPage'
import CreateAccountPage from './pages/auth/CreateAccountPage'
import VerifyEmailPage from './pages/auth/VerifyEmailPage'
import SuccessPage from './pages/auth/SuccessPage'
import WelcomeBackPage from './pages/auth/WelcomeBackPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import PasswordChangedSuccessPage from './pages/auth/PasswordChangedSuccessPage'
import UploadProfilePicturePage from './pages/profile/UploadProfilePicturePage'
import EnterFullNamePage from './pages/profile/EnterFullNamePage'
import ProfileCreatedSuccessPage from './pages/profile/ProfileCreatedSuccessPage'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'jobs-select-company' | 'jobs-create-job' | 'jobs-completed-review' | 'job-team-chat' | 'create-account' | 'verify-email' | 'success' | 'sign-in' | 'forgot-password' | 'reset-password' | 'password-changed-success' | 'upload-profile-picture' | 'enter-full-name' | 'profile-created-success'>('home')

  const navigateTo = (view: typeof currentView) => {
    setCurrentView(view)
  }

  return (
    <div className="App">
      {/* Render current view */}
      {currentView === 'home' && (
        <HomePage onNavigate={navigateTo} initialActiveTab="jobs" />
      )}
      
      {currentView === 'jobs-select-company' && (
        <JobsSelectCompanyPage onNavigate={navigateTo} />
      )}
      
      {currentView === 'jobs-create-job' && (
        <JobsCreateJobPage onNavigate={navigateTo} />
      )}

      {currentView === 'jobs-completed-review' && (
        <JobsCompletedReviewPage onBackToHome={() => navigateTo('home')} />
      )}

      {currentView === 'job-team-chat' && (
        <JobTeamChatPage onBackToJob={() => navigateTo('home')} />
      )}
      
      {currentView === 'create-account' && (
        <CreateAccountPage 
          onNext={() => navigateTo('verify-email')}
          onSignInClick={() => navigateTo('sign-in')}
        />
      )}
      
      {currentView === 'verify-email' && (
        <VerifyEmailPage 
          email="david-strike@safemate.com"
          onVerified={() => navigateTo('success')}
          onResendEmail={() => alert('Resending code...')}
          onBackToSignIn={() => navigateTo('sign-in')}
        />
      )}
      
      {currentView === 'success' && (
        <SuccessPage 
          onContinue={() => navigateTo('sign-in')}
        />
      )}

      {currentView === 'sign-in' && (
        <WelcomeBackPage 
          onSignIn={(email, password) => alert(`Signing in with ${email}...`)}
          onCreateAccount={() => navigateTo('create-account')}
          onForgotPassword={() => navigateTo('forgot-password')}
        />
      )}

      {currentView === 'forgot-password' && (
        <ForgotPasswordPage 
          onResetPassword={(email) => alert(`Sending code to ${email}...`)}
          onBackToSignIn={() => navigateTo('sign-in')}
        />
      )}

      {currentView === 'reset-password' && (
        <ResetPasswordPage 
          onChangePassword={(newPassword, confirmPassword) => alert(`Changing password...`)}
          onBackToSignIn={() => navigateTo('sign-in')}
        />
      )}

      {currentView === 'password-changed-success' && (
        <PasswordChangedSuccessPage
          onBackToSignIn={() => navigateTo('sign-in')}
        />
      )}

      {currentView === 'upload-profile-picture' && (
        <UploadProfilePicturePage
          onContinue={() => navigateTo('enter-full-name')}
          onSkip={() => navigateTo('enter-full-name')}
          onBackToOnboarding={() => navigateTo('create-account')}
        />
      )}

      {currentView === 'enter-full-name' && (
        <EnterFullNamePage
          onContinue={() => navigateTo('profile-created-success')}
          onBackToOnboarding={() => navigateTo('create-account')}
        />
      )}

      {currentView === 'profile-created-success' && (
        <ProfileCreatedSuccessPage
          onGoToHome={() => navigateTo('home')}
        />
      )}
    </div>
  )
}

export default App