import React, { useState } from 'react';
import HeaderWithBack from '../../../components/layout/HeaderWithBack';
import TextareaInput from '../../../components/ui/TextareaInput';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

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
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number, address?: string} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [description, setDescription] = useState('');

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      return
    }

    setIsGettingLocation(true)
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ lat: latitude, lng: longitude })
        setIsGettingLocation(false)
        
        console.log('Location obtained:', { latitude, longitude })
      },
      (error) => {
        console.error('Error getting location:', error)
        setIsGettingLocation(false)
        alert('Unable to get your location. Please check your location permissions.')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  const copyLocation = async () => {
    if (!currentLocation) return
    
    const locationText = `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`
    
    try {
      await navigator.clipboard.writeText(locationText)
      console.log('Location copied to clipboard')
    } catch (err) {
      console.error('Failed to copy location:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = locationText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const shareLocation = async () => {
    if (!currentLocation) return
    
    const locationText = `Hazard Location: ${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`
    const mapsUrl = `https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hazard Location',
          text: locationText,
          url: mapsUrl
        })
      } catch (err) {
        console.error('Error sharing location:', err)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${locationText}\n${mapsUrl}`)
        console.log('Location shared via clipboard')
      } catch (err) {
        console.error('Failed to share location:', err)
      }
    }
  }

  const handleNext = () => {
    if (currentLocation && description.trim()) {
      onNext({ location: currentLocation, description: description.trim() });
    }
  };

  const isFormValid = currentLocation && description.trim();

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

          {/* Location Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#344054] text-base leading-6">
              Location *
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className={cn(
                  'w-full p-3 rounded-[20px] border text-left transition-colors flex items-center gap-3',
                  currentLocation
                    ? 'bg-[#ebfe5c] border-[#2a6c7e]'
                    : 'bg-white border-[#eaecf0] hover:border-[#266273]',
                  isGettingLocation && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {isGettingLocation ? (
                    <div className="w-4 h-4 border-2 border-[#266273] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 text-[#266273]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#101828]">
                    {isGettingLocation ? 'Getting your location...' : 'Pin my location'}
                  </span>
                  {currentLocation && (
                    <div className="mt-2">
                      <div className="mb-2">
                        <p className="text-xs text-[#667085] mb-1">Coordinates:</p>
                        <p className="text-xs text-[#101828] font-medium break-all">
                          {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={copyLocation}
                          className="flex items-center gap-1 px-2 py-1 bg-[#f8f9fa] border border-[#eaecf0] rounded-[8px] text-xs text-[#667085] hover:bg-[#f1f3f4] transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </button>
                        <button
                          onClick={shareLocation}
                          className="flex items-center gap-1 px-2 py-1 bg-[#f8f9fa] border border-[#eaecf0] rounded-[8px] text-xs text-[#667085] hover:bg-[#f1f3f4] transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          Share
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Map Display - Separate Section */}
          {currentLocation && (
            <div className="space-y-3">
              <h3 className="font-semibold text-[#344054] text-base leading-6">
                Map
              </h3>
              <div className="w-full h-40 bg-[#f8f9fa] border border-[#eaecf0] rounded-[12px] overflow-hidden relative">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentLocation.lng-0.001},${currentLocation.lat-0.001},${currentLocation.lng+0.001},${currentLocation.lat+0.001}&layer=mapnik&marker=${currentLocation.lat},${currentLocation.lng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  title="Hazard Location Map"
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-[6px] text-xs text-[#667085]">
                  📍 Hazard Location
                </div>
                <div className="absolute bottom-2 left-2">
                  <a
                    href={`https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#266273] text-white px-2 py-1 rounded-[6px] text-xs hover:bg-[#1e4f5a] transition-colors"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>
          )}

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