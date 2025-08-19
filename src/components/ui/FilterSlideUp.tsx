import React, { useState, useEffect } from 'react'
import { Button } from './index'
import { cn } from '../../utils/cn'

interface FilterOption {
  id: string
  label: string
  type: 'checkbox' | 'radio'
}

interface FilterSlideUpProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterState) => void
  onReset: () => void
}

interface FilterState {
  forms: string[]
  dateRange: string
  companies: string[]
}

const FilterSlideUp: React.FC<FilterSlideUpProps> = ({
  isOpen,
  onClose,
  onApply,
  onReset
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    forms: [],
    dateRange: '',
    companies: []
  })

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleApply = () => {
    onApply(filters)
    handleClose()
  }

  const handleReset = () => {
    setFilters({
      forms: [],
      dateRange: '',
      companies: []
    })
    onReset()
  }

  const toggleFormFilter = (formId: string) => {
    setFilters(prev => ({
      ...prev,
      forms: prev.forms.includes(formId)
        ? prev.forms.filter(id => id !== formId)
        : [...prev.forms, formId]
    }))
  }

  const setDateRange = (range: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: range
    }))
  }

  const toggleCompanyFilter = (companyId: string) => {
    setFilters(prev => ({
      ...prev,
      companies: prev.companies.includes(companyId)
        ? prev.companies.filter(id => id !== companyId)
        : [...prev.companies, companyId]
    }))
  }

  const formOptions: FilterOption[] = [
    { id: 'vehicle-prestart', label: 'Vehicle Pre-Start', type: 'checkbox' },
    { id: 'take-control', label: 'Take Control', type: 'checkbox' },
    { id: 'hazard-report', label: 'Hazard Report', type: 'checkbox' }
  ]

  const dateOptions: FilterOption[] = [
    { id: 'last-7-days', label: 'Last 7 days', type: 'radio' },
    { id: 'last-30-days', label: 'Last 30 days', type: 'radio' }
  ]

  const companyOptions: FilterOption[] = [
    { id: 'warrikal', label: 'Warrikal', type: 'checkbox' },
    { id: 'linkforce', label: 'Linkforce', type: 'checkbox' },
    { id: 'monadelphous', label: 'Monadelphous', type: 'checkbox' }
  ]

  const renderCheckbox = (option: FilterOption, isChecked: boolean, onChange: () => void) => (
    <div className="flex items-center gap-3 w-full">
      <div
        className={cn(
          "w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer transition-colors",
          isChecked
            ? "bg-[#266273] border border-[#266273]"
            : "bg-white border-[1.5px] border-[#d0d5dd]"
        )}
        onClick={onChange}
      >
        {isChecked && (
          <div className="w-3 h-3">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full text-[#ebfe5c]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      <span className="font-normal text-[#101828] text-base leading-6">
        {option.label}
      </span>
    </div>
  )

  const renderRadio = (option: FilterOption, isSelected: boolean, onChange: () => void) => (
    <div className="flex items-center gap-3 w-full">
      <div
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors",
          isSelected
            ? "bg-[#266273]"
            : "bg-white border-[1.5px] border-[#d0d5dd]"
        )}
        onClick={onChange}
      >
        {isSelected && (
          <div className="w-3 h-3 rounded-full bg-white" />
        )}
      </div>
      <span className="font-normal text-[#1e2028] text-base leading-6">
        {option.label}
      </span>
    </div>
  )

  if (!isOpen) return null

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
      <div className={`relative bg-white rounded-t-[20px] w-full h-[600px] flex flex-col pt-12 pb-6 px-4 transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#000000] text-xl leading-[30px]">
            Filter by
          </h2>
          <button
            onClick={handleReset}
            className="font-semibold text-[#266273] text-base leading-6"
          >
            Reset
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Forms Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-[#000000] text-base leading-6">
              Forms
            </h3>
            <div className="flex flex-col gap-3">
              {formOptions.map((option) => (
                <div key={option.id}>
                  {renderCheckbox(
                    option,
                    filters.forms.includes(option.id),
                    () => toggleFormFilter(option.id)
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Date Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-[#000000] text-base leading-6">
              Date
            </h3>
            <div className="flex flex-col gap-3">
              {dateOptions.map((option) => (
                <div key={option.id}>
                  {renderRadio(
                    option,
                    filters.dateRange === option.id,
                    () => setDateRange(option.id)
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Company Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-[#000000] text-base leading-6">
              Company
            </h3>
            <div className="flex flex-col gap-3">
              {companyOptions.map((option) => (
                <div key={option.id}>
                  {renderCheckbox(
                    option,
                    filters.companies.includes(option.id),
                    () => toggleCompanyFilter(option.id)
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Button
            variant="primary"
            size="md"
            onClick={handleApply}
            className="w-full"
          >
            Show results
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterSlideUp 