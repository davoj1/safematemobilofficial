import React, { useState } from 'react'
import { Button } from './index'

interface JobUpdateSlideUpProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: { progress: number, notes: string, photos: File[] }) => void
  initialProgress?: number
  initialNotes?: string
}

const JobUpdateSlideUp: React.FC<JobUpdateSlideUpProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialProgress = 0,
  initialNotes = ''
}) => {
  const [progress, setProgress] = useState(initialProgress)
  const [notes, setNotes] = useState(initialNotes)
  const [photos, setPhotos] = useState<File[]>([])
  const [photoUrls, setPhotoUrls] = useState<string[]>([])

  const resetAndClose = () => {
    setProgress(initialProgress)
    setNotes(initialNotes)
    setPhotos([])
    setPhotoUrls([])
    onClose()
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setPhotos(prev => [...prev, ...files])
      
      // Create preview URLs
      files.forEach(file => {
        const url = URL.createObjectURL(file)
        setPhotoUrls(prev => [...prev, url])
      })
    }
  }

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photoUrls[index]) // Clean up object URL
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPhotoUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    onSubmit({ progress, notes, photos })
    resetAndClose()
  }

  const progressSteps = [0, 25, 50, 75, 100]
  const progressLabels: Record<number, string> = {
    0: 'Not Started',
    25: 'In Progress',
    50: 'Half Complete',
    75: 'Nearly Done',
    100: 'Complete'
  }

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
            Job Update
          </h2>
          <p className="text-sm text-[#667085] mt-0.5">Update progress, add notes, and attach photos</p>
        </div>

        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-6">
          {/* Progress Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Progress</h3>
            
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="w-full h-2 bg-[#eaecf0] rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-[#266273] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 bg-[#266273] text-white text-sm font-medium rounded-full">
                  {progress}% • {progressLabels[progress] || 'In Progress'}
                </span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="grid grid-cols-5 gap-2">
              {progressSteps.map((step) => (
                <button
                  key={step}
                  onClick={() => setProgress(step)}
                  className={`p-2 text-xs font-medium rounded-lg transition-colors ${
                    progress === step 
                      ? 'bg-[#266273] text-white' 
                      : 'bg-[#f8f9fa] text-[#667085] hover:bg-[#eaecf0]'
                  }`}
                >
                  {step}%
                </button>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Notes</h3>
            <div className="space-y-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about the job progress, challenges, or important updates..."
                className="w-full p-3 border border-[#d0d5dd] rounded-xl text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent resize-none"
                rows={4}
              />
              <div className="text-right text-xs text-[#667085]">
                {notes.length}/500 characters
              </div>
            </div>
          </div>

          {/* Photos Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#101828]">Photos</h3>
            
            {/* Photo Upload Button */}
            <div className="space-y-3">
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="w-full border-2 border-dashed border-[#d0d5dd] rounded-xl p-6 text-center hover:border-[#266273] hover:bg-[#f8f9fa] transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-[#f0f9ff] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#266273]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[#266273]">Add Photos</span>
                      <p className="text-xs text-[#667085] mt-1">Upload photos to document job progress</p>
                    </div>
                  </div>
                </div>
              </label>

              {/* Photo Preview */}
              {photoUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {photoUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-[#eaecf0]"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-1 pt-4 border-t border-[#eaecf0]">
          <Button
            variant="light-teal"
            onClick={resetAndClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
          >
            Update Job
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JobUpdateSlideUp
