import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import warrikalLogo from '../../assets/companylogo/warrikallogo.svg';
import linkforceLogo from '../../assets/companylogo/linkforcelogo.svg';
import monaLogo from '../../assets/companylogo/monalogo.svg';

interface Company {
  id: string;
  name: string;
  logo: string;
  role: string;
  isSelected?: boolean;
  status?: 'active' | 'pending';
}

interface CompanySwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompanySelect: (company: Company) => void;
  selectedCompany?: string;
}

export default function CompanySwitchModal({ 
  isOpen, 
  onClose, 
  onCompanySelect,
  selectedCompany 
}: CompanySwitchModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const companies: Company[] = [
    {
      id: 'warrikal',
      name: 'Warrikal',
      logo: warrikalLogo,
      role: 'Supervisor',
      isSelected: selectedCompany === 'warrikal',
      status: 'active'
    },
    {
      id: 'linkforce',
      name: 'Linkforce',
      logo: linkforceLogo,
      role: 'Worker',
      isSelected: selectedCompany === 'linkforce',
      status: 'active'
    },
    {
      id: 'monadelphous',
      name: 'Monadelphous',
      logo: monaLogo,
      role: 'Admin',
      isSelected: selectedCompany === 'monadelphous',
      status: 'pending'
    }
  ];

  const handleCompanyClick = (company: Company) => {
    if (company.status === 'pending') {
      return; // Don't allow selection of pending companies
    }
    onCompanySelect(company);
    handleClose();
  };

  if (!isOpen) return null;

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
      <div className={`relative bg-white rounded-t-[20px] w-full h-[85vh] flex flex-col pt-12 pb-6 px-4 transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-gray-300 rounded-full" />

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-[#101828] text-xl font-semibold leading-7 text-center">
            Switch Company
          </h2>
          <p className="text-[#667085] text-sm font-normal leading-5 text-center mt-1">
            Select a company to switch to
          </p>
        </div>

        {/* Company List */}
        <div className="flex-1 space-y-3">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => handleCompanyClick(company)}
              disabled={company.status === 'pending'}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-[20px] border transition-all duration-200",
                company.isSelected
                  ? "bg-[#ebfe5c] border-[#2a6c7e]"
                  : company.status === 'pending'
                  ? "bg-white border-[#eaecf0] opacity-60 cursor-not-allowed"
                  : "bg-white border-[#eaecf0] hover:border-gray-300"
              )}
            >
              {/* Radio Button */}
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                company.isSelected
                  ? "bg-[#266273]"
                  : company.status === 'pending'
                  ? "bg-white border-[1.5px] border-[#d0d5dd] opacity-60"
                  : "bg-white border-[1.5px] border-[#d0d5dd]"
              )}>
                {company.isSelected && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>

              {/* Company Logo */}
              <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Company Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className={cn(
                    "font-medium text-[16px] leading-[24px]",
                    company.isSelected ? "text-[#101828]" : "text-[#101828]"
                  )}>
                    {company.name}
                  </p>
                  {company.status === 'pending' && (
                    <span className="bg-[#fef3c7] text-[#d97706] text-xs font-medium px-2 py-0.5 rounded-full">
                      Pending
                    </span>
                  )}
                </div>
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