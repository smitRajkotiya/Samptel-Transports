import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Samptel Transport provided exceptional service for our time-sensitive deliveries. Their team was professional and the online booking system is incredibly easy to use.",
      author: "James Wilson",
      role: "Logistics Manager, TechCorp Inc.",
    },
    {
      quote: "We've been using Samptel for all our freight needs for over two years. Their pricing is competitive and the vehicles are always in excellent condition.",
      author: "Sarah Chen",
      role: "Supply Chain Director, GreenGoods",
    },
    {
      quote: "The real-time tracking feature gives us complete visibility of our shipments. It's a game-changer for our just-in-time manufacturing process.",
      author: "Robert Johnson",
      role: "Operations Head, Precision Manufacturing",
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Customers Say</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600">
            Trusted by businesses across the country
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <svg className="w-10 h-10 text-blue-600 opacity-30 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z"></path>
              </svg>
              <p className="text-gray-600 mb-4 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
