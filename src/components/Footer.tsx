
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Samptel Transport</h3>
            <p className="mb-4 text-sm">
              Your reliable partner for all logistics and transportation needs across the nation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vehicle Types</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Full Truckload</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Part Truckload</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Express Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">International Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Specialized Transport</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-logistics-lightBlue flex-shrink-0 mt-1" />
                <p>123 Transport Street, Logistics Park, Business District, 10001</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-logistics-lightBlue" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-logistics-lightBlue" />
                <p>info@samptel.transport</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Samptel Transport Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
