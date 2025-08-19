import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import JobsSelectCompanyPage from './pages/JobsSelectCompanyPage'
import JobsCreateJobPage from './pages/JobsCreateJobPage'
import JobsCompletedReviewPage from './pages/JobsCompletedReviewPage'
import JobTeamChatPage from './pages/JobTeamChatPage'
import FormsSelectMineCompanyPage from './pages/FormsSelectMineCompanyPage'
import { SiteSelectionPage, FormSelectionPage } from './pages/mines'
import { BHPFormSelectionPage } from './pages/bhp'
import { TakeControlFormPage, MyExposuresFormPage, HazardIdentificationPage, CompanyWorkerDetailsPage, TakeControlReviewPage, TakeControlSuccessPage, FatigueManagementStep1Page, FatigueManagementStep2Page, FatigueManagementStep3Page, FatigueManagementStep4Page, FatigueManagementStep5Page, FatigueManagementStep6Page, FatigueManagementReviewPage, FatigueManagementSuccessPage } from './pages/forms'
// Site images
import BMAaustralia from './assets/minesites/bhp/BMAaustralia.png'
import BMAblackwateraustralia from './assets/minesites/bhp/BMAblackwateraustralia.png'
import newman from './assets/minesites/bhp/newman.png'
import jimblebar from './assets/minesites/bhp/jimblebar.png'
import southflank from './assets/minesites/bhp/southflank.png'
import huntervalley from './assets/minesites/bhp/huntervalley.png'
import olympicdam from './assets/minesites/bhp/olympicdam.png'
import nickelwest from './assets/minesites/bhp/nickelwest.png'
import fmgPortHedland from './assets/minesites/fmg/fmgporthedland.png'
import fmgChristmasCreek from './assets/minesites/fmg/fmgchristmascreek.png'
import fmgCloudbreak from './assets/minesites/fmg/fmgcloudbreak.png'
import fmgEliwana from './assets/minesites/fmg/fmgeliwana.png'
import fmgIronBridge from './assets/minesites/fmg/fmgironbridge.png'
import fmgSolomon from './assets/minesites/fmg/fmgsolomon.png'
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
  const [currentView, setCurrentView] = useState<'home' | 'jobs-select-company' | 'jobs-create-job' | 'jobs-completed-review' | 'job-team-chat' | 'forms-select-mine-company' | 'forms-bhp-site-selection' | 'forms-fmg-site-selection' | 'forms-bhp-form-selection' | 'forms-fmg-form-selection' | 'forms-take-control' | 'forms-my-exposures' | 'forms-hazard-identification' | 'forms-company-worker-details' | 'forms-take-control-review' | 'forms-take-control-success' | 'forms-fatigue-management-step1' | 'forms-fatigue-management-step2' | 'forms-fatigue-management-step3' | 'forms-fatigue-management-step4' | 'forms-fatigue-management-step5' | 'forms-fatigue-management-step6' | 'forms-fatigue-management-review' | 'forms-fatigue-management-success' | 'create-account' | 'verify-email' | 'success' | 'sign-in' | 'forgot-password' | 'reset-password' | 'password-changed-success' | 'upload-profile-picture' | 'enter-full-name' | 'profile-created-success'>('home')
  const [homeActiveTab, setHomeActiveTab] = useState<'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home'>('forms')
  const [previousFormSelectionView, setPreviousFormSelectionView] = useState<'forms-bhp-form-selection' | 'forms-fmg-form-selection' | null>(null)
  const [selectedSite, setSelectedSite] = useState<{id: string, name: string, location: string, image: string} | null>(null)
  
  // Fatigue Management Form Data
  const [fatigueFormData, setFatigueFormData] = useState<{
    sleep24h?: string
    sleep48h?: string
    alertness?: string
    gender?: string
    alcoholIntake?: string
    medication?: string
    stress?: string
    wellbeingRating?: string
    firstName?: string
    lastName?: string
    signature?: string
  }>({})

  // Site data for lookup
  const allSites = {
    // BHP Sites
    'bma-australia': { id: 'bma-australia', name: 'BMA Australia', location: 'Bowen Basin, QLD', image: BMAaustralia },
    'bma-blackwater-australia': { id: 'bma-blackwater-australia', name: 'BMA Blackwater Australia', location: 'Bowen Basin, QLD', image: BMAblackwateraustralia },
    'western-australian-iron-ore': { id: 'western-australian-iron-ore', name: 'Western Australian Iron Ore', location: 'Newman, WA', image: newman },
    'western-australia-iron-ore-jimblebar': { id: 'western-australia-iron-ore-jimblebar', name: 'Western Australia Iron Ore', location: 'Jimblebar, WA', image: jimblebar },
    'western-australia-iron-ore-south-flank': { id: 'western-australia-iron-ore-south-flank', name: 'Western Australia Iron Ore', location: 'South Flank, WA', image: southflank },
    'mt-arthur-coal': { id: 'mt-arthur-coal', name: 'Mt Arthur Coal', location: 'Hunter Valley, NSW', image: huntervalley },
    'olympic-dam': { id: 'olympic-dam', name: 'Olympic Dam', location: 'South Australia', image: olympicdam },
    'nickel-west': { id: 'nickel-west', name: 'Nickel West', location: 'Mount Keith, WA', image: nickelwest },
    // FMG Sites
    'port-hedland': { id: 'port-hedland', name: 'Port Hedland', location: 'Pilbara, WA', image: fmgPortHedland },
    'christmas-creek': { id: 'christmas-creek', name: 'Christmas Creek', location: 'Pilbara, WA', image: fmgChristmasCreek },
    'cloudbreak': { id: 'cloudbreak', name: 'Cloudbreak', location: 'Pilbara, WA', image: fmgCloudbreak },
    'eliwana': { id: 'eliwana', name: 'Eliwana', location: 'Pilbara, WA', image: fmgEliwana },
    'iron-bridge': { id: 'iron-bridge', name: 'Iron Bridge', location: 'Pilbara, WA', image: fmgIronBridge },
    'solomon': { id: 'solomon', name: 'Solomon', location: 'Pilbara, WA', image: fmgSolomon },
  }

  const handleSiteSelection = (siteId: string) => {
    const site = allSites[siteId as keyof typeof allSites]
    if (site) {
      setSelectedSite(site)
    }
  }

  // Helper functions for fatigue form data
  const updateFatigueFormData = (updates: Partial<typeof fatigueFormData>) => {
    setFatigueFormData(prev => ({ ...prev, ...updates }))
  }

  const resetFatigueFormData = () => {
    setFatigueFormData({})
  }

  const navigateTo = (view: typeof currentView) => {
    // Set the appropriate home tab when navigating to flows
    if (view === 'forms-select-mine-company' || view === 'forms-bhp-site-selection' || view === 'forms-fmg-site-selection' || view === 'forms-bhp-form-selection' || view === 'forms-fmg-form-selection' || view === 'forms-take-control' || view === 'forms-my-exposures' || view === 'forms-hazard-identification' || view === 'forms-company-worker-details' || view === 'forms-take-control-review' || view === 'forms-take-control-success' || view === 'forms-fatigue-management-step1' || view === 'forms-fatigue-management-step2' || view === 'forms-fatigue-management-step3' || view === 'forms-fatigue-management-step4' || view === 'forms-fatigue-management-step5' || view === 'forms-fatigue-management-step6' || view === 'forms-fatigue-management-review' || view === 'forms-fatigue-management-success') {
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
          onSiteSelect={(siteId) => {
            handleSiteSelection(siteId)
            navigateTo('forms-bhp-form-selection')
          }}
        />
      )}

      {currentView === 'forms-fmg-site-selection' && (
        <SiteSelectionPage
          company="fmg"
          onBack={() => navigateTo('forms-select-mine-company')}
          onSiteSelect={(siteId) => {
            handleSiteSelection(siteId)
            navigateTo('forms-fmg-form-selection')
          }}
        />
      )}

      {currentView === 'forms-bhp-form-selection' && (
        <BHPFormSelectionPage 
          onClose={() => navigateToHome('forms')}
          onEditSite={() => navigateTo('forms-bhp-site-selection')}
          onFormSelect={(formId) => {
            if (formId === 'fatigue-management') {
              setPreviousFormSelectionView('forms-bhp-form-selection')
              resetFatigueFormData()
              // Add some test data to see risk calculation working
              setFatigueFormData({
                sleep24h: 'Less than 5',
                sleep48h: 'Less than 12', 
                alertness: 'Sleepy, groggy, hard to concentrate.',
                gender: 'male',
                alcoholIntake: 'More than 6',
                medication: 'Yes',
                stress: 'Yes',
                wellbeingRating: '0-2'
              })
              navigateTo('forms-fatigue-management-step1')
            } else {
              console.log('Selected BHP form:', formId)
            }
          }}
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
            } else if (formId === 'fatigue-management') {
              setPreviousFormSelectionView('forms-fmg-form-selection')
              resetFatigueFormData()
              // Add some test data to see risk calculation working
              setFatigueFormData({
                sleep24h: 'Less than 5',
                sleep48h: 'Less than 12', 
                alertness: 'Sleepy, groggy, hard to concentrate.',
                gender: 'male',
                alcoholIntake: 'More than 6',
                medication: 'Yes',
                stress: 'Yes',
                wellbeingRating: '0-2'
              })
              navigateTo('forms-fatigue-management-step1')
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

      {currentView === 'forms-fatigue-management-step1' && (
        <FatigueManagementStep1Page 
          onNext={(sleep24h, sleep48h) => {
            updateFatigueFormData({ sleep24h, sleep48h })
            navigateTo('forms-fatigue-management-step2')
          }}
          onBack={() => {
            // Navigate back to the appropriate form selection screen
            if (previousFormSelectionView) {
              navigateTo(previousFormSelectionView)
            } else {
              // Fallback to forms home if no previous view tracked
              navigateToHome('forms')
            }
          }}
        />
      )}

      {currentView === 'forms-fatigue-management-step2' && (
        <FatigueManagementStep2Page 
          onNext={() => {
            console.log('Fatigue Management Step 2 completed')
            navigateTo('forms-fatigue-management-step3')
          }}
          onBack={() => navigateTo('forms-fatigue-management-step1')}
          onClose={() => {
            // Navigate back to the appropriate form selection screen
            if (previousFormSelectionView) {
              navigateTo(previousFormSelectionView)
            } else {
              // Fallback to forms home if no previous view tracked
              navigateToHome('forms')
            }
          }}
        />
      )}

      {currentView === 'forms-fatigue-management-step3' && (
        <FatigueManagementStep3Page 
          onNext={() => {
            console.log('Fatigue Management Step 3 completed')
            navigateTo('forms-fatigue-management-step4')
          }}
          onBack={() => navigateTo('forms-fatigue-management-step2')}
          onClose={() => {
            // Navigate back to the appropriate form selection screen
            if (previousFormSelectionView) {
              navigateTo(previousFormSelectionView)
            } else {
              // Fallback to forms home if no previous view tracked
              navigateToHome('forms')
            }
          }}
        />
      )}

      {currentView === 'forms-fatigue-management-step4' && (
        <FatigueManagementStep4Page 
          onNext={() => {
            console.log('Fatigue Management Step 4 completed')
            navigateTo('forms-fatigue-management-step5')
          }}
          onBack={() => navigateTo('forms-fatigue-management-step3')}
          onClose={() => {
            // Navigate back to the appropriate form selection screen
            if (previousFormSelectionView) {
              navigateTo(previousFormSelectionView)
            } else {
              // Fallback to forms home if no previous view tracked
              navigateToHome('forms')
            }
          }}
        />
      )}

      {currentView === 'forms-fatigue-management-step5' && (
        <FatigueManagementStep5Page 
          onNext={() => {
            console.log('Fatigue Management Step 5 completed')
            navigateTo('forms-fatigue-management-step6')
          }}
          onBack={() => navigateTo('forms-fatigue-management-step4')}
          onClose={() => {
            // Navigate back to the appropriate form selection screen
            if (previousFormSelectionView) {
              navigateTo(previousFormSelectionView)
            } else {
              // Fallback to forms home if no previous view tracked
              navigateToHome('forms')
            }
          }}
        />
      )}

      {currentView === 'forms-fatigue-management-step6' && (
        <FatigueManagementStep6Page 
          onNext={(firstName, lastName, signature) => {
            updateFatigueFormData({ firstName, lastName, signature })
            navigateTo('forms-fatigue-management-review')
          }}
          onBack={() => navigateTo('forms-fatigue-management-step5')}
          onClose={() => {
            // Navigate back to the appropriate form selection screen
            if (previousFormSelectionView) {
              navigateTo(previousFormSelectionView)
            } else {
              // Fallback to forms home if no previous view tracked
              navigateToHome('forms')
            }
          }}
        />
      )}

      {currentView === 'forms-fatigue-management-review' && (
        <FatigueManagementReviewPage 
          onBack={() => navigateTo('forms-fatigue-management-step6')}
          onSubmit={() => {
            console.log('Fatigue Management Form submitted:', fatigueFormData)
            navigateTo('forms-fatigue-management-success')
          }}
          mineCompany={previousFormSelectionView === 'forms-bhp-form-selection' ? 'bhp' : 'fmg'}
          selectedSite={selectedSite}
          formData={fatigueFormData}
        />
      )}

      {currentView === 'forms-fatigue-management-success' && (
        <FatigueManagementSuccessPage 
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