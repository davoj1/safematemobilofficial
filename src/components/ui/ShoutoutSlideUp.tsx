import React, { useState } from 'react'
import { Button } from './index'

export interface TeamMemberOption {
  id: string
  name: string
  avatar?: string
}

interface ShoutoutSlideUpProps {
  isOpen: boolean
  onClose: () => void
  teamMembers: TeamMemberOption[]
  onSubmit: (payload: { 
    selectedMembers: string[], 
    message: string, 
    photos: File[] 
  }) => void
}

const ShoutoutSlideUp: React.FC<ShoutoutSlideUpProps> = ({
  isOpen,
  onClose,
  teamMembers,
  onSubmit
}) => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [photos, setPhotos] = useState<File[]>([])

  const toggleMember = (id: string) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setPhotos(prev => [...prev, ...files].slice(0, 5)) // Limit to 5 photos
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const resetAndClose = () => {
    setSelectedMembers([])
    setMessage('')
    setPhotos([])
    onClose()
  }

  const handleSubmit = () => {
    if (selectedMembers.length === 0 || !message.trim()) return
    
    onSubmit({ 
      selectedMembers, 
      message: message.trim(),
      photos
    })
    resetAndClose()
  }

  const isFormValid = selectedMembers.length > 0 && message.trim().length > 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={resetAndClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-t-[20px] w-full h-[85vh] flex flex-col pt-12 pb-6 px-4 shadow-xl">        
        {/* Drag handle + Title */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />
        <div className="absolute right-2 top-2 w-9 h-9 flex items-center justify-center">
          <button onClick={resetAndClose} className="w-8 h-8 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#667085]">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="text-center mb-6">
          <h2 className="font-bold text-[#000000] text-xl leading-[30px]">
            🎉 Team Shoutout
          </h2>
          <p className="text-sm text-[#667085] mt-0.5">Recognize teammates for their great work</p>
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-6">
          {/* Team Member Selection */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Who are you recognizing?</h3>
            
            <div className="space-y-2">
              {teamMembers.map(member => {
                const isSelected = selectedMembers.includes(member.id)
                return (
                  <div key={member.id} className="flex items-center gap-3 py-3 border-b border-[#eaecf0] last:border-b-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#266273] overflow-hidden">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-sm font-medium">{member.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#101828] text-base leading-6 truncate">{member.name}</div>
                    </div>
                    <button 
                      onClick={() => toggleMember(member.id)} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? "bg-[#ebfe5c]" : "bg-[#266273]"
                      }`}
                    > 
                      {isSelected ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#101828]">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Message Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Recognition Message</h3>
            <div className="space-y-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what they did well, how they helped the team, or why you appreciate their work..."
                className="w-full p-3 border border-[#d0d5dd] rounded-xl text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent resize-none"
                rows={4}
                maxLength={500}
              />
              <div className="text-right text-xs text-[#667085]">
                {message.length}/500 characters
              </div>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Add Photos (Optional)</h3>
            
            {/* Upload Button */}
            <div className="space-y-3">
              <label className="block">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={photos.length >= 5}
                />
                <div className={`w-full p-4 border-2 border-dashed rounded-xl text-center transition-colors cursor-pointer ${
                  photos.length >= 5 
                    ? 'border-[#d0d5dd] bg-[#f8f9fa] text-[#667085] cursor-not-allowed'
                    : 'border-[#266273] bg-[#f0f9ff] text-[#266273] hover:bg-[#e0f2fe]'
                }`}>
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <div className="text-sm font-medium">
                      {photos.length >= 5 ? 'Maximum 5 photos' : 'Add Photos'}
                    </div>
                    {photos.length < 5 && (
                      <div className="text-xs text-[#667085]">
                        Tap to upload photos of the great work
                      </div>
                    )}
                  </div>
                </div>
              </label>

              {/* Photo Previews */}
              {photos.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-[#667085]">Uploaded photos ({photos.length}/5)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-[#eaecf0]"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
        </div>

        <div className="px-5 py-4 border-t border-[#eaecf0] flex gap-3">
          <Button className="flex-1" variant="light-teal" onClick={resetAndClose}>
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleSubmit} 
            disabled={!isFormValid}
          >
            Send Shoutout {selectedMembers.length > 0 && `(${selectedMembers.length})`}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShoutoutSlideUp

