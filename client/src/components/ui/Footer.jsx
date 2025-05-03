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
    <div className="w-full md:h-72 lg:h-72 shadow bg-black text-white">
      <div className="  px-5 md:px-10 lg:px-40 py-5 flex flex-col md:flex-row lg:flex-row gap-5 md:gap-2 lg:gap-5   justify-between font-IBM">
        <div>
          <img loading="lazy" className="w-52 mb-5" src={asset.logo} alt="logo" />
          <p className="text-lg font-medium">CarSetGo - Drive Your Dream!</p>
          <p className="text-lg font-medium">Find your next ride today.</p>
        </div>

        <div>
          <h2 className="text-2xl font-medium">Quick Links</h2>
          <ul className="flex flex-col pl-4">
            <Link className="font-medium mb-2">- Home</Link>
            <Link className="font-medium mb-2">- About Us</Link>
            <Link className="font-medium mb-2">- Help Center </Link>
            <Link className="font-medium mb-2">- Privacy Policy</Link>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-medium">Quick Links</h2>
          <ul className="flex flex-col pl-4">
            <Link className="font-medium mb-2">- Home</Link>
            <Link className="font-medium mb-2">- About Us</Link>
            <Link className="font-medium mb-2">- Help Center </Link>
            <Link className="font-medium mb-2">- Privacy Policy</Link>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-medium">Contact</h2>
          <div className="flex items-center gap-3 ml-3 mb-5 mt-2">
            <Phone size={20} strokeWidth={1} absoluteStrokeWidth />
            <p className="font-medium text-gray-700">Phone: +88018640****</p>
          </div>
          <div className="flex items-center gap-3 ml-3 mb-5">
            <Mail size={20} color="#000" strokeWidth={1} absoluteStrokeWidth />
            <p className="font-medium text-gray-700">
              Email: umayerhossain.dev.174@gmail.com
            </p>
          </div>
          <div className="flex items-center gap-3 ml-3 mb-5">
            <MapPin size={20} strokeWidth={1} absoluteStrokeWidth />
            <p className="font-medium text-gray-700">Location: Bangladesh</p>
          </div>

          <div className="flex items-center gap-3 ">
            <Facebook />
            <Instagram />
            <Youtube />
          </div>
        </div>
      </div>
      <p className="py-2 border-t text-center">&copy; 2025 CarSetGo. All rights reserved.</p>
    </div>
  );
};

export default Footer;
