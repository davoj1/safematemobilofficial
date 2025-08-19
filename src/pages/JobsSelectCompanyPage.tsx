import React, { useState } from 'react'
import { MobileLayout, HeaderWithBack } from '../components/layout'
import { Button } from '../components/ui'
import warrikalIcon from '../assets/companylogo/warrikallogo.svg'
import linkforceIcon from '../assets/companylogo/linkforcelogo.svg'
import monaIcon from '../assets/companylogo/monalogo.svg'

interface JobsSelectCompanyPageProps {
  onNavigate?: (view: string) => void
  onNavigateToHome?: (activeTab: 'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home') => void
  onCompanySelect?: (company: Company) => void
}

interface Company {
  id: string
  name: string
  logo: string
  role: string
  status: 'active' | 'pending'
}

const JobsSelectCompanyPage: React.FC<JobsSelectCompanyPageProps> = ({ 
  onNavigate,
  onNavigateToHome,
  onCompanySelect 
}) => {
  const companies: Company[] = [
    {
      id: 'warrikal',
      name: 'Warrikal',
      logo: warrikalIcon,
      role: 'Supervisor',
      status: 'active'
    },
    {
      id: 'linkforce',
      name: 'Linkforce',
      logo: linkforceIcon,
      role: 'HSE',
      status: 'active'
    },
    {
      id: 'monadelphous',
      name: 'Monadelphous',
      logo: monaIcon,
      role: 'Admin',
      status: 'pending'
    }
  ]

  const handleCompanySelect = (company: Company) => {
    if (company.status === 'active') {
      onCompanySelect?.(company)
      onNavigate?.('jobs-create-job')
    }
  }

  const handleBack = () => {
    // Go back to the jobs tab (for job creation flow)
    onNavigateToHome?.('jobs')
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
        {/* Header */}
        <HeaderWithBack 
          title="Select your company"
          onBack={handleBack}
        />

        {/* Main Content */}
        <div className="flex-1 px-5 py-5 space-y-5 overflow-y-auto overscroll-contain touch-pan-y">
          {/* Title and Description */}
          <div className="flex flex-col gap-1.5 items-center text-center">
            <h1 className="font-bold text-[#24262d] text-2xl leading-[32px]">
              Select your company
            </h1>
            <p className="font-normal text-[#667085] text-sm leading-5 max-w-[350px]">
              Your access depends on your role in that company.
            </p>
          </div>

          {/* Company List */}
          <div className="flex flex-col gap-1.5">
            {companies.map((company) => (
              <div key={company.id}>
                <button
                  onClick={() => handleCompanySelect(company)}
                  disabled={company.status === 'pending'}
                  className={`w-full bg-white rounded-[20px] border border-[#eaecf0] p-4 flex items-center gap-3 transition-all duration-200 ${
                    company.status === 'pending' 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:border-[#266273] hover:shadow-sm'
                  }`}
                >
                  {/* Company Logo */}
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 flex flex-col items-start justify-center text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-[#101828] text-base leading-6">
                        {company.name}
                      </span>
                      {company.status === 'pending' && (
                        <div className="bg-[#f2f4f7] border border-[#eaf0f2] rounded-full px-2 py-[3px]">
                          <span className="font-medium text-[#667085] text-xs leading-[18px]">
                            Pending
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="font-normal text-[#667085] text-sm leading-5">
                      {company.role}
                    </span>
                  </div>

                  {/* Arrow Icon */}
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="text-[#709da9]"
                    >
                      <path 
                        d="M9 18L15 12L9 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default JobsSelectCompanyPage 