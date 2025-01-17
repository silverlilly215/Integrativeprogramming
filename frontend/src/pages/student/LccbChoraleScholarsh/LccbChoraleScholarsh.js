import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

function LccbChoraleScholarship() {
  const [step, setStep] = useState(0); // Step management (0 is for video upload)
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    yearLevel: "",
    contact: "",
    experience: "",
    video: null, // Add video field for the audition video
    documents: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0], // Save the file for either the video or the documents
    }));
  };

  const handleNext = () => {
    if (step === 0) {
      if (!formData.video) {
        alert("Please upload your audition video to proceed.");
        return;
      }
      setStep(1); // Move to next step after video upload
    } else {
      // Continue with form steps as usual
      if (step === 1) {
        if (!formData.name || !formData.course) {
          alert("Please fill in all fields.");
          return;
        }
      }

      if (step === 2) {
        if (!formData.yearLevel || !formData.contact) {
          alert("Please fill in all fields.");
          return;
        }
      }

      if (step === 3) {
        if (!formData.experience) {
          alert("Please provide your musical experience.");
          return;
        }
      }

      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.documents) {
      alert("Please upload the required documents.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("course", formData.course);
    submissionData.append("yearLevel", formData.yearLevel);
    submissionData.append("contact", formData.contact);
    submissionData.append("experience", formData.experience);
    if (formData.video) {
      submissionData.append("video", formData.video);
    }
    if (formData.documents) {
      submissionData.append("documents", formData.documents);
    }

    console.log("Form Submitted:", formData);
  };

  return (
    <div className="font-sans bg-[#f3f3f3]">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-800 mt-10">
          LCCB Chorale Scholarship
        </h2>

        {/* Step 0: Video Upload */}
        {step === 0 && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Upload Your Audition Video
            </h2>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Upload Video:</label>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            {formData.video && (
              <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold">Preview Video:</h3>
                <video width="100%" controls>
                  <source src={URL.createObjectURL(formData.video)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step-by-step Form */}
        {step > 0 && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              LCCB Chorale Scholarship Application
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
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Musical Experience and Document Upload */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="form-group">
                  <label className="block text-gray-700 font-medium">Musical Experience:</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Please describe your musical background and experience."
                  />
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 font-medium">Upload Required Documents:</label>
                  <input
                    type="file"
                    name="documents"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
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
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LccbChoraleScholarship;