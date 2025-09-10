import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './index'
import goodlinePpeRequest from '../../assets/goodline/goodlinepperequest.png'

// Import PPE icons from Rio Tinto form
import ppeHeadIcon from '../../assets/controls/ppehead.png'
import ppeHearingIcon from '../../assets/controls/ppehearing.png'
import ppeEyesIcon from '../../assets/controls/ppeeyes.png'
import ppeFeetIcon from '../../assets/controls/ppefeet.png'
import ppeHandsIcon from '../../assets/controls/ppehands.png'

interface PPEItem {
  id: string
  name: string
  icon: string
}

interface RequestPPESlideUpProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: { 
    selectedPPE: string[], 
    comment: string, 
    pickupLocation?: {lat: number, lng: number, address?: string},
    pickupComment: string 
  }) => void
}

const RequestPPESlideUp: React.FC<RequestPPESlideUpProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState(0)
  const [selectedPPE, setSelectedPPE] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [pickupLocation, setPickupLocation] = useState<{lat: number, lng: number, address?: string} | null>(null)
  const [pickupComment, setPickupComment] = useState('')
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const ppeItems: PPEItem[] = [
    { id: 'hard-hat', name: 'Hard Hat', icon: ppeHeadIcon },
    { id: 'earplugs', name: 'Earplugs', icon: ppeHearingIcon },
    { id: 'safety-glasses', name: 'Safety Glasses', icon: ppeEyesIcon },
    { id: 'boots', name: 'Safety Boots', icon: ppeFeetIcon },
    { id: 'gloves', name: 'Safety Gloves', icon: ppeHandsIcon }
  ]

  const togglePPE = (id: string) => {
    setSelectedPPE(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      return
    }

    setIsGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
        }
        setPickupLocation(location)
        setIsGettingLocation(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        setIsGettingLocation(false)
        alert('Unable to get current location. Please try again.')
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
    )
  }

  const resetAndClose = () => {
    setStep(1)
    setSelectedPPE([])
    setComment('')
    setPickupLocation(null)
    setPickupComment('')
    onClose()
  }

  const handleNext = () => {
    if (step === 0) {
      setStep(1)
    } else if (step === 1 && selectedPPE.length > 0) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    } else if (step === 1) {
      setStep(0)
    }
  }

  const handleSubmit = () => {
    if (selectedPPE.length === 0) return
    
    onSubmit({ 
      selectedPPE, 
      comment: comment.trim(),
      pickupLocation: pickupLocation || undefined,
      pickupComment: pickupComment.trim()
    })
    resetAndClose()
  }

  const canProceedIntro = true
  const canProceedStep1 = selectedPPE.length > 0
  const canSubmit = selectedPPE.length > 0

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end">
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/50" 
          onClick={resetAndClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Panel */}
        <motion.div 
          className="relative bg-white rounded-t-[20px] w-full h-[85vh] flex flex-col pt-12 pb-6 px-4 shadow-xl"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ 
            type: 'spring', 
            damping: 30, 
            stiffness: 300 
          }}
        >        
        {/* Drag handle + Title */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />
        <div className="absolute right-2 top-2 w-9 h-9 flex items-center justify-center">
          <button onClick={resetAndClose} className="w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#667085]">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-4 space-x-2">
          <div className={`w-2 h-2 rounded-full ${step >= 0 ? 'bg-[#266273]' : 'bg-[#eaecf0]'}`} />
          <div className={`w-8 h-0.5 ${step >= 1 ? 'bg-[#266273]' : 'bg-[#eaecf0]'}`} />
          <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-[#266273]' : 'bg-[#eaecf0]'}`} />
          <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-[#266273]' : 'bg-[#eaecf0]'}`} />
          <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-[#266273]' : 'bg-[#eaecf0]'}`} />
        </div>

        <div className="text-center mb-6">
          <h2 className="font-bold text-[#000000] text-xl leading-[30px]">
            PPE Request
          </h2>
          <p className="text-sm text-[#667085] mt-0.5">
            {step === 0 ? 'Request safety gear and set a pickup location' : step === 1 ? 'Select required Personal Protective Equipment' : 'Set pickup location'}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2">
          {step === 0 && (
            <div className="space-y-4">
              <div className="w-full rounded-xl overflow-hidden border border-[#eaecf0] bg-[#f8fafc]">
                <img src={goodlinePpeRequest} alt="PPE Request" className="w-full object-contain" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              {/* PPE Selection */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-[#101828]">Select PPE Items</h3>
                
                <div className="space-y-2">
                  {ppeItems.map((item) => {
                    const isSelected = selectedPPE.includes(item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => togglePPE(item.id)}
                        className={`w-full p-4 rounded-xl border text-left font-medium text-base leading-6 transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                            : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                        }`}
                      >
                        <img 
                          src={item.icon} 
                          alt={item.name}
                          className="w-8 h-8 flex-shrink-0"
                        />
                        <span className="flex-1">{item.name}</span>
                        {isSelected && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#266273]">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Comment Section */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-[#101828]">Additional Comments</h3>
                <div className="space-y-2">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Specify sizes, quantities, or any special requirements..."
                    className="w-full p-3 border border-[#d0d5dd] rounded-xl text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent resize-none"
                    rows={3}
                    maxLength={200}
                  />
                  <div className="text-right text-xs text-[#667085]">
                    {comment.length}/200 characters
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Selected PPE Summary */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-[#101828]">Selected PPE ({selectedPPE.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPPE.map(id => {
                    const item = ppeItems.find(p => p.id === id)
                    return (
                      <div key={id} className="flex items-center gap-2 bg-[#f0f9ff] border border-[#bfdbfe] rounded-lg px-3 py-2">
                        <img src={item?.icon} alt={item?.name} className="w-4 h-4" />
                        <span className="text-sm font-medium text-[#374151]">{item?.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Location Selection */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-[#101828]">Pickup Location</h3>
                <div className="space-y-2">
                  <button
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className={`w-full p-3 rounded-xl border text-left transition-colors flex items-center gap-3 ${
                      pickupLocation
                        ? 'bg-[#ebfe5c] border-[#2a6c7e] text-[#101828]'
                        : 'bg-white border-[#d0d5dd] text-[#101828] hover:border-[#266273]'
                    }`}
                  >
                    <div className="w-8 h-8 bg-[#266273] rounded-full flex items-center justify-center text-white">
                      {isGettingLocation ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">
                        {isGettingLocation ? 'Getting location...' : pickupLocation ? 'Current Location' : 'Pin My Location'}
                      </div>
                      {pickupLocation && (
                        <div className="text-sm text-[#667085] font-normal">
                          {pickupLocation.address}
                        </div>
                      )}
                    </div>
                  </button>
                </div>

                {/* Map Display */}
                {pickupLocation && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-[#101828]">Map</h4>
                    <div className="w-full h-60 bg-[#f8f9fa] border border-[#eaecf0] rounded-xl overflow-hidden relative">
                      <iframe
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${pickupLocation.lng-0.001},${pickupLocation.lat-0.001},${pickupLocation.lng+0.001},${pickupLocation.lat+0.001}&layer=mapnik&marker=${pickupLocation.lat},${pickupLocation.lng}`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <div className="absolute bottom-2 left-2">
                        <a
                          href={`https://www.google.com/maps?q=${pickupLocation.lat},${pickupLocation.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#266273] text-white px-2 py-1 rounded-md text-xs hover:bg-[#1e4f5a] transition-colors"
                        >
                          Open in Maps
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pickup Comment */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-[#101828]">Pickup Instructions</h3>
                <div className="space-y-2">
                  <textarea
                    value={pickupComment}
                    onChange={(e) => setPickupComment(e.target.value)}
                    placeholder="Any specific pickup instructions or landmark details..."
                    className="w-full p-3 border border-[#d0d5dd] rounded-xl text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent resize-none"
                    rows={3}
                    maxLength={200}
                  />
                  <div className="text-right text-xs text-[#667085]">
                    {pickupComment.length}/200 characters
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-[#eaecf0] flex gap-3">
          {step === 0 ? (
            <>
              <Button 
                className="flex-1" 
                onClick={handleNext}
                disabled={!canProceedIntro}
              >
                Next
              </Button>
            </>
          ) : step === 1 ? (
            <>
              <Button className="flex-1" variant="light-teal" onClick={handleBack}>
                Previous
              </Button>
              <Button 
                className="flex-1" 
                onClick={handleNext} 
                disabled={!canProceedStep1}
              >
                Next ({selectedPPE.length} selected)
              </Button>
            </>
          ) : (
            <>
              <Button className="flex-1" variant="light-teal" onClick={handleBack}>
                Previous
              </Button>
              <Button 
                className="flex-1" 
                onClick={handleSubmit} 
                disabled={!canSubmit}
              >
                Submit Request
              </Button>
            </>
          )}
        </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default RequestPPESlideUp

