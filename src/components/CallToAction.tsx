import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="bg-[#182865] py-16 relative overflow-hidden">
      {/* Background image */}
      
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 opacity-10 rounded-full transform -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 opacity-10 rounded-full transform translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Simplify Your Logistics?
        </h2>
        <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses that trust Samptel Transport for their freight needs
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-8 py-6 text-lg ">
            Register Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
