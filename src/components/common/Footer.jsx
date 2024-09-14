import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Press
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Returns
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="mb-4">
            Sign up for exclusive offers, updates, and more.
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; 2024 YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
