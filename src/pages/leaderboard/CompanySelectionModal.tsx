import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import warikalicon from '../../assets/leaderboard/warikalicon.png';
import linkforcelogo from '../../assets/leaderboard/linkforcelogo.png';
import monologo from '../../assets/leaderboard/monologo.png';

interface Company {
  id: string;
  name: string;
  logo: string;
  role: string;
  isSelected?: boolean;
}

interface CompanySelectionModalProps {
  onClose: () => void;
  onCompanySelect: (company: Company) => void;
  selectedCompany?: string;
}

export default function CompanySelectionModal({ 
  onClose, 
  onCompanySelect,
  selectedCompany 
}: CompanySelectionModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const companies: Company[] = [
    {
      id: 'all',
      name: 'All Companies',
      logo: '',
      role: '',
      isSelected: selectedCompany === 'all' || !selectedCompany
    },
    {
      id: 'warrikal',
      name: 'Warrikal',
      logo: warikalicon,
      role: 'Supervisor',
      isSelected: selectedCompany === 'warrikal'
    },
    {
      id: 'linkforce',
      name: 'Linkforce',
      logo: linkforcelogo,
      role: 'Worker',
      isSelected: selectedCompany === 'linkforce'
    },
    {
      id: 'monadelphous',
      name: 'Monadelphous',
      logo: monologo,
      role: 'Admin',
      isSelected: selectedCompany === 'monadelphous'
    }
  ];

  const handleCompanyClick = (company: Company) => {
    onCompanySelect(company);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Dark overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isVisible ? 'bg-black/50' : 'bg-black/0'
        }`}
        onClick={handleClose}
      />

      {/* Bottom sheet */}
      <div className={`relative bg-white rounded-t-[20px] w-full h-[491px] flex flex-col pt-12 pb-6 px-4 transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-gray-300 rounded-full" />

        {/* Company List */}
        <div className="flex-1 space-y-3">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => handleCompanyClick(company)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-[20px] border transition-all duration-200",
                company.isSelected
                  ? "bg-[#ebfe5c] border-[#2a6c7e]"
                  : "bg-white border-[#eaecf0] hover:border-gray-300"
              )}
            >
              {/* Radio Button */}
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                company.isSelected
                  ? "bg-[#266273]"
                  : "bg-white border-[1.5px] border-[#d0d5dd]"
              )}>
                {company.isSelected && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>

              {/* Company Logo */}
              <div className="w-11 h-11 bg-white rounded-[10px] border border-[#eaecf0] flex items-center justify-center flex-shrink-0 p-[5.5px]">
                {company.id === 'all' ? (
                  <span className="text-gray-600 font-bold text-lg">🏆</span>
                ) : (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Company Info */}
              <div className="flex-1 text-left">
                <p className={cn(
                  "font-medium text-[16px] leading-[24px]",
                  company.isSelected ? "text-[#101828]" : "text-[#101828]"
                )}>
                  {company.name}
                </p>
                {company.role && (
                  <p className="text-[#667085] text-[14px] leading-[20px] font-normal">
                    {company.role}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 