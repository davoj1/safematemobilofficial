import React, { useEffect, useState } from 'react'
import { Button, Input, TextareaInput } from './index'
import { cn } from '../../utils/cn'
import bhplogo from '../../assets/bhplogo.svg'
import riologo from '../../assets/riologo.svg'
import fortesculogo from '../../assets/fortesculogo.png'

interface MineCompany {
	id: string
	name: string
	logo: string
	role: string
}

interface MineCompanyModalProps {
	isOpen: boolean
	onClose: () => void
	onSelect: (company: MineCompany | null, otherCompany?: { name: string; reason: string }) => void
}

const MineCompanyModal: React.FC<MineCompanyModalProps> = ({ isOpen, onClose, onSelect }) => {
	const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
	const [showOtherCompany, setShowOtherCompany] = useState(false)
	const [otherCompanyName, setOtherCompanyName] = useState('')
	const [otherCompanyReason, setOtherCompanyReason] = useState('')
	const [isVisible, setIsVisible] = useState(false)

	const companies: MineCompany[] = [
		{ id: 'bhp', name: 'BHP', logo: bhplogo, role: 'Supervisor' },
		{ id: 'fortescue', name: 'Fortescue Metals', logo: fortesculogo, role: 'Admin' },
	]

	const handleCompanySelect = (companyId: string) => {
		if (companyId === 'other') {
			setShowOtherCompany(true)
			setSelectedCompany('other')
		} else {
			setShowOtherCompany(false)
			setSelectedCompany(companyId)
		}
	}

	const handleConfirm = () => {
		if (selectedCompany === 'other') {
			if (otherCompanyName.trim()) {
				onSelect(null, {
					name: otherCompanyName.trim(),
					reason: otherCompanyReason.trim(),
				})
			}
		} else {
			const company = companies.find((c) => c.id === selectedCompany)
			onSelect(company || null)
		}
		handleClose()
	}

	const handleClose = () => {
		setIsVisible(false)
		setTimeout(() => {
			setSelectedCompany(null)
			setShowOtherCompany(false)
			setOtherCompanyName('')
			setOtherCompanyReason('')
			onClose()
		}, 300)
	}

	const isConfirmDisabled = selectedCompany === 'other' ? !otherCompanyName.trim() : !selectedCompany

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-end">
			{/* Dark overlay */}
			<div
				className={`absolute inset-0 transition-opacity duration-300 ${isVisible ? 'bg-black/50' : 'bg-black/0'}`}
				onClick={handleClose}
			/>

			{/* Bottom sheet */}
			<div
				className={`relative bg-white rounded-t-[20px] w-full h-[600px] flex flex-col pt-12 pb-6 px-4 transform transition-transform duration-300 ease-out ${
					isVisible ? 'translate-y-0' : 'translate-y-full'
				}`}
			>
				{/* Drag handle */}
				<div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />

				{/* Header */}
				<div className="flex items-center justify-center mb-3">
					<h2 className="font-bold text-[#000000] text-xl leading-[30px]">Select Mine Company</h2>
				</div>

				{/* Company Options */}
				<div className="flex-1 overflow-y-auto space-y-4">
					{companies.map((company) => (
						<div
							key={company.id}
							className={cn(
								"border rounded-[20px] p-4 cursor-pointer transition-all duration-200",
								selectedCompany === company.id
									? "border-[#2a6c7e] bg-[#ebfe5c]"
									: "bg-white border-[#eaecf0] hover:border-[#266273]"
							)}
							onClick={() => handleCompanySelect(company.id)}
						>
							<div className="flex items-center gap-3">
								{/* Radio Button */}
								<div
									className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
										selectedCompany === company.id ? 'border-[#266273] bg-[#266273]' : 'border-[#d0d5dd]'
									}`}
								>
									{selectedCompany === company.id && <div className="w-3 h-3 rounded-full bg-white" />}
								</div>

								{/* Company Logo */}
								<div className="w-11 h-11 bg-white rounded-[10px] border border-[#eaecf0] flex items-center justify-center p-[5.5px] flex-shrink-0">
									<img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
								</div>

								{/* Company Info */}
								<div className="flex-1">
									<div className="font-medium text-[#101828] text-base leading-6">{company.name}</div>
									<div className="font-normal text-[#667085] text-sm leading-5">{company.role}</div>
								</div>
							</div>
						</div>
					))}

					{/* Other Company Option */}
					<div
						className={`border rounded-[20px] p-4 cursor-pointer transition-all duration-200 ${
							selectedCompany === 'other' ? 'border-[#2a6c7e] bg-[#ebfe5c]' : 'border-[#eaecf0] bg-white hover:border-[#266273]'
						}`}
						onClick={() => handleCompanySelect('other')}
					>
						<div className="flex items-center gap-3">
							{/* Radio Button */}
							<div
								className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
									selectedCompany === 'other' ? 'border-[#266273] bg-[#266273]' : 'border-[#d0d5dd]'
								}`}
							>
								{selectedCompany === 'other' && <div className="w-3 h-3 rounded-full bg-white" />}
							</div>

							{/* Other Company Text */}
							<div className="flex-1">
								<div className="font-medium text-[#101828] text-sm leading-5">Other Company</div>
							</div>
						</div>

						{/* Other Company Form */}
						{showOtherCompany && (
							<div className="mt-4 space-y-3">
								<div className="space-y-1.5">
									<label className="font-medium text-[#344054] text-sm leading-5 flex items-center gap-1">
										Company name
										<span className="text-[#d92d20]">*</span>
									</label>
									<Input placeholder="Input company name" value={otherCompanyName} onChange={(e) => setOtherCompanyName(e.target.value)} />
								</div>

								<div className="space-y-1.5">
									<label className="font-medium text-[#414651] text-sm leading-5">Reason</label>
									<TextareaInput placeholder="Your reason....." value={otherCompanyReason} onChange={(e) => setOtherCompanyReason(e.target.value)} rows={4} />
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Action Buttons */}
				<div className="mt-4 flex gap-2">
					<Button variant="secondary" size="md" onClick={handleClose} className="flex-1">
						Cancel
					</Button>
					<Button variant="primary" size="md" onClick={handleConfirm} disabled={isConfirmDisabled} className="flex-1">
						Confirm
					</Button>
				</div>
			</div>
		</div>
	)
}

export default MineCompanyModal 