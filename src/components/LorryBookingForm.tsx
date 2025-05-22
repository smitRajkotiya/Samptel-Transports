import React, { useState, useEffect, useRef, KeyboardEvent, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Search, Truck, Loader2 } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import locationData from '../data/locations.json';
import { debounce } from 'lodash';

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

type TruckType = '3 Wheeler' | 'Tata Ace' | 'Pickup 8ft' | 'Bolero 1.7 Ton' | 'Eicher 14ft';

interface TruckOption {
  type: TruckType;
  capacity: string;
  price: string;
  image: string;
}

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

// Type assertion for locationData to match our TruckOption interface
const truckData = locationData.vehicleTypes as unknown as TruckOption[];

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const searchCache: Cache = {};
const abortControllers: { [key: string]: AbortController } = {};

const LorryBookingForm = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedTruck, setSelectedTruck] = useState<TruckType | null>(null);
  const [pickupSuggestions, setPickupSuggestions] = useState<NominatimResult[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<NominatimResult[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [activePickupIndex, setActivePickupIndex] = useState(-1);
  const [activeDropoffIndex, setActiveDropoffIndex] = useState(-1);
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<Location | null>(null);
  const [selectedDropLocation, setSelectedDropLocation] = useState<Location | null>(null);
  
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingPickup, setIsLoadingPickup] = useState(false);
  const [isLoadingDropoff, setIsLoadingDropoff] = useState(false);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false);
        setActivePickupIndex(-1);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffSuggestions(false);
        setActiveDropoffIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear old cache entries
  const cleanCache = useCallback(() => {
    const now = Date.now();
    Object.keys(searchCache).forEach(key => {
      if (now - searchCache[key].timestamp > CACHE_DURATION) {
        delete searchCache[key];
      }
    });
  }, []);

  // Fetch suggestions with caching and abort controller
  const fetchSuggestionsWithCache = async (
    input: string,
    setLoading: (loading: boolean) => void
  ): Promise<NominatimResult[]> => {
    if (!input || input.length < 3) return [];

    // Clean old cache entries
    cleanCache();

    // Check cache first
    const cacheKey = input.toLowerCase();
    if (searchCache[cacheKey] && Date.now() - searchCache[cacheKey].timestamp < CACHE_DURATION) {
      return searchCache[cacheKey].results;
    }

    // Cancel previous request for this input field
    if (abortControllers[cacheKey]) {
      abortControllers[cacheKey].abort();
    }

    // Create new abort controller
    const controller = new AbortController();
    abortControllers[cacheKey] = controller;

    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          input
        )}&limit=5&addressdetails=1&countrycodes=in&bounded=1&viewbox=68.7,35.7,97.25,6.5`,
        { signal: controller.signal }
      );

      const data = await response.json();
      
      // Cache the results
      searchCache[cacheKey] = {
        timestamp: Date.now(),
        results: data,
      };

      return data;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return [];
      }
      console.error('Error fetching suggestions:', error);
      return [];
    } finally {
      setLoading(false);
      delete abortControllers[cacheKey];
    }
  };

  // Debounced search functions
  const debouncedPickupSearch = useCallback(
    debounce(async (value: string) => {
      const suggestions = await fetchSuggestionsWithCache(value, setIsLoadingPickup);
      setPickupSuggestions(suggestions);
      setShowPickupSuggestions(suggestions.length > 0);
    }, 300),
    []
  );

  const debouncedDropoffSearch = useCallback(
    debounce(async (value: string) => {
      const suggestions = await fetchSuggestionsWithCache(value, setIsLoadingDropoff);
      setDropoffSuggestions(suggestions);
      setShowDropoffSuggestions(suggestions.length > 0);
    }, 300),
    []
  );

  // Handle input change for pickup location
  const handlePickupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPickup(value);
    
    if (value.length >= 3) {
      debouncedPickupSearch(value);
    } else {
      setPickupSuggestions([]);
      setShowPickupSuggestions(false);
    }
    setActivePickupIndex(-1);
  };

  // Handle input change for dropoff location
  const handleDropoffChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDropoff(value);
    
    if (value.length >= 3) {
      debouncedDropoffSearch(value);
    } else {
      setDropoffSuggestions([]);
      setShowDropoffSuggestions(false);
    }
    setActiveDropoffIndex(-1);
  };

  // Handle suggestion selection
  const selectPickupSuggestion = (suggestion: NominatimResult) => {
    setPickup(suggestion.display_name);
    setSelectedPickupLocation({
      display_name: suggestion.display_name,
      lat: suggestion.lat,
      lon: suggestion.lon
    });
    setShowPickupSuggestions(false);
    setActivePickupIndex(-1);
    dropoffInputRef.current?.focus();
  };

  const selectDropoffSuggestion = (suggestion: NominatimResult) => {
    setDropoff(suggestion.display_name);
    setSelectedDropLocation({
      display_name: suggestion.display_name,
      lat: suggestion.lat,
      lon: suggestion.lon
    });
    setShowDropoffSuggestions(false);
    setActiveDropoffIndex(-1);
  };

  // Handle keyboard navigation for pickup suggestions
  const handlePickupKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showPickupSuggestions || pickupSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActivePickupIndex((prevIndex) => 
        prevIndex < pickupSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActivePickupIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
    else if (e.key === 'Enter' && activePickupIndex >= 0) {
      e.preventDefault();
      selectPickupSuggestion(pickupSuggestions[activePickupIndex]);
    }
    else if (e.key === 'Escape') {
      setShowPickupSuggestions(false);
      setActivePickupIndex(-1);
    }
  };

  // Handle keyboard navigation for dropoff suggestions
  const handleDropoffKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropoffSuggestions || dropoffSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveDropoffIndex((prevIndex) => 
        prevIndex < dropoffSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveDropoffIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
    else if (e.key === 'Enter' && activeDropoffIndex >= 0) {
      e.preventDefault();
      selectDropoffSuggestion(dropoffSuggestions[activeDropoffIndex]);
    }
    else if (e.key === 'Escape') {
      setShowDropoffSuggestions(false);
      setActiveDropoffIndex(-1);
    }
  };

  // Highlight the matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length < 3) return <span>{text}</span>;
    
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);
    
    if (index === -1) return <span>{text}</span>;
    
    return (
      <>
        {text.substring(0, index)}
        <span className="font-bold text-blue-700">
          {text.substring(index, index + query.length)}
        </span>
        {text.substring(index + query.length)}
      </>
    );
  };

  const truckOptions: TruckOption[] = truckData;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTruck) {
      alert('Please select a truck type');
      return;
    }
    if (!selectedPickupLocation || !selectedDropLocation) {
      alert('Please select both pickup and drop locations');
      return;
    }
    console.log({ 
      pickup: selectedPickupLocation, 
      dropoff: selectedDropLocation, 
      selectedTruck 
    });
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Cancel any pending requests when component unmounts
      Object.values(abortControllers).forEach(controller => {
        controller.abort();
      });
    };
  }, []);

  return (
    <div className="w-full max-w-[75rem] mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-6 md:mt-8 animate-fade-in">
      <form onSubmit={handleSearch} className="space-y-4 md:space-y-6 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Pickup Location */}
          <div className="flex-1 relative" ref={pickupRef}>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-green-500" />
            </div>
            <input
              ref={pickupInputRef}
              type="text"
              placeholder="Add Pickup Location"
              className="pl-10 pr-4 py-2 md:py-3 w-full border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-logistics-blue"
              value={pickup}
              onChange={handlePickupChange}
              onFocus={() => {
                if (pickupSuggestions.length) {
                  setShowPickupSuggestions(true);
                }
              }}
              onKeyDown={handlePickupKeyDown}
              autoComplete="off"
            />
            {/* Loading indicator */}
            {isLoadingPickup && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            )}
            {/* Suggestions dropdown */}
            {showPickupSuggestions && pickupSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                <ul role="listbox">
                  {pickupSuggestions.map((suggestion, index) => (
                    <li 
                      key={suggestion.place_id} 
                      role="option"
                      aria-selected={index === activePickupIndex}
                      className={`px-4 py-2 cursor-pointer flex items-center ${
                        index === activePickupIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => selectPickupSuggestion(suggestion)}
                    >
                      <MapPin className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{highlightMatch(suggestion.display_name, pickup)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Drop Location */}
          <div className="flex-1 relative" ref={dropoffRef}>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-red-500" />
            </div>
            <input
              ref={dropoffInputRef}
              type="text"
              placeholder="Add Drop Location"
              className="pl-10 pr-4 py-2 md:py-3 w-full border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-logistics-blue"
              value={dropoff}
              onChange={handleDropoffChange}
              onFocus={() => {
                if (dropoffSuggestions.length) {
                  setShowDropoffSuggestions(true);
                }
              }}
              onKeyDown={handleDropoffKeyDown}
              autoComplete="off"
            />
            {/* Loading indicator */}
            {isLoadingDropoff && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            )}
            {/* Suggestions dropdown */}
            {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                <ul role="listbox">
                  {dropoffSuggestions.map((suggestion, index) => (
                    <li 
                      key={suggestion.place_id}
                      role="option"
                      aria-selected={index === activeDropoffIndex}
                      className={`px-4 py-2 cursor-pointer flex items-center ${
                        index === activeDropoffIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => selectDropoffSuggestion(suggestion)}
                    >
                      <MapPin className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                      <span>{highlightMatch(suggestion.display_name, dropoff)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Search Button */}
          <Button 
            type="submit" 
            className="bg-logistics-lightBlue hover:bg-blue-600 text-white font-medium px-6 md-8 py-6 md-3 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4 md:h-5 md:w-5" />
            <span>Search</span>
          </Button>
        </div>
      </form>

      {/* Truck Options Section */}
      <div className="mb-6 md:mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {truckOptions.map((truck) => (
            <div
              key={truck.type}
              onClick={() => setSelectedTruck(truck.type)}
              className={`p-2 sm:p-3 flex flex-col justify-between rounded-lg border-2 cursor-pointer transition-all h-auto ${
                selectedTruck === truck.type ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex flex-col items-center justify-between h-full">
                <img src={truck.image} alt={truck.type} className="h-12 sm:h-16 mb-2 object-contain" />
                <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-1 text-center">{truck.type}</h3>
                <div className="bg-gray-100 px-2 py-0.5 rounded-full text-xs mb-1 text-center">
                  {truck.capacity}
                </div>
                <p className="text-gray-600 text-xs text-center mb-1">
                  From <span className="font-semibold">{truck.price}</span>
                </p>
                <Button
                  variant="link"
                  className="text-blue-600 mt-1 p-0 text-xs h-auto min-h-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle know more click
                  }}
                >
                  Know more
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LorryBookingForm;
