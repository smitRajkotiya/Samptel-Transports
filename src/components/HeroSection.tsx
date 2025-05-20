import React from 'react';
import LorryBookingForm from './LorryBookingForm';

const HeroSection = () => {
  return (
    <section className="py-8 md:py-16 lg:py-24 px-4 relative overflow-hidden bg-[#f0f8ff] bg-cover bg-center">


      {/* Animated background elements */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center mb-50">
          <div className="w-full md:w-1/2 mt-6 mb-10 animate-slide-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-[#182865]">
              Find Online Lorry Booking
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-md text-[#182865]">
              Book freight services with ease. Find the right vehicle for your transportation needs.
            </p>
          </div>
            {/* Background image - adjusted positioning for responsiveness */}
            <div className="absolute top-0 right-0 z-0 hidden md:flex justify-center">
              <img
                src="/mainbackground.png"
                alt="Background pattern"
                className="w-auto h-auto object-contain relative bottom-[8vh]"
                style={{ maxHeight: "35vh" }}
              />
            </div>

        </div>
        <LorryBookingForm />
      </div>
    </section>
  );
};

// // Truck with Map Pins SVG
// const TruckWithMapPins = () => (
//   <svg width="400" height="180" viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg">
//     {/* Truck body */}
//     <rect x="150" y="120" width="300" height="100" rx="10" fill="#FBBE86" />
//     <rect x="150" y="160" width="300" height="60" rx="5" fill="#E7A76F" />

//     {/* Truck cabin */}
//     <rect x="70" y="140" width="80" height="80" rx="10" fill="#FBBE86" />
//     <rect x="80" y="150" width="50" height="30" rx="5" fill="#3B4252" />

//     {/* Wheels */}
//     <circle cx="110" cy="220" r="30" fill="#3B4252" />
//     <circle cx="110" cy="220" r="20" fill="#4C566A" />
//     <circle cx="110" cy="220" r="10" fill="#2E3440" />

//     <circle cx="350" cy="220" r="30" fill="#3B4252" />
//     <circle cx="350" cy="220" r="20" fill="#4C566A" />
//     <circle cx="350" cy="220" r="10" fill="#2E3440" />

//     <circle cx="420" cy="220" r="30" fill="#3B4252" />
//     <circle cx="420" cy="220" r="20" fill="#4C566A" />
//     <circle cx="420" cy="220" r="10" fill="#2E3440" />

//     {/* Container ribs */}
//     <rect x="170" y="130" width="5" height="80" fill="#E7A76F" />
//     <rect x="220" y="130" width="5" height="80" fill="#E7A76F" />
//     <rect x="270" y="130" width="5" height="80" fill="#E7A76F" />
//     <rect x="320" y="130" width="5" height="80" fill="#E7A76F" />
//     <rect x="370" y="130" width="5" height="80" fill="#E7A76F" />
//     <rect x="420" y="130" width="5" height="80" fill="#E7A76F" />

//     {/* Start Map Pin */}
//     <circle cx="70" cy="100" r="30" fill="#EF4444" fillOpacity="0.9" />
//     <path d="M70 60 L85 95 L70 85 L55 95 Z" fill="#EF4444" />
//     <circle cx="70" cy="100" r="15" fill="white" />

//     {/* End Map Pin */}
//     <circle cx="500" cy="100" r="30" fill="#EF4444" fillOpacity="0.9" />
//     <path d="M500 60 L515 95 L500 85 L485 95 Z" fill="#EF4444" />
//     <circle cx="500" cy="100" r="15" fill="white" />
//   </svg>
// );

export default HeroSection;
