import React, { useState, useEffect, useRef } from 'react';

interface InteractiveMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  className?: string;
}

export default function InteractiveMap({ onLocationSelect, className }: InteractiveMapProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [droppedPin, setDroppedPin] = useState<{ lat: number; lng: number } | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        const defaultLocation = { lat: -25.2744, lng: 133.7751 };
        setUserLocation(defaultLocation);
        if (onLocationSelect) {
          onLocationSelect({
            lat: defaultLocation.lat,
            lng: defaultLocation.lng,
            address: 'Default Location'
          });
        }
      }, 8000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
          
          if (onLocationSelect) {
            onLocationSelect({
              lat: latitude,
              lng: longitude,
              address: 'Current Location'
            });
          }
        },
        (error) => {
          clearTimeout(timeoutId);
          console.error('Error getting location:', error);
          setIsLoading(false);
          const defaultLocation = { lat: -25.2744, lng: 133.7751 };
          setUserLocation(defaultLocation);
          if (onLocationSelect) {
            onLocationSelect({
              lat: defaultLocation.lat,
              lng: defaultLocation.lng,
              address: 'Default Location'
            });
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 6000,
          maximumAge: 300000
        }
      );
    } else {
      const defaultLocation = { lat: -25.2744, lng: 133.7751 };
      setUserLocation(defaultLocation);
      if (onLocationSelect) {
        onLocationSelect({
          lat: defaultLocation.lat,
          lng: defaultLocation.lng,
          address: 'Default Location'
        });
      }
    }
  }, [onLocationSelect]);

  // Search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate search results
    setTimeout(() => {
      const mockResults = [
        { name: searchQuery, lat: userLocation?.lat || -25.2744, lng: userLocation?.lng || 133.7751 },
        { name: `${searchQuery} - Area 1`, lat: (userLocation?.lat || -25.2744) + 0.001, lng: (userLocation?.lng || 133.7751) + 0.001 },
        { name: `${searchQuery} - Area 2`, lat: (userLocation?.lat || -25.2744) - 0.001, lng: (userLocation?.lng || 133.7751) - 0.001 },
      ];
      setSearchResults(mockResults);
      setShowResults(true);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle location selection from search results
  const handleLocationSelect = (result: any) => {
    setDroppedPin({ lat: result.lat, lng: result.lng });
    setShowResults(false);
    setSearchQuery(result.name);
    
    if (onLocationSelect) {
      onLocationSelect({
        lat: result.lat,
        lng: result.lng,
        address: result.name
      });
    }
  };

  // Handle map click to drop pin
  const handleMapClick = (e: React.MouseEvent) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect && userLocation) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Convert click position to approximate coordinates
      const latOffset = (y - rect.height / 2) * 0.0001;
      const lngOffset = (x - rect.width / 2) * 0.0001;
      
      const newLat = userLocation.lat + latOffset;
      const newLng = userLocation.lng + lngOffset;
      
      setDroppedPin({ lat: newLat, lng: newLng });
      
      if (onLocationSelect) {
        onLocationSelect({
          lat: newLat,
          lng: newLng,
          address: 'Dropped Pin Location'
        });
      }
    }
  };

  // Reset to current location
  const handleUseCurrentLocation = () => {
    if (userLocation) {
      setDroppedPin(null);
      setSearchQuery('');
      if (onLocationSelect) {
        onLocationSelect({
          lat: userLocation.lat,
          lng: userLocation.lng,
          address: 'Current Location'
        });
      }
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-[#667085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowResults(searchResults.length > 0)}
          placeholder="Search for location..."
          className="block w-full pl-10 pr-3 py-2.5 border border-[#d0d5dd] rounded-lg text-sm text-[#101828] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#558998] focus:border-transparent"
        />
        
        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d0d5dd] rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(result)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0 border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#558998] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[#101828] text-sm">{result.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-[200px] bg-gradient-to-br from-green-100 via-green-50 to-blue-50 border border-[#d0d5dd] rounded-lg relative overflow-hidden cursor-crosshair"
          onClick={handleMapClick}
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#558998]"></div>
                <p className="text-sm text-[#667085]">Getting your location...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              
              {/* Roads */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gray-400"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400"></div>
                <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-gray-400"></div>
                <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-gray-400"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-400"></div>
                <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-gray-400"></div>
              </div>
              
              {/* Current location pin */}
              {userLocation && !droppedPin && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-[#558998] rounded-full border-2 border-white shadow-lg">
                    <div className="absolute inset-0 w-4 h-4 bg-[#558998] rounded-full animate-ping opacity-30"></div>
                  </div>
                </div>
              )}
              
              {/* Dropped pin */}
              {droppedPin && userLocation && (
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-full"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                >
                  <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-black/20 rounded-full"></div>
                </div>
              )}
              
              {/* Controls */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={handleUseCurrentLocation}
                  className="w-8 h-8 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                  title="Use current location"
                >
                  <svg className="w-4 h-4 text-[#558998]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
        
        {/* Location info */}
        <div className="mt-2 text-center">
          <p className="text-xs text-[#667085]">
            {droppedPin ? 'Click on map to change pin location' : 'Click anywhere on the map to drop a pin'}
          </p>
        </div>
      </div>
    </div>
  );
}