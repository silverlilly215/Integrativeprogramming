import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';

function NavBar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('User ID:', storedUser ? storedUser.id : 'No user data');
    if (storedUser) {
      setUser(storedUser);  // Store the user data in state
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setUser(null); // Clear user state
    setDropdownOpen(false); // Close dropdown on logout
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
            to="/StudentLanding"
            className="text-gray-600 hover:text-blue-800 font-medium transition duration-200"
          >
            Scholarships
          </Link>

            {/* Scholarships Link */}
            <Link
            to="/viewapplications"
            className="text-gray-600 hover:text-blue-800 font-medium transition duration-200"
          >
            View Applications 
          </Link>

          {/* User Dropdown Menu */}
          <div className="relative">
            {/* Dropdown Trigger */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-800 font-medium transition duration-200 focus:outline-none"
            >
              <FaUserCircle size={24} />
              {user && <span>Welcome, {user.first_name}</span>} {/* Display user's first name */}
              <FaCaretDown size={18} />
            </button>

            {/* Dropdown Content */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-20">
                <Link
                  to="/"
                  onClick={handleLogout}
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

export default NavBar;
