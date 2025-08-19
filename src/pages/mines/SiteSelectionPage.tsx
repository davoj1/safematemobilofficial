import React, { useState } from 'react'
import { HeaderWithBack } from '../../components/layout'
import { SearchInputWithMap, SiteCard } from '../../components/ui'

// BHP Site Images
import BMAaustralia from '../../assets/minesites/bhp/BMAaustralia.png'
import BMAblackwateraustralia from '../../assets/minesites/bhp/BMAblackwateraustralia.png'
import newman from '../../assets/minesites/bhp/newman.png'
import jimblebar from '../../assets/minesites/bhp/jimblebar.png'
import southflank from '../../assets/minesites/bhp/southflank.png'
import huntervalley from '../../assets/minesites/bhp/huntervalley.png'
import olympicdam from '../../assets/minesites/bhp/olympicdam.png'
import nickelwest from '../../assets/minesites/bhp/nickelwest.png'

// FMG Site Images
import fmgPortHedland from '../../assets/minesites/fmg/fmgporthedland.png'
import fmgChristmasCreek from '../../assets/minesites/fmg/fmgchristmascreek.png'
import fmgCloudbreak from '../../assets/minesites/fmg/fmgcloudbreak.png'
import fmgEliwana from '../../assets/minesites/fmg/fmgeliwana.png'
import fmgIronBridge from '../../assets/minesites/fmg/fmgironbridge.png'
import fmgSolomon from '../../assets/minesites/fmg/fmgsolomon.png'

interface MineSite {
  id: string
  name: string
  location: string
  image: string
}

interface SiteSelectionPageProps {
  company: 'bhp' | 'fmg'
  onBack?: () => void
  onSiteSelect?: (siteId: string) => void
}

const SiteSelectionPage: React.FC<SiteSelectionPageProps> = ({
  company,
  onBack,
  onSiteSelect,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedSite, setSelectedSite] = useState<string | null>(null)

  // Define all mine sites for each company
  const mineSites: { [key: string]: MineSite[] } = {
    bhp: [
      { id: 'bma-australia', name: 'BMA Australia', location: 'Bowen Basin, QLD', image: BMAaustralia },
      { id: 'bma-blackwater-australia', name: 'BMA Blackwater Australia', location: 'Bowen Basin, QLD', image: BMAblackwateraustralia },
      { id: 'western-australian-iron-ore', name: 'Western Australian Iron Ore', location: 'Newman, WA', image: newman },
      { id: 'western-australia-iron-ore-jimblebar', name: 'Western Australia Iron Ore', location: 'Jimblebar, WA', image: jimblebar },
      { id: 'western-australia-iron-ore-south-flank', name: 'Western Australia Iron Ore', location: 'South Flank, WA', image: southflank },
      { id: 'mt-arthur-coal', name: 'Mt Arthur Coal', location: 'Hunter Valley, NSW', image: huntervalley },
      { id: 'olympic-dam', name: 'Olympic Dam', location: 'South Australia', image: olympicdam },
      { id: 'nickel-west', name: 'Nickel West', location: 'Mount Keith, WA', image: nickelwest },
    ],
    fmg: [
      { id: 'port-hedland', name: 'Port Hedland', location: 'Pilbara, WA', image: fmgPortHedland },
      { id: 'christmas-creek', name: 'Christmas Creek', location: 'Pilbara, WA', image: fmgChristmasCreek },
      { id: 'cloudbreak', name: 'Cloudbreak', location: 'Pilbara, WA', image: fmgCloudbreak },
      { id: 'eliwana', name: 'Eliwana', location: 'Pilbara, WA', image: fmgEliwana },
      { id: 'iron-bridge', name: 'Iron Bridge', location: 'Pilbara, WA', image: fmgIronBridge },
      { id: 'solomon', name: 'Solomon', location: 'Pilbara, WA', image: fmgSolomon },
    ],
  }

  const sites = mineSites[company] || []
  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    site.location.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSiteSelect = (siteId: string) => {
    setSelectedSite(siteId)
    console.log(`Selected ${company.toUpperCase()} site:`, siteId)
    onSiteSelect?.(siteId)
  }

  const handleBack = () => {
    console.log('Back to company selection')
    onBack?.()
  }

  const handleMapClick = () => {
    console.log('Map view clicked')
    // Handle map view functionality
  }

  const getCompanyDisplayName = () => {
    return company === 'bhp' ? 'BHP' : 'Fortescue Metals Group'
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title={`Choose a ${getCompanyDisplayName()} Site`}
        onBack={handleBack}
        className="flex-shrink-0"
      />

      {/* Search Input - Fixed */}
      <div className="px-5 py-3 flex-shrink-0">
        <SearchInputWithMap
          value={searchValue}
          onChange={setSearchValue}
          onMapClick={handleMapClick}
        />
      </div>

      {/* Sites List - Scrollable */}
      <div className="flex-1 px-5 overflow-y-auto">
        <div className="space-y-0">
          {filteredSites.map((site, index) => (
            <div key={site.id}>
              <SiteCard
                name={site.name}
                location={site.location}
                image={site.image}
                onClick={() => handleSiteSelect(site.id)}
                className={selectedSite === site.id ? 'bg-gray-50' : ''}
              />
              {index < filteredSites.length - 1 && (
                <div className="h-px bg-[#eaecf0] my-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SiteSelectionPage 