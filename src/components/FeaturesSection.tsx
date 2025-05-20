
import React from 'react';
import { Truck, ShieldCheck, Clock, Globe } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-logistics-blue" />,
      title: 'Wide Vehicle Range',
      description: 'Choose from a diverse fleet of transport vehicles to meet your specific cargo requirements'
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-logistics-blue" />,
      title: 'Secure Transport',
      description: 'Your goods are protected with advanced tracking and insurance coverage for peace of mind'
    },
    {
      icon: <Clock className="h-8 w-8 text-logistics-blue" />,
      title: 'On-time Delivery',
      description: 'Our professional drivers ensure your cargo reaches its destination as scheduled'
    },
    {
      icon: <Globe className="h-8 w-8 text-logistics-blue" />,
      title: 'Nationwide Network',
      description: 'Extensive coverage across the country with strategic distribution points'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Samptel Transport?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We provide reliable and efficient logistics solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
