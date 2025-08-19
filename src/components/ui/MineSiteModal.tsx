import React, { useEffect, useState } from 'react'
import { Button, SearchInput } from './index'
import BMAaustralia from '../../assets/minesites/bhp/BMAaustralia.png'
import BMAblackwateraustralia from '../../assets/minesites/bhp/BMAblackwateraustralia.png'
import huntervalley from '../../assets/minesites/bhp/huntervalley.png'
import jimblebar from '../../assets/minesites/bhp/jimblebar.png'
import newman from '../../assets/minesites/bhp/newman.png'
import nickelwest from '../../assets/minesites/bhp/nickelwest.png'
import olympicdam from '../../assets/minesites/bhp/olympicdam.png'
import southflank from '../../assets/minesites/bhp/southflank.png'
import pinIcon from '../../assets/pinicon.svg'

interface MineSite {
	id: string
	name: string
	image: string
	location: string
}

interface MineSiteModalProps {
	isOpen: boolean
	onClose: () => void
	onSelect: (site: MineSite) => void
}

const MineSiteModal: React.FC<MineSiteModalProps> = ({ isOpen, onClose, onSelect }) => {
	const [searchValue, setSearchValue] = useState('')
	const [isVisible, setIsVisible] = useState(false)

	const mineSites: MineSite[] = [
		{ id: 'bma-australia', name: 'BMA Australia', image: BMAaustralia, location: 'Bowen Basin, QLD' },
		{ id: 'bma-blackwater-australia', name: 'BMA Blackwater Australia', image: BMAblackwateraustralia, location: 'Bowen Basin, QLD' },
		{ id: 'western-australian-iron-ore', name: 'Western Australian Iron Ore', image: newman, location: 'Newman, WA' },
		{ id: 'western-australia-iron-ore-jimblebar', name: 'Western Australia Iron Ore', image: jimblebar, location: 'Jimblebar, WA' },
		{ id: 'western-australia-iron-ore-south-flank', name: 'Western Australia Iron Ore', image: southflank, location: 'South Flank, WA' },
		{ id: 'mt-arthur-coal', name: 'Mt Arthur Coal', image: huntervalley, location: 'Hunter Valley, NSW' },
		{ id: 'olympic-dam', name: 'Olympic Dam', image: olympicdam, location: 'South Australia' },
		{ id: 'nickel-west', name: 'Nickel West', image: nickelwest, location: 'Mount Keith, WA' },
	]

	const filteredSites = mineSites.filter(
		(site) => site.name.toLowerCase().includes(searchValue.toLowerCase()) || site.location.toLowerCase().includes(searchValue.toLowerCase())
	)

	const handleSiteSelect = (site: MineSite) => {
		onSelect(site)
		handleClose()
	}

	const handleClose = () => {
		setIsVisible(false)
		setTimeout(() => {
			onClose()
		}, 300)
	}

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
			<div className={`absolute inset-0 transition-opacity duration-300 ${isVisible ? 'bg-black/50' : 'bg-black/0'}`} onClick={handleClose} />

			{/* Bottom sheet */}
			<div
				className={`relative bg-white rounded-t-[20px] w-full h-[634px] flex flex-col pt-12 pb-6 px-4 transform transition-transform duration-300 ease-out ${
					isVisible ? 'translate-y-0' : 'translate-y-full'
				}`}
			>
				{/* Drag handle */}
				<div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />

				{/* Header */}
				<div className="flex items-center justify-center mb-3">
					<h2 className="font-bold text-[#000000] text-xl leading-[30px]">Select Location Site</h2>
				</div>

				{/* Search */}
				<div className="mb-4">
					<SearchInput value={searchValue} onChange={setSearchValue} placeholder="Search" showMapIcon />
				</div>

				{/* Sites List */}
				<div className="flex-1 overflow-y-auto">
					<div className="space-y-0">
						{filteredSites.map((site, index) => (
							<div key={site.id}>
								<div className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => handleSiteSelect(site)}>
									{/* Site Image */}
									<div className="w-[54px] h-[54px] rounded-[6.894px] overflow-hidden flex-shrink-0">
										<img src={site.image} alt={site.name} className="w-full h-full object-cover" />
									</div>

									{/* Site Info */}
									<div className="flex-1 min-w-0">
										<div className="font-semibold text-[#101828] text-base leading-6 truncate">{site.name}</div>
										<div className="font-normal text-[#667085] text-sm leading-5 truncate">{site.location}</div>
									</div>

									{/* Pin Icon */}
									<img src={pinIcon} alt="Pin" className="w-6 h-6 flex-shrink-0" />
								</div>

								{/* Divider */}
								{index < filteredSites.length - 1 && <div className="h-px bg-[#eaecf0] my-0" />}
							</div>
						))}
					</div>
				</div>

				{/* Action Button */}
				<div className="mt-4">
					<Button variant="secondary" size="md" onClick={handleClose} className="w-full">
						Cancel
					</Button>
				</div>
			</div>
		</div>
	)
}

export default MineSiteModal 