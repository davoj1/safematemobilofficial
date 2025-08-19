import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import JobsSelectCompanyPage from './pages/JobsSelectCompanyPage'
import JobsCreateJobPage from './pages/JobsCreateJobPage'
import JobsCompletedReviewPage from './pages/JobsCompletedReviewPage'
import JobTeamChatPage from './pages/JobTeamChatPage'
import FormsSelectMineCompanyPage from './pages/FormsSelectMineCompanyPage'
import { SiteSelectionPage, FormSelectionPage } from './pages/mines'
import { BHPFormSelectionPage } from './pages/bhp'
import { TakeControlFormPage, MyExposuresFormPage, HazardIdentificationPage, CompanyWorkerDetailsPage, TakeControlReviewPage, TakeControlSuccessPage } from './pages/forms'
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
  const [currentView, setCurrentView] = useState<'home' | 'jobs-select-company' | 'jobs-create-job' | 'jobs-completed-review' | 'job-team-chat' | 'forms-select-mine-company' | 'forms-bhp-site-selection' | 'forms-fmg-site-selection' | 'forms-bhp-form-selection' | 'forms-fmg-form-selection' | 'forms-take-control' | 'forms-my-exposures' | 'forms-hazard-identification' | 'forms-company-worker-details' | 'forms-take-control-review' | 'forms-take-control-success' | 'create-account' | 'verify-email' | 'success' | 'sign-in' | 'forgot-password' | 'reset-password' | 'password-changed-success' | 'upload-profile-picture' | 'enter-full-name' | 'profile-created-success'>('home')
  const [homeActiveTab, setHomeActiveTab] = useState<'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home'>('forms')

  const navigateTo = (view: typeof currentView) => {
    // Set the appropriate home tab when navigating to flows
    if (view === 'forms-select-mine-company' || view === 'forms-bhp-site-selection' || view === 'forms-fmg-site-selection' || view === 'forms-bhp-form-selection' || view === 'forms-fmg-form-selection' || view === 'forms-take-control' || view === 'forms-my-exposures' || view === 'forms-hazard-identification' || view === 'forms-company-worker-details' || view === 'forms-take-control-review' || view === 'forms-take-control-success') {
      setHomeActiveTab('forms')
    } else if (view === 'jobs-select-company') {
      setHomeActiveTab('jobs')
    }
    setCurrentView(view)
  }

  const navigateToHome = (activeTab: 'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home' = 'jobs') => {
    setHomeActiveTab(activeTab)
    setCurrentView('home')
  }

  return (
    <div className="App">
      {/* Render current view */}
      {currentView === 'home' && (
        <HomePage onNavigate={navigateTo} initialActiveTab={homeActiveTab} />
      )}
      
      {currentView === 'jobs-select-company' && (
        <JobsSelectCompanyPage 
          onNavigate={navigateTo}
          onNavigateToHome={navigateToHome}
        />
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

      {currentView === 'forms-select-mine-company' && (
        <FormsSelectMineCompanyPage 
          onNavigate={navigateTo} 
          onNavigateToHome={navigateToHome}
        />
      )}

      {currentView === 'forms-bhp-site-selection' && (
        <SiteSelectionPage 
          company="bhp"
          onBack={() => navigateTo('forms-select-mine-company')}
          onSiteSelect={(siteId) => navigateTo('forms-bhp-form-selection')}
        />
      )}

      {currentView === 'forms-fmg-site-selection' && (
        <SiteSelectionPage 
          company="fmg"
          onBack={() => navigateTo('forms-select-mine-company')}
          onSiteSelect={(siteId) => navigateTo('forms-fmg-form-selection')}
        />
      )}

      {currentView === 'forms-bhp-form-selection' && (
        <BHPFormSelectionPage 
          onClose={() => navigateToHome('forms')}
          onEditSite={() => navigateTo('forms-bhp-site-selection')}
          onFormSelect={(formId) => console.log('Selected BHP form:', formId)}
        />
      )}

      {currentView === 'forms-fmg-form-selection' && (
        <FormSelectionPage 
          company="fmg"
          onClose={() => navigateToHome('forms')}
          onEditSite={() => navigateTo('forms-fmg-site-selection')}
          onFormSelect={(formId) => {
            if (formId === 'take-control') {
              navigateTo('forms-take-control')
            } else {
              console.log('Selected FMG form:', formId)
            }
          }}
        />
      )}

      {currentView === 'forms-take-control' && (
        <TakeControlFormPage 
          onBack={() => navigateTo('forms-fmg-form-selection')}
          onNext={(formData) => {
            console.log('Take Control step 1 completed:', formData)
            navigateTo('forms-my-exposures')
          }}
        />
      )}

      {currentView === 'forms-my-exposures' && (
        <MyExposuresFormPage 
          onBack={() => navigateTo('forms-take-control')}
          onNext={(formData) => {
            console.log('My Exposures step 2 completed:', formData)
            navigateTo('forms-hazard-identification')
          }}
        />
      )}

      {currentView === 'forms-hazard-identification' && (
        <HazardIdentificationPage 
          onBack={() => navigateTo('forms-my-exposures')}
          onNext={(formData) => {
            console.log('Hazard Identification step 3 completed:', formData)
            navigateTo('forms-company-worker-details')
          }}
          onClose={() => navigateToHome('forms')}
        />
      )}

      {currentView === 'forms-company-worker-details' && (
        <CompanyWorkerDetailsPage 
          onBack={() => navigateTo('forms-hazard-identification')}
          onComplete={(formData) => {
            console.log('Take Control form step 4 completed:', formData)
            navigateTo('forms-take-control-review')
          }}
          onClose={() => navigateToHome('forms')}
        />
      )}

      {currentView === 'forms-take-control-review' && (
        <TakeControlReviewPage 
          onBack={() => navigateTo('forms-company-worker-details')}
          onSubmit={() => {
            console.log('Take Control form submitted successfully!')
            navigateTo('forms-take-control-success')
          }}
        />
      )}
      {currentView === 'forms-take-control-success' && (
        <TakeControlSuccessPage 
          onGoHome={() => navigateToHome('forms')}
        />
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