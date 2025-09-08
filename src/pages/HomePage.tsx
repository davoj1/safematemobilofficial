import React, { useState } from 'react'
import { BottomNavigation } from '../components/layout'
import { SearchInput, TabNavigation, CompanyCard, HistoryEmptyState, HistoryFormsState, FilterSlideUp, Button } from '../components/ui'
import { SiteSelectionPage, FormSelectionPage } from './mines'
import { TakeControlFormPage, MyExposuresFormPage } from './forms'
import { LeaderboardProfilePage, LeaderboardPage, StreakDetailPage } from './leaderboard'
import logo from '../assets/logo.svg'
import safemateShieldLogo from '../assets/safemateshieldlogo.svg'
import trophyIcon from '../assets/leaderboardicon.svg'
import notificationIcon from '../assets/notificationicon.svg'

// Company logos
import warrikalIcon from '../assets/companylogo/warrikallogo.svg'
import monaIcon from '../assets/companylogo/monalogo.svg'
import goodlineIcon from '../assets/companylogo/goodlinelogo.svg'
import vehiclePrestartIcon from '../assets/history/vehicleprestarticon.svg'
import take5Icon from '../assets/history/take5icon.svg'
import reportHazardIcon from '../assets/history/reporthazardicon.svg'
import noJobsIcon from '../assets/jobs/nojobsicon.svg'
// Jobs assets
import jobDescriptionIcon from '../assets/jobs/jobdescriptionicon.svg'
import workOrderNumberIcon from '../assets/jobs/workordernumbericon.svg'
import siteIcon from '../assets/jobs/siteicon.svg'
import chatIcon from '../assets/jobs/chaticon.svg'
import notesIcon from '../assets/jobs/notesicon.svg'
import avatarBesse from '../assets/jobs/besse.svg'
import avatarArlene from '../assets/jobs/arlene.svg'
import avatarMarvin from '../assets/jobs/marvin.svg'
import avatarTheresa from '../assets/jobs/theresa.svg'
import avatarAp from '../assets/jobs/Avatarap.svg'
import teamMatesIcon from '../assets/jobs/teammembersicon.svg'

// BHP Site Images
import BMAaustralia from '../assets/minesites/bhp/BMAaustralia.png'
import BMAblackwateraustralia from '../assets/minesites/bhp/BMAblackwateraustralia.png'
import newman from '../assets/minesites/bhp/newman.png'
import jimblebar from '../assets/minesites/bhp/jimblebar.png'
import southflank from '../assets/minesites/bhp/southflank.png'
import huntervalley from '../assets/minesites/bhp/huntervalley.png'
import olympicdam from '../assets/minesites/bhp/olympicdam.png'
import nickelwest from '../assets/minesites/bhp/nickelwest.png'

// FMG Site Images
import fmgPortHedland from '../assets/minesites/fmg/fmgporthedland.png'
import fmgChristmasCreek from '../assets/minesites/fmg/fmgchristmascreek.png'
import fmgCloudbreak from '../assets/minesites/fmg/fmgcloudbreak.png'
import fmgEliwana from '../assets/minesites/fmg/fmgeliwana.png'
import fmgIronBridge from '../assets/minesites/fmg/fmgironbridge.png'
import fmgSolomon from '../assets/minesites/fmg/fmgsolomon.png'

interface HomePageProps {
  onNavigate?: (view: "home" | "company" | "settings" | "onboarding" | "jobs-select-company" | "jobs-create-job" | "jobs-completed-review" | "job-team-chat" | "forms-select-mine-company" | "forms-bhp-site-selection" | "forms-warrikal-take-control" | "forms-warrikal-take-control-review" | "forms-warrikal-take-control-success" | "forms-warrikal-fatigue-management-step1" | "forms-warrikal-fatigue-management-step2" | "forms-warrikal-fatigue-management-step3" | "forms-warrikal-fatigue-management-step4" | "forms-warrikal-fatigue-management-step5" | "forms-warrikal-fatigue-management-step6" | "forms-warrikal-fatigue-management-success" | "forms-goodline-fatigue-form" | "forms-goodline-fatigue-step1" | "forms-goodline-fatigue-step2" | "forms-goodline-fatigue-step3" | "forms-goodline-fatigue-step4" | "forms-goodline-fatigue-step5" | "forms-goodline-fatigue-summary" | "forms-goodline-take-control-form" | "forms-goodline-take-control-review" | "forms-goodline-take-control-success" | "forms-goodline-pace-cards-form" | "forms-linkforce-take-control-form" | "forms-linkforce-take-control-review" | "forms-linkforce-take-control-success" | "forms-monadelphous-take-control-form" | "forms-monadelphous-take-control-review" | "forms-monadelphous-take-control-success" | "forms-rio-take5-control-selector" | "forms-rio-take5-step1" | "forms-rio-take5-step2" | "forms-rio-take5-step3" | "forms-rio-take5-step4" | "forms-rio-take5-step5" | "forms-rio-take5-step6" | "forms-rio-take5-success" | "forms-hazard-identification" | "forms-company-worker-details" | "leaderboard" | "leaderboard-company-selection" | "leaderboard-team-selection" | "leaderboard-results" | "profile-enter-full-name" | "profile-created-success" | "forms-bhp-form-selection" | "forms-fmg-form-selection" | "forms-fmg-site-selection" | "forms-goodline-fatigue" | "forms-fatigue-management-step6" | "forms-fatigue-management-review" | "forms-fatigue-management-success" | "forms-take-control" | "forms-take-control-review" | "forms-take-control-success" | "forms-pace-cards" | "forms-pace-cards-review" | "forms-pace-cards-success" | "forms-linkforce-take-control" | "forms-linkforce-take-control-review" | "forms-linkforce-take-control-success" | "forms-monadelphous-take-control" | "forms-monadelphous-take-control-review" | "forms-monadelphous-take-control-success" | "forms-rio-take5" | "forms-rio-take5-step1" | "forms-rio-take5-step2" | "forms-rio-take5-step3" | "forms-rio-take5-step4" | "forms-rio-take5-step5" | "forms-rio-take5-step6" | "forms-rio-take5-success" | "forms-report-hazard-step1" | "forms-report-hazard-step2" | "forms-report-hazard-step3" | "forms-report-hazard-step4" | "forms-report-hazard-review" | "forms-hazard-identification" | "forms-company-worker-details" | "forms-safemate-take5" | "forms-safemate-general-selection" | "leaderboard" | "leaderboard-company-selection" | "leaderboard-team-selection" | "leaderboard-results" | "profile-enter-full-name" | "profile-created-success") => void
  onContractorSelect?: (contractor: 'warrikal' | 'monadelphous' | 'goodline') => void
  initialActiveTab?: 'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home' | 'company' | 'settings'
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onContractorSelect, initialActiveTab = 'forms' }) => {
  const [searchValue, setSearchValue] = useState('')
  const [activeTab, setActiveTab] = useState('templates')
  const [activeBottomTab, setActiveBottomTab] = useState<'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home' | 'company' | 'settings'>(initialActiveTab)
  const [jobsActiveTab, setJobsActiveTab] = useState<'active' | 'completed'>('active')
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const [selectedForm, setSelectedForm] = useState<string | null>(null)
  const [mineFlowStep, setMineFlowStep] = useState<'company' | 'site' | 'form' | 'form-filling'>('company')
  const [formStep, setFormStep] = useState<number>(1)
  
  // Leaderboard state
  const [leaderboardFlow, setLeaderboardFlow] = useState<'none' | 'profile' | 'main'>('none')
  const [userProfile, setUserProfile] = useState<{
    nickname: string
    showRealName: boolean
    profilePicture?: File
  } | null>(null)
  const [showStreakDetail, setShowStreakDetail] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)

  // Sample form history data
  const sampleForms = [
    {
      id: '1',
      title: 'Vehicle Pre-Start – Site A',
      description: 'Inspect vehicle or machinery before operation.',
      companyName: 'Warrikal',
      companyLogo: warrikalIcon,
      timestamp: '2024-01-15T18:20:00Z',
      status: 'completed' as const,
      icon: (
        <img 
          src={vehiclePrestartIcon} 
          alt="Vehicle Pre-Start" 
          className="w-6 h-6"
        />
      )
    },
    {
      id: '3',
      title: 'Hazard Report – South Pit',
      description: 'Report any unsafe condition, behavior, or near-miss at the site.',
      companyName: 'Monadelphous',
      companyLogo: monaIcon,
      timestamp: '2024-01-13T08:01:00Z',
      status: 'completed' as const,
      icon: (
        <img 
          src={reportHazardIcon} 
          alt="Hazard Report" 
          className="w-6 h-6"
        />
      )
    },
    {
      id: '4',
      title: 'Vehicle Pre-Start – North Mine',
      description: 'Pre-operation safety inspection for heavy machinery.',
      companyName: 'Warrikal',
      companyLogo: warrikalIcon,
      timestamp: '2024-01-12T14:30:00Z',
      status: 'completed' as const,
      icon: (
        <img 
          src={vehiclePrestartIcon} 
          alt="Vehicle Pre-Start" 
          className="w-6 h-6"
        />
      )
    },
    {
      id: '6',
      title: 'Hazard Report – Processing Plant',
      description: 'Identified potential safety risk in equipment operation.',
      companyName: 'Monadelphous',
      companyLogo: monaIcon,
      timestamp: '2024-01-10T16:15:00Z',
      status: 'completed' as const,
      icon: (
        <img 
          src={reportHazardIcon} 
          alt="Hazard Report" 
          className="w-6 h-6"
        />
      )
    },
    {
      id: '7',
      title: 'Vehicle Pre-Start – Haul Truck Fleet',
      description: 'Comprehensive inspection of haul truck before shift.',
      companyName: 'Warrikal',
      companyLogo: warrikalIcon,
      timestamp: '2024-01-09T06:20:00Z',
      status: 'completed' as const,
      icon: (
        <img 
          src={vehiclePrestartIcon} 
          alt="Vehicle Pre-Start" 
          className="w-6 h-6"
        />
      )
    },
  ]

  // Sample jobs data (created jobs state) - add completed job
  const sampleJobs = [
    {
      id: 'job-1',
      status: 'Active' as const,
      title: 'Job title here',
      workOrderNumber: '08271',
      description: 'Ut enim ad minim veniam....',
      site: 'Cloudbreak',
      teamMembers: [avatarBesse, avatarArlene, avatarMarvin, avatarTheresa, avatarAp],
      notesPhotosCount: 3,
      completed: false,
    },
    {
      id: 'job-2',
      status: 'Active' as const,
      title: 'Job title here',
      workOrderNumber: '4324',
      description: 'Ut enim ad minim veniam....',
      site: 'Whale Back',
      teamMembers: [],
      notesPhotosCount: 2,
      completed: false,
    },
    {
      id: 'job-3',
      status: 'Completed' as const,
      title: 'Job title here',
      workOrderNumber: '08271',
      description: 'Ut enim ad minim veniam....',
      site: 'Cloudbreak',
      teamMembers: [],
      notesPhotosCount: 3,
      completed: true,
    },
  ]

  const tabs = [
    { id: 'templates', label: 'Templates' },
    { id: 'history', label: 'History' },
  ]

  const companies = [
    {
      id: 'goodline',
      name: 'Goodline Forms',
      logo: goodlineIcon,
      status: 'active',
      role: 'Worker',
    },
    {
      id: 'mona',
      name: 'Monadelphous Forms',
      logo: monaIcon,
      status: 'pending',
      role: 'Admin',
    },
    {
      id: 'warrikal',
      name: 'Warrikal Forms',
      logo: warrikalIcon,
      status: 'active',
      role: 'Supervisor',
    },
  ]

  const safemateGeneralForms = [
    {
      id: 'safemate-general-forms',
      name: 'Safemate Forms',
      logo: safemateShieldLogo, // Using the Safemate shield logo
      status: 'active',
      role: '',
    },
  ]

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompany(companyId)
    if (companyId === 'safemate-general-forms') {
      // Navigate to Safemate general forms selection
      onNavigate?.('forms-safemate-general-selection')
    } else if (companyId === 'warrikal' || companyId === 'mona' || companyId === 'goodline') {
      // Set the selected contractor and navigate to mine company selection
      const contractorMap: Record<string, 'warrikal' | 'monadelphous' | 'goodline'> = {
        'warrikal': 'warrikal',
        'mona': 'monadelphous',
        'goodline': 'goodline'
      }
      const contractor = contractorMap[companyId]
      if (contractor) {
        onContractorSelect?.(contractor)
      }
      onNavigate?.('forms-select-mine-company')
    } else if (companyId === 'bhp' || companyId === 'fmg') {
      setMineFlowStep('site')
    }
    console.log('Selected company:', companyId)
  }

  const handleFilterClick = () => {
    console.log('Filter clicked')
    // Only show filter modal when on history tab
    if (activeTab === 'history') {
      setShowFilterModal(true)
    }
  }

  const handleFilterApply = (filters: any) => {
    console.log('Filters applied:', filters)
    setShowFilterModal(false)
  }

  const handleFilterReset = () => {
    console.log('Filters reset')
  }

  const handleBottomTabChange = (tab: string) => {
    // Keep structure intact; just swap content sections
    if (tab === 'company') {
      // Navigate to dedicated company page
      onNavigate?.('company')
    } else if (tab === 'settings') {
      // Navigate to settings page
      onNavigate?.('settings')
    } else {
      setActiveBottomTab(tab as 'home' | 'forms' | 'jobs' | 'leaderboard' | 'profile')
      if (tab === 'leaderboard') {
        setLeaderboardFlow('main')
      }
    }
  }

  const handleResetFilter = () => {
    console.log('Reset filter clicked')
    setSearchValue('')
    // Reset any other filters here
  }

  const handleFormClick = (formId: string) => {
    console.log('Form clicked:', formId)
    // Handle form click - could open form details, etc.
  }

  const handleTrophyClick = () => {
    console.log('Trophy clicked')
    // Check if user has profile, if not show profile creation
    if (!userProfile) {
      setLeaderboardFlow('profile')
    } else {
      setLeaderboardFlow('main')
    }
  }

  const handleLeaderboardProfileComplete = (profileData: {
    nickname: string
    showRealName: boolean
    profilePicture?: File
  }) => {
    setUserProfile(profileData)
    setLeaderboardFlow('main')
  }

  const handleStreakClick = () => {
    console.log('Streak clicked! Setting showStreakDetail to true')
    setShowStreakDetail(true)
  }

  const handleStreakClose = () => {
    console.log('Streak close clicked! Setting showStreakDetail to false')
    setShowStreakDetail(false)
  }

  const handleLeaderboardBack = () => {
    setLeaderboardFlow('none')
  }

  const handleNotificationClick = () => {
    console.log('Notification clicked')
    // Handle notification functionality
  }

  const handleBackToCompanySelection = () => {
    setSelectedCompany(null)
    setSelectedSite(null)
    setSelectedForm(null)
    setMineFlowStep('company')
  }

  const handleSiteSelect = (siteId: string) => {
    // Find the selected site data
    const siteData = {
      id: siteId,
      name: getSiteName(siteId),
      location: getSiteLocation(siteId),
      image: getSiteImage(siteId),
    }
    setSelectedSite(siteData)
    setMineFlowStep('form')
    console.log('Site selected:', siteId)
  }

  const handleFormSelect = (formId: string) => {
    setSelectedForm(formId)
    setMineFlowStep('form-filling')
    setFormStep(1)
    console.log('Form selected:', formId)
  }

  const handleCloseFormSelection = () => {
    setMineFlowStep('company')
    setSelectedCompany(null)
    setSelectedSite(null)
    setSelectedForm(null)
    setFormStep(1)
  }

  const handleEditSite = () => {
    setMineFlowStep('site')
  }

  const handleBackToFormSelection = () => {
    setMineFlowStep('form')
    setSelectedForm(null)
    setFormStep(1)
  }

  const handleFormNext = (formData: any) => {
    console.log('Form completed:', formData)
    // Navigate to next step
    setFormStep(prevStep => prevStep + 1)
  }

  // Filtered forms for History tab
  const filteredForms = sampleForms.filter(form => {
    if (!searchValue.trim()) return true
    const q = searchValue.toLowerCase()
    return (
      form.title.toLowerCase().includes(q) ||
      form.description.toLowerCase().includes(q) ||
      form.companyName.toLowerCase().includes(q)
    )
  })

  // Filtered companies for Templates tab
  const filteredCompanies = companies.filter(company => {
    if (!searchValue.trim()) return true
    const q = searchValue.toLowerCase()
    return company.name.toLowerCase().includes(q)
  })

  // Helper functions to get site data
  const getSiteName = (siteId: string) => {
    const siteNames: { [key: string]: string } = {
      // BHP Sites
      'bma-australia': 'BMA Australia',
      'bma-blackwater-australia': 'BMA Blackwater Australia',
      'western-australian-iron-ore': 'Western Australian Iron Ore',
      'western-australia-iron-ore-jimblebar': 'Western Australia Iron Ore',
      'western-australia-iron-ore-south-flank': 'Western Australia Iron Ore',
      'mt-arthur-coal': 'Mt Arthur Coal',
      'olympic-dam': 'Olympic Dam',
      'nickel-west': 'Nickel West',
      // FMG Sites
      'port-hedland': 'Port Hedland',
      'christmas-creek': 'Christmas Creek',
      'cloudbreak': 'Cloudbreak',
      'eliwana': 'Eliwana',
      'iron-bridge': 'Iron Bridge',
      'solomon': 'Solomon',
    }
    return siteNames[siteId] || 'Unknown Site'
  }

  const getSiteLocation = (siteId: string) => {
    const siteLocations: { [key: string]: string } = {
      // BHP Sites
      'bma-australia': 'Bowen Basin, QLD',
      'bma-blackwater-australia': 'Bowen Basin, QLD',
      'western-australian-iron-ore': 'Newman, WA',
      'western-australia-iron-ore-jimblebar': 'Jimblebar, WA',
      'western-australia-iron-ore-south-flank': 'South Flank, WA',
      'mt-arthur-coal': 'Hunter Valley, NSW',
      'olympic-dam': 'South Australia',
      'nickel-west': 'Mount Keith, WA',
      // FMG Sites
      'port-hedland': 'Pilbara, WA',
      'christmas-creek': 'Pilbara, WA',
      'cloudbreak': 'Pilbara, WA',
      'eliwana': 'Pilbara, WA',
      'iron-bridge': 'Pilbara, WA',
      'solomon': 'Pilbara, WA',
    }
    return siteLocations[siteId] || 'Unknown Location'
  }

  const getSiteImage = (siteId: string) => {
    const siteImages: { [key: string]: string } = {
      // BHP Sites
      'bma-australia': BMAaustralia,
      'bma-blackwater-australia': BMAblackwateraustralia,
      'western-australian-iron-ore': newman,
      'western-australia-iron-ore-jimblebar': jimblebar,
      'western-australia-iron-ore-south-flank': southflank,
      'mt-arthur-coal': huntervalley,
      'olympic-dam': olympicdam,
      'nickel-west': nickelwest,
      // FMG Sites
      'port-hedland': fmgPortHedland,
      'christmas-creek': fmgChristmasCreek,
      'cloudbreak': fmgCloudbreak,
      'eliwana': fmgEliwana,
      'iron-bridge': fmgIronBridge,
      'solomon': fmgSolomon,
    }
    return siteImages[siteId] || BMAaustralia
  }

  // If form filling is active, show the appropriate form
  if (selectedCompany && selectedForm && mineFlowStep === 'form-filling') {
    // Handle different forms based on company and form selection
    if (selectedCompany === 'fmg' && selectedForm === 'take-control') {
      if (formStep === 1) {
        return (
          <TakeControlFormPage
            selectedSite={selectedSite}
            onBack={handleBackToFormSelection}
            onNext={handleFormNext}
          />
        )
      } else if (formStep === 2) {
        return (
          <MyExposuresFormPage
            selectedSite={selectedSite}
            onBack={() => setFormStep(1)}
            onNext={handleFormNext}
          />
        )
      } else if (formStep === 3) {
        return (
          <div className="h-screen flex flex-col bg-[#f8f7f2] items-center justify-center">
            <p className="text-lg">Step 3 - Ready for new FMG Take Control implementation</p>
            <button onClick={() => setFormStep(prev => prev - 1)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Back to Step 2
            </button>
          </div>
        )
      }
      // Add more steps here as needed
      return (
        <div className="h-screen flex flex-col bg-[#f8f7f2] items-center justify-center">
          <p className="text-lg">Step {formStep} of Take Control form</p>
          <button onClick={() => setFormStep(prev => prev - 1)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Back
          </button>
        </div>
      )
    }
    
    // Add more form conditions here for other forms
    // For now, just show a placeholder
    return (
      <div className="h-screen flex flex-col bg-[#f8f7f2] items-center justify-center">
        <p className="text-lg">Form: {selectedForm} for {selectedCompany}</p>
        <button onClick={handleBackToFormSelection} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Back to Form Selection
        </button>
      </div>
    )
  }

  // If form selection is active, show the form selection page
  if (selectedCompany && (selectedCompany === 'bhp' || selectedCompany === 'fmg') && mineFlowStep === 'form' && selectedSite) {
    return (
      <FormSelectionPage 
        company={selectedCompany as 'bhp' | 'fmg'}
        selectedSite={selectedSite}
        onClose={handleCloseFormSelection}
        onEditSite={handleEditSite}
        onFormSelect={handleFormSelect}
      />
    )
  }

  // If site selection is active, show the site selection page
  if (selectedCompany && (selectedCompany === 'bhp' || selectedCompany === 'fmg') && mineFlowStep === 'site') {
    return (
      <SiteSelectionPage 
        company={selectedCompany as 'bhp' | 'fmg'}
        onBack={handleBackToCompanySelection}
        onSiteSelect={handleSiteSelect}
      />
    )
  }

  // Leaderboard Profile Creation
  if (leaderboardFlow === 'profile') {
    return (
      <LeaderboardProfilePage
        onBack={handleLeaderboardBack}
        onComplete={handleLeaderboardProfileComplete}
      />
    )
  }

  // Main Leaderboard
  if (leaderboardFlow === 'main' && userProfile) {
    return (
      <>
        <LeaderboardPage
          onBack={handleLeaderboardBack}
          currentUser={userProfile}
          onStreakClick={handleStreakClick}
        />
        {/* Streak Detail Modal */}
        {showStreakDetail && (
          <StreakDetailPage onClose={handleStreakClose} />
        )}

        {/* Filter Slide Up Modal */}
        <FilterSlideUp
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={handleFilterApply}
          onReset={handleFilterReset}
        />
      </>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden touch-pan-y">
      {/* Streak Detail Modal */}
      {showStreakDetail && (
        <StreakDetailPage onClose={handleStreakClose} />
      )}
      {/* Header */}
      {activeBottomTab === 'jobs' ? (
        <div className="bg-white px-4 h-[72px] relative flex items-center justify-center flex-shrink-0">
          <h1 className="text-[#000000] text-base font-semibold leading-6">Jobs</h1>
          <button
            onClick={() => onNavigate?.('jobs-select-company')}
            className="absolute right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Create job"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[#2a6c7e]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="bg-white px-4 h-[72px] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SafeMate" className="h-8" />
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleTrophyClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img src={trophyIcon} alt="Trophy" className="w-6 h-6" />
            </button>
            <button
              onClick={handleNotificationClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img src={notificationIcon} alt="Notifications" className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 px-4 py-5 space-y-6 overflow-y-auto overscroll-contain touch-pan-y">
        {activeBottomTab === 'forms' && (
          <>
            {/* Forms header: Search and Tabs */}
            <div className="space-y-5">
              <SearchInput
                value={searchValue}
                onChange={setSearchValue}
                onFilterClick={handleFilterClick}
              />
              
              <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>

            {/* Forms content based on active tab */}
            {activeTab === 'templates' ? (
              /* Company Selection and General Forms */
              <div className="space-y-6">
                {/* Company Forms Section */}
                <div className="space-y-2">
                  <h2 className="text-[#475467] text-base font-semibold leading-6">
                    Select your company
                  </h2>
                  
                  <div className="space-y-2">
                    {filteredCompanies.length > 0 ? (
                      filteredCompanies.map((company) => (
                        <CompanyCard
                          key={company.id}
                          name={company.name}
                          logo={company.logo}
                          status={company.status}
                          role={company.role}
                          onClick={() => handleCompanySelect(company.id)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-[#667085] text-sm">No companies found matching your search.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center">
                  <div className="flex-1 border-t border-[#eaecf0]"></div>
                  <div className="px-4">
                    <span className="text-[#667085] text-sm font-medium">or</span>
                  </div>
                  <div className="flex-1 border-t border-[#eaecf0]"></div>
                </div>

                {/* General Forms Section */}
                <div className="space-y-2">
                  <h2 className="text-[#475467] text-base font-semibold leading-6">
                    General Forms
                  </h2>
                  
                  <div className="space-y-2">
                    {safemateGeneralForms.map((form) => (
                      <CompanyCard
                        key={form.id}
                        name={form.name}
                        logo={form.logo}
                        status={form.status}
                        role={form.role}
                        onClick={() => handleCompanySelect(form.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* History Tab Content */
              filteredForms.length > 0 ? (
                <HistoryFormsState 
                  forms={filteredForms} 
                  onFormClick={handleFormClick}
                />
              ) : (
                <HistoryEmptyState onResetFilter={handleResetFilter} />
              )
            )}
          </>
        )}

        {activeBottomTab === 'jobs' && (
          <>
            {/* Jobs: Search and Tabs (All/Completed) */}
            <div className="space-y-5">
              <SearchInput
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search jobs"
              />
              <TabNavigation
                tabs={[{ id: 'active', label: 'Active' }, { id: 'completed', label: 'Completed' }]}
                activeTab={jobsActiveTab}
                onTabChange={(tabId) => setJobsActiveTab(tabId as 'active' | 'completed')}
              />
            </div>

            {/* Jobs List or Empty State */}
            {(() => {
              const displayedJobs = sampleJobs.filter(job => (jobsActiveTab === 'completed' ? job.completed : !job.completed))
              if (displayedJobs.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center px-10 py-8">
                    <div className="flex flex-col gap-6 items-center justify-center w-full">
                      <div className="w-20 h-20 overflow-hidden">
                        <img src={noJobsIcon} alt="No jobs" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col gap-6 items-center justify-center w-full">
                        <div className="flex flex-col gap-3 items-start justify-start text-center w-full">
                          <h2 className="font-semibold text-[#182230] text-xl leading-[30px] w-full">{jobsActiveTab === 'completed' ? 'No completed jobs' : 'No active jobs'}</h2>
                          <p className="font-normal text-[#667085] text-base leading-6 w-full">
                            {jobsActiveTab === 'completed'
                              ? 'Completed jobs will appear here once you finish a job.'
                              : 'Get started by creating your first job. Organize your team, set locations, and track progress all in one place.'}
                          </p>
                        </div>
                        <div className="flex flex-col gap-4 items-center justify-start w-full">
                          <Button variant="primary" size="md" className="w-full" onClick={() => onNavigate?.('jobs-select-company')}>
                            Create Your First Job
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              return (
                <div className="space-y-4">
                  {displayedJobs.map((job) => (
                    <div 
                      key={job.id} 
                      className={`bg-white rounded-xl border border-[#d0d5dd] p-3 ${job.completed ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
                      onClick={job.completed ? () => onNavigate?.('jobs-completed-review') : undefined}
                    >
                    {/* Header: Status pill + Edit (only for active jobs) */}
                    <div className="flex items-start justify-between pr-1">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-[3px] rounded-full ${
                        job.completed 
                          ? 'bg-[#dcfae6]' 
                          : 'bg-[#eff8ff]'
                      }`}>
                        <span className={`text-xs font-medium ${
                          job.completed 
                            ? 'text-[#17b26a]' 
                            : 'text-[#0ba5ec]'
                        }`}>{job.status}</span>
                      </div>
                      {!job.completed && (
                        <button className="text-[#558998] text-sm font-semibold">Edit</button>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-1.5 text-[18px] leading-[28px] font-semibold text-[#344054]">{job.title}</h3>

                    {/* Info rows */}
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-1">
                        <img src={workOrderNumberIcon} alt="WO" className="w-5 h-5" />
                        <span className="text-[#344054] text-sm font-medium">Job Number:</span>
                        <span className="text-[#667085] text-sm ml-1">{job.workOrderNumber}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={jobDescriptionIcon} alt="Desc" className="w-5 h-5" />
                        <span className="text-[#344054] text-sm font-medium">Job Description:</span>
                        <span className="text-[#667085] text-sm ml-1">{job.description}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={siteIcon} alt="Site" className="w-5 h-5" />
                        <span className="text-[#344054] text-sm font-medium">Site:</span>
                        <span className="text-[#667085] text-sm ml-1">{job.site}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={teamMatesIcon} alt="Team mates" className="w-5 h-5" />
                        <span className="text-[#344054] text-sm font-medium">Team mates:</span>
                        {job.teamMembers.length > 0 ? (
                          <div className="ml-2 flex items-center">
                            <div className="flex -space-x-1">
                              {job.teamMembers.slice(0, 5).map((src, idx) => (
                                <img key={idx} src={src} alt="member" className="w-6 h-6 rounded-full border border-white" />
                              ))}
                              {job.teamMembers.length > 5 && (
                                <div className="w-6 h-6 rounded-full bg-neutral-100 border border-[#e9eaeb] flex items-center justify-center text-[#717680] text-xs font-semibold">+{job.teamMembers.length - 5}</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[#667085] text-sm ml-1">None</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={notesIcon} alt="Notes & Photos" className="w-5 h-5" />
                        <span className="text-[#344054] text-sm font-medium">Notes & Photos:</span>
                        <span className="text-[#667085] text-sm ml-1">{job.notesPhotosCount}</span>
                      </div>
                    </div>

                    {/* Quick chat input */}
                    <div className="mt-4">
                      <button 
                        onClick={() => onNavigate?.('job-team-chat')}
                        className="w-full bg-gray-50 border border-[#d0d5dd] rounded-xl px-3 py-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex items-center gap-2 hover:bg-gray-100 transition-colors"
                      >
                        <img src={chatIcon} alt="Chat" className="w-5 h-5" />
                        <span className="text-[#667085] text-sm">Quick discuss with your team</span>
                      </button>
                    </div>

                    {/* CTA */}
                    <div className="mt-4">
                      <Button 
                        variant="light-teal" 
                        size="md" 
                        className="w-full"
                      >
                        {job.completed ? 'Reactivate' : 'Mark as Complete'}
                      </Button>
                    </div>
                  </div>
                  ))}
                </div>
              )
            })()}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeBottomTab}
        onTabChange={handleBottomTabChange}
        className="flex-shrink-0"
      />
 
       {/* Filter Slide Up Modal */}
       <FilterSlideUp
         isOpen={showFilterModal}
         onClose={() => setShowFilterModal(false)}
         onApply={handleFilterApply}
         onReset={handleFilterReset}
       />
    </div>
  )
}

export default HomePage