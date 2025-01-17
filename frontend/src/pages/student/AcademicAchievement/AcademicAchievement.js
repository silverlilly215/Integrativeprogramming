import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

function AcademicAchievement() {
  const [step, setStep] = useState(1); // Step management
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    yearLevel: "",
    contact_number: "",
    documents: null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      documents: files,
    }));
  };

  // Handle Next button click
  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.course) {
        alert("Please fill in all fields.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.yearLevel || !formData.contact_number) {
        alert("Please fill in all fields.");
        return;
      }
    }

    // Move to the next step
    setStep(step + 1);
  };

  // Handle Previous button click
  const handlePrev = () => {
    setStep(step - 1);
  };

  // Final submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.documents.length === 0) {
      alert('Please upload the required documents.');
      return;
    }

    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('course', formData.course);
    submissionData.append('yearLevel', formData.yearLevel);
    submissionData.append('contact_number', formData.contact_number);

    // Append all files to FormData
    Array.from(formData.documents).forEach((file) => {
      submissionData.append('documents', file);
    });

    fetch('http://localhost:5000/api/academic/submit', {
      method: 'POST',
      body: submissionData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        alert('Success: Your submission was successful!'); // Success alert
        // Reset form after successful submission
        setFormData({
          name: "",
          course: "",
          yearLevel: "",
          contact_number: "",
          documents: null,
        });
        setStep(1); // Reset to the first step
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Something went wrong: ' + error.message);
      });
  };

  return (
    <div className="font-sans bg-[#f3f3f3]">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-800 mt-10">
          Augustinian Sisters of Our Lady of Consolation
        </h2>

        {/* Step-by-step Form */}
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Academic Achievement Scholarship
          </h2>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="form-group">
                <label className="block text-gray-700 font-medium">Name of Applicant:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium">Course:</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          {/* Step 2: Year Level and Contact Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="form-group">
                <label className="block text-gray-700 font-medium">Year Level:</label>
                <input
                  type="text"
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium">Contact Number:</label>
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          {/* Step 3: Document Upload */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="form-group">
                <label className="block text-gray-700 font-medium">Upload Required Documents:</label>
                <input
                  type="file"
                  name="documents"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  multiple
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-200"
              >
                Previous
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AcademicAchievement;
