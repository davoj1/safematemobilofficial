import React, { useState } from 'react';
import HeaderWithBack from '../../../components/layout/HeaderWithBack';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Radio from '../../../components/ui/Radio';
import SignaturePadModal from '../../../components/ui/SignaturePadModal';
import SelectSupervisorModal from '../../../components/ui/SelectSupervisorModal';
import warrikalLogo from '../../../assets/companylogo/warrikallogo.svg';
import teamMatesIcon from '../../../assets/jobs/teammembersicon.svg';

interface ReportHazardStep4Data {
  selectedCompany: string;
  selectedSupervisor: string;
  firstName: string;
  lastName: string;
  signature: string;
}

interface ReportHazardStep4PageProps {
  selectedSite: any;
  onBack: () => void;
  onNext: (data: ReportHazardStep4Data) => void;
}

export default function ReportHazardStep4Page({ 
  selectedSite, 
  onBack, 
  onNext 
}: ReportHazardStep4PageProps) {
  const [formData, setFormData] = useState<ReportHazardStep4Data>({
    selectedCompany: 'warrikal', // Default to Warrikal like other forms
    selectedSupervisor: '',
    firstName: '',
    lastName: '',
    signature: ''
  });

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);

  // Mock supervisor data - in real app this would come from API
  const supervisors = [
    { id: '1', name: 'John Smith', company: 'Warrikal', role: 'Supervisor', avatar: 'JS' },
    { id: '2', name: 'Sarah Johnson', company: 'Warrikal', role: 'Supervisor', avatar: 'SJ' },
    { id: '3', name: 'Mike Wilson', company: 'Warrikal', role: 'Supervisor', avatar: 'MW' },
    { id: '4', name: 'Lisa Brown', company: 'Warrikal', role: 'Supervisor', avatar: 'LB' },
    { id: '5', name: 'David Lee', company: 'Warrikal', role: 'Supervisor', avatar: 'DL' }
  ];

  const handleSupervisorSelect = (supervisor: any) => {
    setFormData(prev => ({ ...prev, selectedSupervisor: supervisor.id }));
    setShowSupervisorModal(false);
  };

  const handleInputChange = (field: keyof ReportHazardStep4Data, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignatureSave = (signature: string) => {
    setFormData(prev => ({ ...prev, signature }));
    setShowSignatureModal(false);
  };

  const handleNext = () => {
    if (isFormValid) {
      onNext(formData);
    }
  };

  const isFormValid = formData.selectedSupervisor && 
                     formData.firstName.trim() && formData.lastName.trim() && formData.signature;

  const selectedSupervisor = supervisors.find(s => s.id === formData.selectedSupervisor);

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack 
        title="Report a Hazard" 
        progress="4/4"
        onBack={onBack}
        className="flex-shrink-0"
      />
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
        {/* Select Your Company */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between pr-2">
              <h3 className="text-[#344054] text-sm font-medium">Select Your Company</h3>
            </div>
            
            <div className="space-y-2">
              {/* Warrikal - Selected */}
              <div className="bg-[#ebfe5c] border border-[#2a6c7e] rounded-[20px] p-4 flex items-center gap-3">
                <Radio checked={true} onChange={() => {}} />
                
                <div className="flex items-center gap-1">
                  <div className="w-9 h-9 bg-white rounded-md p-1 flex items-center justify-center">
                    <img 
                      src={warrikalLogo} 
                      alt="Warrikal"
                      className="w-full h-6 object-contain"
                    />
                  </div>
                  <span className="text-[#101828] text-sm font-medium">Warrikal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Select Your Supervisor */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between pr-2">
              <h3 className="text-[#344054] text-sm font-medium">Select Your Supervisor</h3>
            </div>
            
            <button
              onClick={() => setShowSupervisorModal(true)}
              className={`w-full p-4 rounded-[20px] border-2 text-left transition-colors ${
                formData.selectedSupervisor
                  ? 'bg-[#ebfe5c] border-[#2a6c7e]'
                  : 'bg-white border-[#eaecf0] hover:border-[#266273]'
              }`}
            >
              {selectedSupervisor ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#266273] rounded-full flex items-center justify-center text-white font-medium">
                    {selectedSupervisor.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-[#101828] text-sm">{selectedSupervisor.name}</p>
                    <p className="text-[#667085] text-xs">{selectedSupervisor.company} • {selectedSupervisor.role}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#eaf0f2] rounded-full flex items-center justify-center">
                    <img src={teamMatesIcon} alt="Add supervisor" className="w-5 h-5" />
                  </div>
                  <span className="text-[#667085] text-sm">Select your supervisor</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Worker Name */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between pr-2">
              <h3 className="text-[#344054] text-sm font-medium">Worker name</h3>
            </div>
            
            <div className="bg-white border border-[#eaecf0] rounded-[20px] p-4 space-y-3">
              {/* First Name */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-[#344054] text-sm font-medium">First name</span>
                  <span className="text-[#d92d20] text-sm font-medium">*</span>
                </div>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className="border-[#d0d5dd]"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-[#344054] text-sm font-medium">Last name</span>
                  <span className="text-[#d92d20] text-sm font-medium">*</span>
                </div>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className="border-[#d0d5dd]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Worker's Signature */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between pr-2">
              <h3 className="text-[#344054] text-sm font-medium">Worker's signature</h3>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowSignatureModal(true)}
                className="w-full h-40 bg-white border-2 border-dashed border-[#d0d5dd] rounded-[20px] flex items-center justify-center hover:border-[#2a6c7e] transition-colors"
              >
                {formData.signature ? (
                  <img 
                    src={formData.signature} 
                    alt="Signature" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <p className="text-[#667085] text-base font-normal leading-6 text-center">
                    Select to sign your signature here
                  </p>
                )}
              </button>
            </div>
          </div>
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
            Complete
          </Button>
        </div>
      </div>

      {/* Signature Modal */}
      <SignaturePadModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSave={handleSignatureSave}
        existingSignature={formData.signature}
      />

      {/* Supervisor Selection Modal */}
      <SelectSupervisorModal
        isOpen={showSupervisorModal}
        onClose={() => setShowSupervisorModal(false)}
        onSupervisorSelect={handleSupervisorSelect}
        allSupervisors={supervisors}
        selectedSupervisor={selectedSupervisor}
      />
    </div>
  );
} 