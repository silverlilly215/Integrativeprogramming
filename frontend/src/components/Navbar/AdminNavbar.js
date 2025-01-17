import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'; 

function AdminNavBar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const location = useLocation();  // Get current location (route)

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to check if the current path matches the link
  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'text-blue-800 font-medium glow-effect'  // Add a class for glowing effect
      : 'text-gray-600 hover:text-blue-800 font-medium';
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src="/lccblogo.jpg"
            alt="Logo"
            className="h-10"
          />
          <h1 className="text-lg font-bold text-blue-800">
            La Consolacion College Bacolod
          </h1>
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center space-x-6">
          {/* Scholarships Link */}
          <Link
            to="/manageaccount"
            className={getLinkClass('/manageaccount')} // Add dynamic class
          >
            Manage Accounts
          </Link>

          <Link
            to="/manageapplications"
            className={getLinkClass('/manageapplications')} // Add dynamic class
          >
            Manage Applications
          </Link>

          <Link
            to="/viewscholarships"
            className={getLinkClass('/viewscholarships')} // Add dynamic class
          >
            View Scholarships
          </Link>

          {/* User Dropdown Menu */}
          <div className="relative">
            {/* Dropdown Trigger */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-800 font-medium transition duration-200 focus:outline-none"
            >
              <FaUserCircle size={24} />
              {user && <span>Welcome, {user.first_name}</span>}
              <FaCaretDown size={18} />
            </button>

            {/* Dropdown Content */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-20">
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem('user'); // Remove user data from localStorage on logout
                    setDropdownOpen(false); // Close dropdown on logout
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition duration-200"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavBar;
