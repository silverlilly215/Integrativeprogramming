import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

function LoyaltyDiscount() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentNumber: "",
    dateOfBirth: "",
    contactNumber: "",
    emailAddress: "",
    currentAddress: "",
    applyingFor: "", // 'grade11' or 'college'
    graduatedFrom: "", // 'lccb' or 'asas'
    schoolName: "", // Name of the school if "graduatedFrom" is not LCCB
    yearsStudied: "", // Years studied in LCCB/ASAS
    certificateOfResidence: false, // For ASAS graduates
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateDiscount = () => {
    if (formData.applyingFor === "grade11") {
      if (formData.yearsStudied === "g1to10") return 20;
      if (formData.yearsStudied === "g7to10") return 10;
    } else if (formData.applyingFor === "college") {
      if (formData.yearsStudied === "k12") return 40;
      if (formData.yearsStudied === "g7to10") return 20;
      if (formData.yearsStudied === "shs") return 10;
    }
    return 0;
  };

  const discount = calculateDiscount();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form Submitted:", formData);
    alert("Form Submitted! Check console for data.");
  };

  return (
    <div className="font-sans bg-[#f3f3f3]">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-800 mt-10">
          Loyalty Discount Application
        </h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
          <h3>Applicant Information</h3>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4" />
          <input type="text" name="studentNumber" placeholder="Student Number" value={formData.studentNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4" />
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"/>
          <input type="tel" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"/>
          <input type="email" name="emailAddress" placeholder="Email Address" value={formData.emailAddress} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"/>
          <textarea name="currentAddress" placeholder="Current Address" value={formData.currentAddress} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"/>

          <h3>Academic Background</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Applying For:</label>
            <select name="applyingFor" value={formData.applyingFor} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">Select</option>
              <option value="grade11">Grade 11</option>
              <option value="college">1st Year College</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">School Graduated From:</label>
            <select name="graduatedFrom" value={formData.graduatedFrom} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">Select</option>
              <option value="lccb">LCC Bacolod</option>
              <option value="asas">ASAS Sister School</option>
            </select>
            {formData.graduatedFrom === "asas" && (
              <input type="text" name="schoolName" placeholder="Specify ASAS School Name" value={formData.schoolName} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2"/>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Years Studied in LCCB/ASAS Sister School:</label>
            <select name="yearsStudied" value={formData.yearsStudied} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">Select</option>
              {formData.applyingFor === "grade11" && (
                <>
                  <option value="g1to10">Grade 1 to Grade 10</option>
                  <option value="g7to10">Grade 7 to Grade 10</option>
                </>
              )}
              {formData.applyingFor === "college" && (
                <>
                  <option value="k12">K-12 (Kindergarten to Grade 12)</option>
                  <option value="g7to10">Grade 7 to Grade 10</option>
                  <option value="shs">Senior High School (Grades 11-12)</option>
                </>
              )}
            </select>
          </div>

          <h3>Discount Eligibility</h3>
          <p>Eligible Discount: {discount}% Tuition Fee Discount</p>

          <h3>Requirements Checklist</h3>
          <label className="inline-flex items-center mb-2">
            <input type="checkbox" disabled checked className="form-checkbox h-5 w-5 text-blue-600 mr-2"/>
            <span>Accomplished Application Form</span>
          </label><br/>
          {formData.graduatedFrom === "asas" && (
            <label className="inline-flex items-center">
              <input type="checkbox" name="certificateOfResidence" onChange={handleChange} required className="form-checkbox h-5 w-5 text-blue-600 mr-2"/>
              <span>Certificate of Residence</span>
            </label>
          )}

          <h3>Certification</h3>
          <p>I certify that the information provided is true and accurate.</p>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200 mt-4">Submit Application</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default LoyaltyDiscount;