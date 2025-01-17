import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';
function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Contact Us Section */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span>+63 (34) 434 9661 to 64</span>
              </li>
              <li className="flex items-center gap-2">
                <span>Corner Galo-Gatuslao Streets Bacolod City</span>
              </li>
              <li className="flex items-center gap-2">
                <span>6100, Negros Occidental Philippines</span>
              </li>
              <li className="flex items-center gap-2">
                <a href="mailto:lccbpresident@lccbonline.edu.ph" className="hover:text-blue-300">
                  lccbpresident@lccbonline.edu.ph
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
      <h3 className="font-semibold mb-4">Follow Us</h3>
      <div className="flex gap-4">
        <a href="#" className="-600 p-2 rounded-lg ">
          <span className="sr-only">Facebook</span>
          <FaFacebookF className="text-white" />
        </a>
        <a href="#" className="p-2 rounded-lg ">
          <span className="sr-only">Instagram</span>
          <FaInstagram className="text-white" />
        </a>
        <a href="#" className=" p-2 rounded-lg">
          <span className="sr-only">YouTube</span>
          <FaYoutube className="text-white" />
        </a>
        <a href="#" className=" p-2 rounded-lg ">
          <span className="sr-only">Maps</span>
          <FaMapMarkerAlt className="text-white" />
        </a>
      </div>
    </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 text-center">
                School Automate
              </a>
              <a href="#" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 text-center">
                Help Desk
              </a>
              <a href="#" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 text-center">
                Library Access
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-white-800">
          <p>Copyright © 2024 La Consolacion College Bacolod | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;