import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import goodlineIcon from '../../assets/companylogo/goodlinelogo.svg'
import safemateShieldLogo from '../../assets/safemateshieldlogo.svg'

interface FormTemplate {
  id: 'goodline' | 'safemate'
  name: string
  logo: string
  description: string
}

interface FormTemplateSwitchModalProps {
  isOpen: boolean
  onClose: () => void
  currentTemplate: 'goodline' | 'safemate'
  onTemplateSelect: (template: 'goodline' | 'safemate') => void
}

const FormTemplateSwitchModal: React.FC<FormTemplateSwitchModalProps> = ({
  isOpen,
  onClose,
  currentTemplate,
  onTemplateSelect,
}) => {
  const templates: FormTemplate[] = [
    {
      id: 'goodline',
      name: 'Goodline',
      logo: goodlineIcon,
      description: 'Template'
    },
    {
      id: 'safemate',
      name: 'SafeMate',
      logo: safemateShieldLogo,
      description: 'Template'
    }
  ]

  const handleTemplateSelect = (templateId: 'goodline' | 'safemate') => {
    if (templateId !== currentTemplate) {
      onTemplateSelect(templateId)
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 h-[85vh] flex flex-col"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-[#eaecf0] rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4">
              <h2 className="text-xl font-bold text-[#101828] text-center">
                Switch Template
              </h2>
              <p className="text-sm text-[#667085] text-center mt-1">
                Select a form template to switch to.
              </p>
            </div>

            {/* Template Options */}
            <div className="flex-1 px-6 pb-6 overflow-y-auto">
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                      template.id === currentTemplate
                        ? 'border-[#266273] bg-[#f0ff70]'
                        : 'border-[#eaecf0] bg-white hover:border-[#d0d5dd]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Radio Button */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            template.id === currentTemplate
                              ? 'border-[#266273] bg-[#266273]'
                              : 'border-[#d0d5dd] bg-white'
                          }`}
                        >
                          {template.id === currentTemplate && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>

                      {/* Logo */}
                      <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <img
                          src={template.logo}
                          alt={template.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Template Info */}
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-[#101828] text-base">
                          {template.name}
                        </div>
                        <div className="text-sm text-[#667085]">
                          {template.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FormTemplateSwitchModal
