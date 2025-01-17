import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from "../../../components/Navbar/Navbar";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Contact from "../../../components/Contact/Contact";
import { Link } from "react-router-dom";
import axios from "axios";

// Collapsible Item for each scholarship
// Collapsible Item for each scholarship
function CollapsibleItem({ description, status }) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert status to lowercase to handle case insensitivity
  const normalizedStatus = status ? status.toLowerCase() : "";

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-blue-50 px-4 py-2 text-blue-800 font-medium rounded-md hover:bg-blue-100"
      >
        <div className="flex items-center">
          {/* Displaying a static scholarship name "ASOLC Scholarship" */}
          <span className="font-semibold">ASOLC Scholarship</span>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-sm ${
              normalizedStatus === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : normalizedStatus === "approved"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>
        <RiArrowDropDownLine className={isOpen ? "rotate-180 transform" : ""} />
      </button>
      {isOpen && (
        <div className="mt-2 px-6 py-2 bg-gray-50 rounded-md text-gray-700">
          {description}
        </div>
      )}
    </div>
  );
}


// Collapsible Section for the scholarships categories
function CollapsibleSection({ title, items }) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold text-blue-800 mb-2">{title}</h3>
      {items.map((item, index) => (
        <CollapsibleItem
          key={index}
          title={item.title}
          description={item.description}
          status={item.status}
        />
      ))}
    </div>
  );
}

function ViewApplications() {
  const [applications, setApplications] = useState([]);

  // Retrieve the 'user' object from localStorage and extract the userId
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    if (!userId) {
      console.error("No userId found. Skipping API call.");
      return;
    }
  
    console.log("Fetching applications for userId:", userId); // Log the userId
  
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/applications/${userId}`);
        console.log(response.data);  // Log the response to verify data structure
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error.response ? error.response.data : error.message);
      }
    };
  
    fetchApplications();
  }, [userId]);
  
  
  

  return (
    <div className="font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <Header />

      {/* Scholarships Section */}
      <section id="scholarships" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            View Applications
          </h2>
          <p className="text-gray-700 text-center mb-6">
            View your scholarships applied.
          </p>

          <div>
            <CollapsibleSection title="Your Applications" items={applications} />
          </div>
        </div>
      </section>

     

      <Contact />
      <Footer />
    </div>
  );
}

export default ViewApplications;
