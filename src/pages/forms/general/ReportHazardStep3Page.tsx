import React, { useState } from 'react';
import HeaderWithBack from '../../../components/layout/HeaderWithBack';
import Button from '../../../components/ui/Button';
import TextareaInput from '../../../components/ui/TextareaInput';
import { cn } from '../../../utils/cn';

interface ReportHazardStep3Data {
  hazardType: string;
  riskSeverity: string;
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
    riskSeverity: '',
    additionalDetails: ''
  });

  // Hardcoded hazard data matching the HazardReportModal
  const hazardTypes = [
    'Slip/Trip Hazard',
    'Electrical Hazard',
    'Chemical Spill',
    'Equipment Malfunction',
    'Structural Damage',
    'Fire Risk',
    'Confined Space Issue',
    'Vehicle Safety',
    'PPE Violation',
    'Environmental Hazard'
  ];

  const severityLevels = [
    { value: 'low', label: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { value: 'medium', label: 'Medium Risk', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { value: 'high', label: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { value: 'critical', label: 'Critical Risk', color: 'text-red-800', bgColor: 'bg-red-100', borderColor: 'border-red-300' }
  ];

  const handleInputChange = (field: keyof ReportHazardStep3Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (isFormValid) {
      onNext(formData);
    }
  };

  const isFormValid = formData.hazardType && formData.riskSeverity;

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

        {/* Hazard Type Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#101828]">Hazard Type *</h3>
          <div className="grid grid-cols-1 gap-2">
            {hazardTypes.map((hazard) => (
              <button
                key={hazard}
                onClick={() => handleInputChange('hazardType', hazard)}
                className={cn(
                  'w-full p-3 rounded-[20px] border text-left transition-colors',
                  formData.hazardType === hazard
                    ? 'bg-[#ebfe5c] border-[#2a6c7e]'
                    : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                )}
              >
                <span className="text-sm font-medium text-[#101828]">{hazard}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Risk Severity Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#101828]">Risk Severity *</h3>
          <div className="grid grid-cols-1 gap-2">
            {severityLevels.map((severity) => (
              <button
                key={severity.value}
                onClick={() => handleInputChange('riskSeverity', severity.value)}
                className={cn(
                  'w-full p-3 rounded-[20px] border text-left transition-colors',
                  formData.riskSeverity === severity.value
                    ? 'bg-[#ebfe5c] border-[#2a6c7e]'
                    : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-3 h-3 rounded-full border-2',
                    formData.riskSeverity === severity.value
                      ? 'bg-[#2a6c7e] border-[#2a6c7e]'
                      : 'border-[#d0d5dd]'
                  )} />
                  <div className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    severity.bgColor,
                    severity.borderColor,
                    severity.color
                  )}>
                    {severity.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[#101828]">Additional Information</h3>
          <TextareaInput
            value={formData.additionalDetails}
            onChange={(value) => handleInputChange('additionalDetails', value)}
            placeholder="Provide any additional information about the hazard..."
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