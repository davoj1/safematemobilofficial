import React, { useState } from 'react'
import { ArrowLeft, ChevronDown, Trophy } from 'lucide-react'
import CompanySelectionModal from './CompanySelectionModal'
import avataricon from '../../assets/leaderboard/avataricon.png'
import warikalicon from '../../assets/leaderboard/warikalicon.png'
import linkforcelogo from '../../assets/leaderboard/linkforcelogo.png'
import monologo from '../../assets/leaderboard/monologo.png'
import firstbadge from '../../assets/leaderboard/firstbadge.png'
import secondbadge from '../../assets/leaderboard/secondbadge.png'
import thirdbadge from '../../assets/leaderboard/thirdbadge.png'
import Streakicon from '../../assets/leaderboard/Streakicon.svg'

interface LeaderboardUser {
  id: string
  name: string
  points: number
  formsSubmitted: number
  rank: number
  company: string
  isCurrentUser?: boolean
}

interface LeaderboardPageProps {
  onBack: () => void
  currentUser: {
    nickname: string
    showRealName: boolean
    profilePicture?: File
  }
  onStreakClick?: () => void
  isLoading?: boolean
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
  onBack,
  currentUser,
  onStreakClick,
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'company'>('all')
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<string>('all')

  // Mock data for leaderboard list
  const allLeaderboardUsers: LeaderboardUser[] = [
    {
      id: '4',
      name: 'dilberharmful',
      points: 168,
      formsSubmitted: 84,
      rank: 4,
      company: 'warrikal'
    },
    {
      id: '5',
      name: 'brandie',
      points: 144,
      formsSubmitted: 72,
      rank: 5,
      company: 'linkforce'
    },
    {
      id: '6',
      name: 'gchalmers',
      points: 140,
      formsSubmitted: 70,
      rank: 6,
      company: 'monadelphous'
    },
    {
      id: '7',
      name: 'kbrockman',
      points: 126,
      formsSubmitted: 63,
      rank: 7,
      company: 'warrikal'
    },
    {
      id: '8',
      name: 'saniahossain',
      points: 122,
      formsSubmitted: 61,
      rank: 8,
      company: 'linkforce'
    },
    {
      id: '9',
      name: 'maxbergmann',
      points: 114,
      formsSubmitted: 57,
      rank: 9,
      company: 'monadelphous'
    },
    {
      id: '10',
      name: 'winter.hurst',
      points: 110,
      formsSubmitted: 55,
      rank: 10,
      company: 'warrikal'
    },
    {
      id: '11',
      name: 'omargomez',
      points: 106,
      formsSubmitted: 53,
      rank: 11,
      company: 'linkforce'
    },
    {
      id: '12',
      name: 'gracerao',
      points: 102,
      formsSubmitted: 51,
      rank: 12,
      company: 'monadelphous'
    },
    {
      id: '13',
      name: 'paukgraves',
      points: 98,
      formsSubmitted: 49,
      rank: 13,
      company: 'warrikal'
    },
    {
      id: '14',
      name: 'mattie.young',
      points: 94,
      formsSubmitted: 47,
      rank: 14,
      company: 'linkforce'
    },
    {
      id: '15',
      name: 'sarah.wilson',
      points: 90,
      formsSubmitted: 45,
      rank: 15,
      company: 'monadelphous'
    },
    {
      id: '16',
      name: 'mike.chen',
      points: 86,
      formsSubmitted: 43,
      rank: 16,
      company: 'warrikal'
    },
    {
      id: '17',
      name: 'lisa.thompson',
      points: 82,
      formsSubmitted: 41,
      rank: 17,
      company: 'linkforce'
    },
    {
      id: '18',
      name: 'james.brown',
      points: 78,
      formsSubmitted: 39,
      rank: 18,
      company: 'monadelphous'
    },
    {
      id: '19',
      name: 'emma.davis',
      points: 74,
      formsSubmitted: 37,
      rank: 19,
      company: 'warrikal'
    },
    {
      id: '20',
      name: 'alex.taylor',
      points: 70,
      formsSubmitted: 35,
      rank: 20,
      company: 'linkforce'
    },
    {
      id: '21',
      name: 'sophie.martin',
      points: 66,
      formsSubmitted: 33,
      rank: 21,
      company: 'monadelphous'
    },
    {
      id: '22',
      name: 'daniel.lee',
      points: 62,
      formsSubmitted: 31,
      rank: 22,
      company: 'warrikal'
    },
    {
      id: '23',
      name: 'olivia.white',
      points: 58,
      formsSubmitted: 29,
      rank: 23,
      company: 'linkforce'
    },
    {
      id: '24',
      name: 'davidstrike (You)',
      points: 98,
      formsSubmitted: 49,
      rank: 24,
      company: 'warrikal',
      isCurrentUser: true
    }
  ]

  const getCompanyIcon = (company: string) => {
    switch (company) {
      case 'warrikal':
        return warikalicon
      case 'linkforce':
        return linkforcelogo
      case 'monadelphous':
        return monologo
      default:
        return 'https://via.placeholder.com/20x20/666666/FFFFFF?text=C'
    }
  }

  const handleCompanyTabClick = () => {
    setActiveTab('company')
    setShowCompanyModal(true)
  }

  const getSelectedCompanyName = () => {
    if (selectedCompany === 'all') return 'Company'
    const company = companies.find(c => c.id === selectedCompany)
    return company?.name || 'Company'
  }

  const companies = [
    { id: 'warrikal', name: 'Warrikal', logo: warikalicon },
    { id: 'linkforce', name: 'Linkforce', logo: linkforcelogo },
    { id: 'monadelphous', name: 'Monadelphous', logo: monologo }
  ]

  const handleCompanySelect = (company: { id: string; name: string; logo: string; role: string }) => {
    setSelectedCompany(company.id)
    if (company.id === 'all') {
      setActiveTab('all')
    }
    setShowCompanyModal(false)
  }

  const handleCompanyModalClose = () => {
    setShowCompanyModal(false)
  }

  // Filter users based on selected company
  const leaderboardUsers = selectedCompany === 'all' 
    ? allLeaderboardUsers 
    : allLeaderboardUsers.filter(user => user.company === selectedCompany)

  return (
    <div className="h-screen flex flex-col bg-[#266273] overflow-hidden">
      {/* Background Spiral Effect */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{ 
          backgroundImage: `url('/src/assets/leaderboard/spiralbackgroundeffect.png')`,
          backgroundSize: '80% auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3">
        <button
          onClick={onBack}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <h1 className="text-white font-bold text-lg">Board of Legends</h1>
        
        <button 
          onClick={onStreakClick}
          className="flex items-center gap-1 hover:bg-white/10 rounded-lg p-1 transition-colors"
        >
          <img src={Streakicon} alt="Streak" className="w-6 h-6" />
          <span className="text-white font-semibold text-lg">{isLoading ? '0' : '3'}</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="relative z-10 px-4 pb-6">
        <div className="flex bg-white/10 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-[#266273]'
                : 'text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={handleCompanyTabClick}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'company'
                ? 'bg-white text-[#266273]'
                : 'text-white'
            }`}
          >
            {selectedCompany !== 'all' && (
              <img src={warikalicon} alt="Company" className="w-4 h-4" />
            )}
            {getSelectedCompanyName()}
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Podium Section */}
      {!isLoading && (
        <div className="relative z-10 px-4 pb-6">
        <div className="flex justify-center gap-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center mt-4">
            <div className="relative">
              <img 
                src={avataricon} 
                alt="Profile" 
                className="w-18 h-18 rounded-full border-2 border-[#EBFE5C] shadow-lg"
              />
              <img 
                src={getCompanyIcon('linkforce')} 
                alt="Company" 
                className="absolute -top-1 -right-1 w-6 h-6 rounded-lg border border-white"
              />
              <img 
                src={secondbadge} 
                alt="2nd Place" 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-auto h-10" 
              />
            </div>
            <div className="text-center mt-7">
              <p className="text-white font-semibold text-sm">Poseido</p>
              <p className="text-[#EBFE5C] font-bold text-xl">234</p>
              <p className="text-white/80 text-xs">117 Forms</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-2">
            <div className="relative">
              {/* Yellow glow behind 1st place */}
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#EBFE5C]/20 blur-xl"></div>
              {/* Neon shadow effect */}
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#EBFE5C] blur-md opacity-30"></div>
              <img 
                src={avataricon} 
                alt="Profile" 
                className="relative w-20 h-20 rounded-full border-2 border-[#EBFE5C] shadow-lg"
              />
              <img 
                src={getCompanyIcon('warrikal')} 
                alt="Company" 
                className="absolute -top-1 -right-1 w-6 h-6 rounded-lg border border-white"
              />
              <img 
                src={firstbadge} 
                alt="1st Place" 
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-auto h-14" 
              />
            </div>
            <div className="text-center mt-8">
              <p className="text-white font-semibold text-sm">Zeus</p>
              <p className="text-[#EBFE5C] font-bold text-2xl">242</p>
              <p className="text-white/80 text-xs">121 Forms</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center mt-6">
            <div className="relative">
              <img 
                src={avataricon} 
                alt="Profile" 
                className="w-16 h-16 rounded-full border-2 border-[#EBFE5C] shadow-lg"
              />
              <img 
                src={getCompanyIcon('monadelphous')} 
                alt="Company" 
                className="absolute -top-1 -right-1 w-6 h-6 rounded-lg border border-white"
              />
              <img 
                src={thirdbadge} 
                alt="3rd Place" 
                className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-auto h-8" 
              />
            </div>
            <div className="text-center mt-7">
              <p className="text-white font-semibold text-sm">Atropos</p>
              <p className="text-[#EBFE5C] font-bold text-xl">192</p>
              <p className="text-white/80 text-xs">96 Forms</p>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Notification Banner - positioned above the leaderboard */}
      {!isLoading && (
        <div className="relative z-10 px-4 pb-0">
        <div className="flex justify-center">
                      <div className="bg-[#EBFE5C] rounded-t-2xl px-4 py-2 flex items-center justify-center gap-2 w-4/5">
            <span className="text-[#266273] text-xl">🏆</span>
            <span className="text-[#266273] font-semibold text-sm text-center">
              Warrikal is leading in form submissions!
            </span>
          </div>
        </div>
      </div>
      )}

      {/* Leaderboard List */}
      <div className="relative z-10 flex-1 px-4 pb-4 min-h-0">
        <div className="relative h-full">
          {/* Leaderboard Card */}
          <div className="bg-white rounded-3xl border-2 border-[#EBFE5C] shadow-lg overflow-hidden relative h-full">
            {/* Scrollable Leaderboard List */}
            <div className="px-4 py-2 pb-24 space-y-2 overflow-y-auto h-full">
              {isLoading ? (
                // Skeleton loading cards
                Array.from({ length: 10 }, (_, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border-b border-gray-200">
                    {/* Rank skeleton */}
                    <div className="bg-[#eaf0f2] h-3 rounded-xl w-5" />
                    
                    {/* Avatar skeleton */}
                    <div className="bg-[#f2f4f7] rounded-full w-10 h-10" />
                    
                    {/* Text skeleton */}
                    <div className="flex-1">
                      <div className="bg-[#eaf0f2] h-4 rounded-xl w-full mb-1" />
                      <div className="bg-[#eaf0f2] h-3 rounded-xl w-[70px]" />
                    </div>
                    
                    {/* Points skeleton */}
                    <div className="bg-[#eaf0f2] h-4 rounded-xl w-[60px]" />
                  </div>
                ))
              ) : (
                leaderboardUsers.filter(user => !user.isCurrentUser).map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 ${
                    index < leaderboardUsers.filter(user => !user.isCurrentUser).length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  {/* Rank */}
                  <div className="text-[#266273] font-bold text-lg min-w-[30px]">
                    {user.rank}
                  </div>

                  {/* Company Icon */}
                  <img 
                    src={getCompanyIcon(user.company)} 
                    alt="Company" 
                    className="w-5 h-5 rounded-full"
                  />

                  {/* Profile Picture */}
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {user.formsSubmitted} Forms submitted
                    </p>
                  </div>

                  {/* Points */}
                  <div className="text-[#266273] font-semibold text-sm">
                    {user.points} Pts
                  </div>
                </div>
              ))
            )}
            </div>

            {/* Fixed Current User at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 bg-white rounded-b-3xl">
              {leaderboardUsers.filter(user => user.isCurrentUser).map((user) => (
                <div
                  key={user.id}
                  className="bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 p-3"
                >
                  {/* Rank */}
                  <div className="text-[#266273] font-bold text-lg min-w-[30px]">
                    {user.rank}
                  </div>

                  {/* Company Icon */}
                  <img 
                    src={getCompanyIcon(user.company)} 
                    alt="Company" 
                    className="w-5 h-5 rounded-full"
                  />

                  {/* Profile Picture */}
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <p className="font-medium text-sm text-green-700">
                      {user.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {user.formsSubmitted} Forms submitted
                    </p>
                  </div>

                  {/* Points */}
                  <div className="text-[#266273] font-semibold text-sm">
                    {user.points} Pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Company Selection Modal */}
      {showCompanyModal && (
        <CompanySelectionModal
          onClose={handleCompanyModalClose}
          onCompanySelect={handleCompanySelect}
          selectedCompany={selectedCompany}
        />
      )}
    </div>
  )
}

export default LeaderboardPage 