import React, { useState } from 'react'
import Button from './Button'
import Radio from './Radio'
import { cn } from '../../utils/cn'

interface HazardReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (hazardData: any) => void
}

const HazardReportModal: React.FC<HazardReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState(1)
  const [selectedHazard, setSelectedHazard] = useState<string>('')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number, address?: string} | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [description, setDescription] = useState('')
  const [immediateAction, setImmediateAction] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  // Hardcoded hazard data
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
  ]

  const severityLevels = [
    { value: 'low', label: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { value: 'medium', label: 'Medium Risk', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
    { value: 'high', label: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { value: 'critical', label: 'Critical Risk', color: 'text-red-800', bgColor: 'bg-red-100', borderColor: 'border-red-300' }
  ]

  const locations = [
    'Pin my location'
  ]

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setPhotos(prev => [...prev, ...files])
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

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
        setSelectedLocation('Pin my location')
        setIsGettingLocation(false)
        
        // Optional: Get address from coordinates (reverse geocoding)
        // This would require a geocoding service like Google Maps API
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
      // You could add a toast notification here
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

  const openPhotoGallery = (index: number) => {
    setSelectedPhotoIndex(index)
    setShowPhotoGallery(true)
  }

  const closePhotoGallery = () => {
    setShowPhotoGallery(false)
  }

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit hazard report
      const hazardData = {
        id: Date.now().toString(),
        type: selectedHazard,
        severity: selectedSeverity,
        location: selectedLocation,
        coordinates: currentLocation,
        description,
        immediateAction,
        photos: photos.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size
        })),
        reportedBy: 'Current User',
        reportedAt: new Date().toISOString(),
        status: 'Open'
      }
      onSubmit(hazardData)
      onClose()
      resetForm()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSelectedHazard('')
    setSelectedSeverity('')
    setSelectedLocation('')
    setCurrentLocation(null)
    setIsGettingLocation(false)
    setDescription('')
    setImmediateAction('')
    setPhotos([])
    setShowPhotoGallery(false)
    setSelectedPhotoIndex(0)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedHazard && selectedSeverity
      case 2:
        return selectedLocation && description.trim()
      case 3:
        return immediateAction.trim()
      default:
        return false
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full bg-white rounded-t-[24px] shadow-2xl max-h-[90vh] flex flex-col">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#d0d5dd] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-[#eaecf0]">
          <div>
            <h2 className="text-lg font-semibold text-[#101828]">Report Hazard</h2>
            <p className="text-sm text-[#667085] mt-1">
              Step {step} of 3 - {step === 1 ? 'Hazard Details' : step === 2 ? 'Location & Description' : 'Immediate Actions'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f9fafb] transition-colors"
          >
            <svg className="w-5 h-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              {/* Hazard Type Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[#101828]">Hazard Type *</h3>
                <div className="grid grid-cols-1 gap-2">
                  {hazardTypes.map((hazard) => (
                    <button
                      key={hazard}
                      onClick={() => setSelectedHazard(hazard)}
                      className={cn(
                        'w-full p-3 rounded-[20px] border text-left transition-colors',
                        selectedHazard === hazard
                          ? 'bg-[#ebfe5c] border-[#2a6c7e]'
                          : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                      )}
                    >
                      <span className="text-sm font-medium text-[#101828]">{hazard}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[#101828]">Risk Severity *</h3>
                <div className="grid grid-cols-1 gap-2">
                  {severityLevels.map((severity) => (
                    <button
                      key={severity.value}
                      onClick={() => setSelectedSeverity(severity.value)}
                      className={cn(
                        'w-full p-3 rounded-[20px] border text-left transition-colors',
                        selectedSeverity === severity.value
                          ? 'bg-[#ebfe5c] border-[#2a6c7e]'
                          : 'bg-white border-[#eaecf0] hover:border-[#266273]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-3 h-3 rounded-full border-2',
                          selectedSeverity === severity.value
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
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Location Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[#101828]">Location *</h3>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className={cn(
                      'w-full p-3 rounded-[20px] border text-left transition-colors flex items-center gap-3',
                      selectedLocation === 'Pin my location'
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
                  <h3 className="text-sm font-medium text-[#101828]">Map</h3>
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

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[#101828]">Hazard Description *</h3>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the hazard in detail..."
                  className="w-full p-3 border border-[#eaecf0] rounded-[20px] resize-none focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent"
                  rows={4}
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[#101828]">Photos (Optional)</h3>
                
                {/* Upload Button */}
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full p-4 border-2 border-dashed border-[#eaecf0] rounded-[20px] text-center hover:border-[#266273] transition-colors">
                    <svg className="w-8 h-8 text-[#667085] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="text-sm text-[#667085]">Tap to add photos</p>
                    <p className="text-xs text-[#667085] mt-1">Upload multiple images</p>
                  </div>
                </div>

                {/* Photo Preview */}
                {photos.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#667085]">Uploaded photos ({photos.length})</p>
                    <div className="space-y-2">
                      {photos.map((photo, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-[#f8f9fa] rounded-[12px] border border-[#eaecf0]">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Preview ${index + 1}`}
                            className="w-12 h-12 object-cover rounded-[8px] cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openPhotoGallery(index)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#101828] truncate">{photo.name}</p>
                            <p className="text-xs text-[#667085]">
                              {(photo.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>
                          <button
                            onClick={() => removePhoto(index)}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors"
                          >
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {/* Immediate Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[#101828]">Immediate Actions Taken *</h3>
                <textarea
                  value={immediateAction}
                  onChange={(e) => setImmediateAction(e.target.value)}
                  placeholder="Describe any immediate actions taken to address the hazard..."
                  className="w-full p-3 border border-[#eaecf0] rounded-[20px] resize-none focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent"
                  rows={4}
                />
              </div>

              {/* Summary */}
              <div className="p-4 bg-[#f8f9fa] rounded-[20px] border border-[#eaecf0]">
                <h4 className="text-sm font-medium text-[#101828] mb-3">Hazard Report Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Type:</span>
                    <span className="text-[#101828] font-medium">{selectedHazard}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Severity:</span>
                    <span className={cn(
                      'font-medium px-2 py-1 rounded-full text-xs',
                      severityLevels.find(s => s.value === selectedSeverity)?.bgColor,
                      severityLevels.find(s => s.value === selectedSeverity)?.borderColor,
                      severityLevels.find(s => s.value === selectedSeverity)?.color
                    )}>
                      {severityLevels.find(s => s.value === selectedSeverity)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Location:</span>
                    <span className="text-[#101828] font-medium">{selectedLocation}</span>
                  </div>
                  {currentLocation && (
                    <div className="flex justify-between">
                      <span className="text-[#667085]">Coordinates:</span>
                      <span className="text-[#101828] font-medium text-xs">
                        {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Photos:</span>
                    <span className="text-[#101828] font-medium">{photos.length} uploaded</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#eaecf0]">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
          >
            {step === 3 ? 'Submit Report' : 'Next'}
          </Button>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {showPhotoGallery && photos.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={closePhotoGallery}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Photo display */}
            <div className="max-w-full max-h-full flex items-center justify-center">
              <img
                src={URL.createObjectURL(photos[selectedPhotoIndex])}
                alt={`Photo ${selectedPhotoIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Photo counter */}
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default HazardReportModal
