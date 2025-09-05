import React, { useState } from 'react';
import HeaderWithBack from '../../../components/layout/HeaderWithBack';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import TextareaInput from '../../../components/ui/TextareaInput';

interface ReportHazardStep3Data {
  hazardType: string;
  hazardCategory: string;
  severity: string;
  urgency: string;
  additionalDetails: string;
}

interface ReportHazardStep3PageProps {
  selectedSite: any;
  onBack: () => void;
  onNext: (data: ReportHazardStep3Data) => void;
}

export default function ReportHazardStep3Page({ 
  selectedSite, 
  onBack, 
  onNext 
}: ReportHazardStep3PageProps) {
  const [formData, setFormData] = useState<ReportHazardStep3Data>({
    hazardType: '',
    hazardCategory: '',
    severity: '',
    urgency: '',
    additionalDetails: ''
  });

  const hazardTypes = [
    'Physical Hazard',
    'Chemical Hazard',
    'Biological Hazard',
    'Ergonomic Hazard',
    'Environmental Hazard',
    'Electrical Hazard',
    'Mechanical Hazard',
    'Other'
  ];

  const hazardCategories = [
    'Slip, Trip, and Fall',
    'Fire and Explosion',
    'Chemical Exposure',
    'Equipment Failure',
    'Structural Issue',
    'Weather Related',
    'Vehicle/Transport',
    'Other'
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', description: 'Minor injury or damage' },
    { value: 'medium', label: 'Medium', description: 'Moderate injury or damage' },
    { value: 'high', label: 'High', description: 'Serious injury or significant damage' },
    { value: 'critical', label: 'Critical', description: 'Life-threatening or major damage' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low', description: 'Can be addressed during normal operations' },
    { value: 'medium', label: 'Medium', description: 'Should be addressed within 24 hours' },
    { value: 'high', label: 'High', description: 'Requires immediate attention' },
    { value: 'urgent', label: 'Urgent', description: 'Emergency response required' }
  ];

  const handleInputChange = (field: keyof ReportHazardStep3Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (isFormValid) {
      onNext(formData);
    }
  };

  const isFormValid = formData.hazardType && formData.hazardCategory && formData.severity && formData.urgency;

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack 
        title="Report a Hazard" 
        progress="3/3"
        onBack={onBack}
        className="flex-shrink-0"
      />
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
        {/* Step Title */}
        <div className="text-center space-y-2">
          <h1 className="font-bold text-[#266273] text-xl leading-7">
            Hazard Classification
          </h1>
          <p className="text-[#667085] text-base font-normal leading-6">
            Classify and categorize the hazard for proper assessment
          </p>
        </div>

        {/* Hazard Type */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#344054] text-base leading-6">
            Hazard Type
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {hazardTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleInputChange('hazardType', type)}
                className={`p-3 rounded-xl border text-center font-medium text-sm leading-5 transition-all ${
                  formData.hazardType === type
                    ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                    : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Hazard Category */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#344054] text-base leading-6">
            Hazard Category
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {hazardCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleInputChange('hazardCategory', category)}
                className={`p-3 rounded-xl border text-center font-medium text-sm leading-5 transition-all ${
                  formData.hazardCategory === category
                    ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                    : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Severity Level */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#344054] text-base leading-6">
            Severity Level
          </h3>
          <div className="space-y-2">
            {severityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => handleInputChange('severity', level.value)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  formData.severity === level.value
                    ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                    : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-base leading-6">{level.label}</p>
                    <p className="text-[#667085] text-sm leading-5">{level.description}</p>
                  </div>
                  {formData.severity === level.value && (
                    <div className="w-6 h-6 bg-[#2a6c7e] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Urgency Level */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#344054] text-base leading-6">
            Urgency Level
          </h3>
          <div className="space-y-2">
            {urgencyLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => handleInputChange('urgency', level.value)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  formData.urgency === level.value
                    ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                    : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-base leading-6">{level.label}</p>
                    <p className="text-[#667085] text-sm leading-5">{level.description}</p>
                  </div>
                  {formData.urgency === level.value && (
                    <div className="w-6 h-6 bg-[#2a6c7e] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#344054] text-base leading-6">
            Additional Details
          </h3>
          <TextareaInput
            value={formData.additionalDetails}
            onChange={(value) => handleInputChange('additionalDetails', value)}
            placeholder="Provide any additional information about the hazard classification, potential impacts, or specific concerns..."
            rows={4}
            className="w-full"
          />
          <p className="text-[#667085] text-sm leading-5">
            Optional: Add any additional context that might help with hazard assessment
          </p>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="px-5 py-4 flex-shrink-0">
        <div className="flex gap-4 w-full">
          <Button
            onClick={onBack}
            variant="light-teal"
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className="flex-1"
          >
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  );
} 