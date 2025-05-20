import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Search, Truck } from "lucide-react";
import locationData from '../data/locations.json';

type TruckType = '3 Wheeler' | 'Tata Ace' | 'Pickup 8ft' | 'Bolero 1.7 Ton' | 'Eicher 14ft';

interface TruckOption {
  type: TruckType;
  capacity: string;
  price: string;
  image: string;
}

// Type assertion for locationData to match our TruckOption interface
const truckData = locationData.vehicleTypes as unknown as TruckOption[];

const LorryBookingForm = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedTruck, setSelectedTruck] = useState<TruckType | null>(null);
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<string[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [activePickupIndex, setActivePickupIndex] = useState(-1);
  const [activeDropoffIndex, setActiveDropoffIndex] = useState(-1);
  
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);

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

  // Filter suggestions based on input
  const filterSuggestions = (input: string): string[] => {
    if (!input || input.length < 2) return [];
    
    const inputValue = input.toLowerCase();
    return locationData.locations
      .filter(location => location.toLowerCase().includes(inputValue))
      .slice(0, 5); // Limit to 5 suggestions
  };

  // Handle input change for pickup location
  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPickup(value);
    
    const filteredSuggestions = filterSuggestions(value);
    setPickupSuggestions(filteredSuggestions);
    setShowPickupSuggestions(filteredSuggestions.length > 0);
    setActivePickupIndex(-1);
  };

  // Handle input change for dropoff location
  const handleDropoffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDropoff(value);
    
    const filteredSuggestions = filterSuggestions(value);
    setDropoffSuggestions(filteredSuggestions);
    setShowDropoffSuggestions(filteredSuggestions.length > 0);
    setActiveDropoffIndex(-1);
  };

  // Handle suggestion selection
  const selectPickupSuggestion = (suggestion: string) => {
    setPickup(suggestion);
    setShowPickupSuggestions(false);
    setActivePickupIndex(-1);
    dropoffInputRef.current?.focus();
  };

  const selectDropoffSuggestion = (suggestion: string) => {
    setDropoff(suggestion);
    setShowDropoffSuggestions(false);
    setActiveDropoffIndex(-1);
  };

  // Handle keyboard navigation for pickup suggestions
  const handlePickupKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showPickupSuggestions || pickupSuggestions.length === 0) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActivePickupIndex((prevIndex) => 
        prevIndex < pickupSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActivePickupIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
    // Enter key
    else if (e.key === 'Enter' && activePickupIndex >= 0) {
      e.preventDefault();
      selectPickupSuggestion(pickupSuggestions[activePickupIndex]);
    }
    // Escape key
    else if (e.key === 'Escape') {
      setShowPickupSuggestions(false);
      setActivePickupIndex(-1);
    }
  };

  // Handle keyboard navigation for dropoff suggestions
  const handleDropoffKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropoffSuggestions || dropoffSuggestions.length === 0) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveDropoffIndex((prevIndex) => 
        prevIndex < dropoffSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveDropoffIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
    // Enter key
    else if (e.key === 'Enter' && activeDropoffIndex >= 0) {
      e.preventDefault();
      selectDropoffSuggestion(dropoffSuggestions[activeDropoffIndex]);
    }
    // Escape key
    else if (e.key === 'Escape') {
      setShowDropoffSuggestions(false);
      setActiveDropoffIndex(-1);
    }
  };

  // Highlight the matching text in suggestions
  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length < 2) return <span>{text}</span>;
    
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
    console.log({ pickup, dropoff, selectedTruck });
  };

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
                const suggestions = filterSuggestions(pickup);
                if (suggestions.length) {
                  setPickupSuggestions(suggestions);
                  setShowPickupSuggestions(true);
                }
              }}
              onKeyDown={handlePickupKeyDown}
              autoComplete="off"
            />
            {/* Suggestions dropdown */}
            {showPickupSuggestions && pickupSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                <ul role="listbox">
                  {pickupSuggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      role="option"
                      aria-selected={index === activePickupIndex}
                      className={`px-4 py-2 cursor-pointer flex items-center ${
                        index === activePickupIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => selectPickupSuggestion(suggestion)}
                    >
                      <MapPin className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{highlightMatch(suggestion, pickup)}</span>
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
                const suggestions = filterSuggestions(dropoff);
                if (suggestions.length) {
                  setDropoffSuggestions(suggestions);
                  setShowDropoffSuggestions(true);
                }
              }}
              onKeyDown={handleDropoffKeyDown}
              autoComplete="off"
            />
            {/* Suggestions dropdown */}
            {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                <ul role="listbox">
                  {dropoffSuggestions.map((suggestion, index) => (
                    <li 
                      key={index}
                      role="option"
                      aria-selected={index === activeDropoffIndex}
                      className={`px-4 py-2 cursor-pointer flex items-center ${
                        index === activeDropoffIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => selectDropoffSuggestion(suggestion)}
                    >
                      <MapPin className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                      <span>{highlightMatch(suggestion, dropoff)}</span>
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
