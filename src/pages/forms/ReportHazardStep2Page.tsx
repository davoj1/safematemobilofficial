import React, { useState } from 'react';
import HeaderWithBack from '../../components/layout/HeaderWithBack';
import InteractiveMap from '../../components/ui/InteractiveMap';
import TextareaInput from '../../components/ui/TextareaInput';
import Button from '../../components/ui/Button';

interface ReportHazardStep2PageProps {
  selectedSite: any;
  onBack: () => void;
  onNext: (data: { location: any; description: string }) => void;
}

export default function ReportHazardStep2Page({ 
  selectedSite, 
  onBack, 
  onNext 
}: ReportHazardStep2PageProps) {
  const [location, setLocation] = useState<any>(null);
  const [description, setDescription] = useState('');

  const handleLocationSelect = (selectedLocation: any) => {
    setLocation(selectedLocation);
  };

  const handleNext = () => {
    if (location && description.trim()) {
      onNext({ location, description: description.trim() });
    }
  };

  const isFormValid = location && description.trim();

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack 
        title="Report a Hazard" 
        progress="2/3"
        onBack={onBack}
        className="flex-shrink-0"
      />
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
          {/* Step Title */}
          <div className="text-center space-y-2">
            <h1 className="font-bold text-[#266273] text-xl leading-7">
              Hazard Location
            </h1>
            <p className="text-[#667085] text-base font-normal leading-6">
              Help us locate the hazard by providing location details
            </p>
          </div>

          {/* Interactive Map */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[#344054] text-base leading-6">
              Location
            </h3>
            <InteractiveMap 
              onLocationSelect={handleLocationSelect}
              className="w-full"
            />
          </div>

          {/* Location Description */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#344054] text-base leading-6">
              Location Description
            </h3>
            <TextareaInput
              value={description}
              onChange={setDescription}
              placeholder="Describe the specific location of the hazard (e.g., 'Near the main entrance', 'On the second floor', 'In the equipment room')"
              rows={4}
              className="w-full"
            />
            <p className="text-[#667085] text-sm leading-5">
              Provide additional details to help locate the hazard quickly
            </p>
          </div>

          {/* Selected Location Display */}
          {location && (
            <div className="bg-white border border-[#d0d5dd] rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-[#344054] text-base leading-6">
                Selected Location
              </h4>
              <div className="space-y-1">
                <p className="text-[#101828] text-sm">
                  {location.address}
                </p>
                <p className="text-[#667085] text-xs">
                  Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              </div>
            </div>
          )}
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
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 