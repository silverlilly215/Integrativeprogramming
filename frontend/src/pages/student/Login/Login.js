import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web'; // Import react-spring

function Login() {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  // Spring animation for the error message (fade-in and fade-out)
  const errorAnimation = useSpring({
    opacity: errorMessage ? 1 : 0, // Show error message when present, else hide it
    transform: errorMessage ? 'translateY(0px)' : 'translateY(-20px)', // Slide up effect
    config: { tension: 200, friction: 20 },
    onRest: () => {
      if (!errorMessage) {
        setTimeout(() => setErrorMessage(''), 300); // Hide the error message after a delay
      }
    },
  });

  // Check localStorage for saved credentials on component mount
  useEffect(() => {
    const storedCredentials = JSON.parse(localStorage.getItem('rememberMe'));
    if (storedCredentials) {
      setIdNumber(storedCredentials.idNumber);
      setPassword(storedCredentials.password);
      setRememberMe(true);
    }
  }, []);

  // Define spring animation for the form and other elements
  const formAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(-50px)' },
    config: { tension: 200, friction: 20 },
  });

  // Define spring animation for page transition (if needed)
  const pageTransition = useSpring({
    opacity: isLoggedIn ? 0 : 1,
    transform: isLoggedIn ? 'translateY(50px)' : 'translateY(0px)',
    config: { tension: 200, friction: 30 },
    onRest: () => {
      if (isLoggedIn) {
        // Navigate after the transition ends
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const role = localStorage.getItem('role');
        if (role === 'admin') {
          navigate('/viewscholarships');
        } else {
          navigate('/StudentLanding');
        }
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!idNumber || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }
  
    try {
      // Send login credentials to the backend
      const response = await axios.post('http://localhost:5000/api/login', {
        idNumber,
        password,
      });
  
      const { role, user } = response.data;
  
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);
  
      // Set logged in status to trigger page transition animation
      setIsLoggedIn(true);
  
      // Store credentials if Remember Me is checked
      if (rememberMe) {
        localStorage.setItem('rememberMe', JSON.stringify({ idNumber, password }));
      } else {
        localStorage.removeItem('rememberMe');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <animated.div style={pageTransition} className="min-h-screen flex bg-gray-50">
      {/* Left side with image */}
      <div className="hidden lg:flex lg:w-1/2 bg-white">
        <img 
          src="/lccbg.jpg" // Replace with your image path
          alt="Platform illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <animated.div style={formAnimation} className="w-full max-w-md">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-500 mb-8">
            Welcome to LCCB Scholarship Management System.<br />
            Please login to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                ID Number
              </label>
              <input
                type="text"
                id="idNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-500">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>

            <div className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-600">
                Register
              </Link>
            </div>
          </form>

          {/* Animated Error Alert Box */}
          {errorMessage && (
            <animated.div style={errorAnimation} className="mt-4 p-4 bg-red-100 text-red-700 rounded-md shadow-md text-center">
              <strong>Error:</strong> {errorMessage}
            </animated.div>
          )}
        </animated.div>
      </div>
    </animated.div>
  );
}

export default Login;
