import React from "react";
import { asset } from "../../assets/asser";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-t from-black via-gray-900 to-gray-800 text-white border-t border-gray-700 relative">
      <div className="px-5 md:px-10 lg:px-40 py-8 flex flex-col md:flex-row gap-8 md:gap-2 lg:gap-8 justify-between font-IBM relative">
        <div className="flex flex-col items-start max-w-xs">
          <img loading="lazy" className="w-44 mb-4 rounded-xl shadow-lg" src={asset.logo} alt="logo" />
          <p className="text-xl font-bold mb-1">CarSetGo - Drive Your Dream!</p>
          <p className="text-base text-gray-300 mb-3">Find your next ride today with confidence and style. Trusted by thousands of happy drivers.</p>
          <span className="inline-block bg-yellow-400 text-black font-semibold px-4 py-1 rounded-full text-xs shadow mt-2">#1 Car Marketplace</span>
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Quick Links</h2>
          <ul className="flex flex-col pl-1">
            <Link to="/" className="font-medium mb-2 hover:text-yellow-400 transition-colors">- Home</Link>
            <Link to="/about" className="font-medium mb-2 hover:text-yellow-400 transition-colors">- About Us</Link>
            <Link to="/help" className="font-medium mb-2 hover:text-yellow-400 transition-colors">- Help Center</Link>
            <Link to="/privacy-policy" className="font-medium mb-2 hover:text-yellow-400 transition-colors">- Privacy Policy</Link>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <div className="flex items-center gap-3 ml-1 mb-3 mt-2">
            <Phone size={20} strokeWidth={1} absoluteStrokeWidth aria-label="Phone" />
            <a href="tel:+88018640xxxx" className="font-medium text-gray-300 hover:text-yellow-400 transition-colors">+88018640xxxx</a>
          </div>
          <div className="flex items-center gap-3 ml-1 mb-3">
            <Mail size={20} color="#fff" strokeWidth={1} absoluteStrokeWidth aria-label="Email" />
            <a href="mailto:umayerhossain.dev.174@gmail.com" className="font-medium text-gray-300 hover:text-yellow-400 transition-colors">
              umayerhossain.dev.174@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 ml-1 mb-3">
            <MapPin size={20} strokeWidth={1} absoluteStrokeWidth aria-label="Location" />
            <span className="font-medium text-gray-300">Bangladesh</span>
          </div>

          <div className="flex items-center gap-4 ml-1 mt-4">
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-500 transition-colors">
              <Facebook />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400 transition-colors">
              <Instagram />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-500 transition-colors">
              <Youtube />
            </a>
          </div>
        </div>

        {/* Divider for large screens */}
        <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gray-800 opacity-30" style={{transform: 'translateX(-50%)'}}></div>
      </div>
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute right-6 bottom-16 md:bottom-8 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg font-semibold text-sm transition-colors duration-200 z-20"
        aria-label="Back to Top"
      >
        ↑ Back to Top
      </button>
      <p className="py-3 border-t border-gray-700 text-center text-gray-400 text-sm tracking-wide bg-black/40">&copy; 2025 <span className="font-bold text-white">CarSetGo</span>. All rights reserved.</p>
    </div>
  );
};

export default Footer;
