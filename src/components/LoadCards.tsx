import React, { useState } from 'react';
import { ArrowRight, MapPin, Calendar, TruckIcon, Package, DollarSign, Share2, Star, Clock } from 'lucide-react';
import loadCardsData from '@/data/loadCards.json';

const LoadCards = () => {
  const [visibleCards, setVisibleCards] = useState(6);

  const loadMoreCards = () => {
    setVisibleCards(prev => Math.min(prev + 6, loadCardsData.length));
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#182865] mb-3">Available Loads</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find available loads across India. Connect with shippers and get the best rates for your trucks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {loadCardsData.slice(0, visibleCards).map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 w-full max-w-[343px]">
              <div className="p-4">
                {/* Header with Status and Share */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      card.status === 'Vahak Assured' ? 'bg-yellow-100 text-yellow-800' :
                      card.status === 'Premium' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {card.status === 'Vahak Assured' && (
                        <img src="/verified.png" alt="Verified" className="w-4 h-4 mr-1" />
                      )}
                      {card.status}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Location Details */}
                <div className="flex items-start space-x-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start mb-3">
                      <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div className="ml-2">
                        <h3 className="font-semibold text-gray-800">{card.origin}</h3>
                        <p className="text-sm text-gray-500">{card.originState}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <div className="ml-2">
                        <h3 className="font-semibold text-gray-800">{card.destination}</h3>
                        <p className="text-sm text-gray-500">{card.destinationState}</p>
                      </div>
                    </div>
                    <div className="ml-7 mt-1">
                      <span className="text-sm text-gray-500">{card.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle and Load Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center">
                    <TruckIcon className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{card.vehicleType}</span>
                  </div>
                  <div className="flex items-center">
                    <img src="/tyre.png" alt="Tyres" className="w-4 h-4 mr-2" />
                    <span className="text-sm text-gray-600">{card.tyres}</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{card.loadType}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{card.weight}</span>
                  </div>
                </div>

                {/* Loading Time */}
                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  {card.date}
                </div>

                {/* Shipper Details */}
                {card.shipper && (
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-blue-600 font-medium">{getInitial(card.shipper.name)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{card.shipper.name}</h4>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{card.shipper.type}</span>
                        {card.shipper.rating && (
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{card.shipper.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Price Details */}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{card.rate}</h3>
                      <p className="text-sm text-gray-500">{card.rateType}</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                  <div className="flex flex-col text-sm text-gray-500">
                    {card.advancePayment && <span>{card.advancePayment} • {card.pricePerUnit}</span>}
                    {card.additionalInfo && <span>{card.additionalInfo}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCards < loadCardsData.length && (
          <div className="mt-8 text-center">
            <button 
              onClick={loadMoreCards}
              className="px-6 py-2 border border-[#182865] text-[#182865] rounded-md hover:bg-[#182865] hover:text-white transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoadCards; 