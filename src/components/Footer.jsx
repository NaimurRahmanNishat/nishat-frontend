import React from "react";
import { Link } from "react-router-dom";

import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">CONTACT INFO</h4>
          <p className="flex items-center gap-2">
            <i className="ri-map-pin-2-fill"></i>
            123, London Bridge Street, London
          </p>
          <p className="flex items-center gap-2">
            <i className="ri-mail-fill"></i>
            support@nrn.com
          </p>
          <p className="flex items-center gap-2">
            <i className="ri-phone-fill"></i>
            (+012) 3456 789
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">COMPANY</h4>
          <div className="flex flex-col space-y-2">
            <Link to="#" className="hover:text-gray-400">Home</Link>
            <Link to="#" className="hover:text-gray-400">About Us</Link>
            <Link to="#" className="hover:text-gray-400">Work With Us</Link>
            <Link to="#" className="hover:text-gray-400">Our Blog</Link>
            <Link to="#" className="hover:text-gray-400">Terms & Conditions</Link>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">USEFUL LINKS</h4>
          <div className="flex flex-col space-y-2">
            <Link to="#" className="hover:text-gray-400">Help</Link>
            <Link to="#" className="hover:text-gray-400">Track My Order</Link>
            <Link to="#" className="hover:text-gray-400">Mobile</Link>
            <Link to="#" className="hover:text-gray-400">Laptop</Link>
            <Link to="#" className="hover:text-gray-400">Monitor</Link>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">INSTAGRAM</h4>
          <div className="grid grid-cols-3 gap-2">
            <img src={instaImg1} alt="instagram" className="w-full h-auto rounded" />
            <img src={instaImg2} alt="instagram" className="w-full h-auto rounded" />
            <img src={instaImg3} alt="instagram" className="w-full h-auto rounded" />
            <img src={instaImg4} alt="instagram" className="w-full h-auto rounded" />
            <img src={instaImg5} alt="instagram" className="w-full h-auto rounded" />
            <img src={instaImg6} alt="instagram" className="w-full h-auto rounded" />
          </div>
        </div>
      </div>
      <div className="text-center mt-10 border-t border-gray-700 pt-4">
        Copyright © 2025 Web Design Mastery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

