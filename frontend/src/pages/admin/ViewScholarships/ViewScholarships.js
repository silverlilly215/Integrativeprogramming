import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import AdminNavbar from '../../../components/Navbar/AdminNavbar';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Contact from '../../../components/Contact/Contact';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

// Collapsible Item for each scholarship
function CollapsibleItem({ title, description }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-blue-50 px-4 py-2 text-blue-800 font-medium rounded-md hover:bg-blue-100"
      >
        {title}
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
        <CollapsibleItem key={index} title={item.title} description={item.description} />
      ))}
    </div>
  );
}

function ViewScholarships() {
  const [asolcScholarship, setAsolcScholarship] = useState(null); // State for ASOLC Scholarship data
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    // Fetch the ASOLC Scholarship data when the component mounts
    const fetchScholarshipData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/asolc-scholarship');
 // Adjust the API endpoint as needed
        setAsolcScholarship(response.data);
      } catch (err) {
        setError('Failed to fetch ASOLC Scholarship data');
      }
    };

    fetchScholarshipData();
  }, []);

  // Check if data is available before rendering the scholarship
  const institutionalScholarships = [
    {
      title: "ASOLC Scholarship",
      description: asolcScholarship && asolcScholarship.length > 0 ? (
        <div>
          <p>Name of August Sister: {asolcScholarship[0].name_of_august_sister}</p>
          <p>Student Name: {`${asolcScholarship[0].first_name} ${asolcScholarship[0].middle_name} ${asolcScholarship[0].last_name}`}</p>
          <p>Relationship: {asolcScholarship[0].relationship}</p>
          <p>Date of Birth: {asolcScholarship[0].dob}</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      ),
    },

    {
      title: "Siblings Privilege for Integrated School",
      description: asolcScholarship && asolcScholarship.length > 0 ? (
        <div>
          {/* <p>Name of August Sister: {asolcScholarship[0].name_of_august_sister}</p>
          <p>Student Name: {`${asolcScholarship[0].first_name} ${asolcScholarship[0].middle_name} ${asolcScholarship[0].last_name}`}</p>
          <p>Relationship: {asolcScholarship[0].relationship}</p>
          <p>Date of Birth: {asolcScholarship[0].dob}</p> */}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      ),
    },

    {
      title: "Academic Achievement",
      description: asolcScholarship && asolcScholarship.length > 0 ? (
        <div>
          {/* <p>Name of August Sister: {asolcScholarship[0].name_of_august_sister}</p>
          <p>Student Name: {`${asolcScholarship[0].first_name} ${asolcScholarship[0].middle_name} ${asolcScholarship[0].last_name}`}</p>
          <p>Relationship: {asolcScholarship[0].relationship}</p>
          <p>Date of Birth: {asolcScholarship[0].dob}</p> */}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      ),
    },

    {
      title: "Loyalty Discount",
      description: asolcScholarship && asolcScholarship.length > 0 ? (
        <div>
          {/* <p>Name of August Sister: {asolcScholarship[0].name_of_august_sister}</p>
          <p>Student Name: {`${asolcScholarship[0].first_name} ${asolcScholarship[0].middle_name} ${asolcScholarship[0].last_name}`}</p>
          <p>Relationship: {asolcScholarship[0].relationship}</p>
          <p>Date of Birth: {asolcScholarship[0].dob}</p> */}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      ),
    },

    {
      title: "Student Assistant Scholarship",
      description: asolcScholarship && asolcScholarship.length > 0 ? (
        <div>
          {/* <p>Name of August Sister: {asolcScholarship[0].name_of_august_sister}</p>
          <p>Student Name: {`${asolcScholarship[0].first_name} ${asolcScholarship[0].middle_name} ${asolcScholarship[0].last_name}`}</p>
          <p>Relationship: {asolcScholarship[0].relationship}</p>
          <p>Date of Birth: {asolcScholarship[0].dob}</p> */}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      ),
    },

    {
      title: "Sr. Cecilia Maceren, OSA Scholarship (LCCB Chorale)",
      description: asolcScholarship && asolcScholarship.length > 0 ? (
        <div>
          {/* <p>Name of August Sister: {asolcScholarship[0].name_of_august_sister}</p>
          <p>Student Name: {`${asolcScholarship[0].first_name} ${asolcScholarship[0].middle_name} ${asolcScholarship[0].last_name}`}</p>
          <p>Relationship: {asolcScholarship[0].relationship}</p>
          <p>Date of Birth: {asolcScholarship[0].dob}</p> */}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      ),
    },

    {
      title: "Blue Panthers / Basketball Varsity Scholarship",
      description: asolcScholarship && asolcScholarship.length > 0 ? (
        <div>
          {/* <p>Name of August Sister: {asolcScholarship[0].name_of_august_sister}</p>
          <p>Student Name: {`${asolcScholarship[0].first_name} ${asolcScholarship[0].middle_name} ${asolcScholarship[0].last_name}`}</p>
          <p>Relationship: {asolcScholarship[0].relationship}</p>
          <p>Date of Birth: {asolcScholarship[0].dob}</p> */}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      ),
    },
  ];
  

  return (
    <div className="font-sans">
      {/* Navbar */}
      <AdminNavbar />

      {/* Header with added margin-top */}
      <Header />

      {/* Scholarships Section */}
      <section id="scholarships" className="bg-white py-16 ]">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
            Scholarships Offered
          </h2>
          <p className="text-gray-700 text-center mb-6">
            Explore various scholarships available for students at La Consolacion College Bacolod.
          </p>

          <div>
            <CollapsibleSection
              title="Institutional Scholarships"
              items={institutionalScholarships}
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="mission" className="bg-blue-50 py-16 h-[45vh]">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Vision & Mission</h2>
          <p className="text-gray-700 text-center mb-6">
            We are a Christ-centered, Augustinian, and Marian educational community dedicated to creating a more sustainable world.
          </p>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800">Our Commitment</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Accessible, relevant, and advanced curricular programs that promote life-long learning towards fulfilling careers.</li>
              <li>Empowering and enriching avenues to conduct responsive research to push the frontiers of new knowledge.</li>
              <li>Meaningful experiences of the universal compassion of Christ through services and programs with the last, the least, and the lost.</li>
            </ul>
          </div>
        </div>
      </section>
      
      <Contact />
      <Footer /> 
    </div>
  );
}

export default ViewScholarships;
