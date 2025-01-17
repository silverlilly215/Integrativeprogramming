import React, { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';

function StudentAssistance() {
  // Step management
  const [step, setStep] = useState(1);

  // Form data
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [assistanceType, setAssistanceType] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [reasonForAssistance, setReasonForAssistance] = useState('');

  // Handle Next button click
  const handleNext = () => {
    if (step === 1) {
      if (!studentName || !studentAge || !assistanceType) {
        alert('Please fill in all fields.');
        return;
      }
    }

    if (step === 2) {
      if (!academicYear) {
        alert('Please select an academic year.');
        return;
      }
    }

    setStep(step + 1);
  };

  // Handle Previous button click
  const handlePrev = () => {
    setStep(step - 1);
  };

  // Final submit
  const handleSubmit = () => {
    if (!schoolName || !reasonForAssistance) {
      alert('Please provide all required information.');
      return;
    }

    const formData = {
      studentName,
      studentAge,
      assistanceType,
      academicYear,
      schoolName,
      reasonForAssistance,
    };

    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="font-sans bg-[#f3f3f3]">
      <Navbar />
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-800 mt-10">
          Augustinian Sisters of Our Lady of Consolation
        </h2>

        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
          <header className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-blue-700">
              Student Assistance Form (Step {step})
            </h3>
            <p className="text-gray-600">
              Please provide accurate details to apply for student assistance.
            </p>
          </header>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Age</label>
                  <input
                    type="number"
                    name="studentAge"
                    placeholder="Enter age"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={studentAge}
                    onChange={(e) => setStudentAge(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Type of Assistance</label>
                  <select
                    name="assistanceType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={assistanceType}
                    onChange={(e) => setAssistanceType(e.target.value)}
                    required
                  >
                    <option value="">Select assistance type</option>
                    <option value="financial">Financial</option>
                    <option value="academic">Academic</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Academic Year</label>
                <select
                  name="academicYear"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  required
                >
                  <option value="">Select academic year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: School Info */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">School Name</label>
                <input
                  type="text"
                  name="schoolName"
                  placeholder="Enter school name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Reason for Assistance</label>
                <textarea
                  name="reasonForAssistance"
                  placeholder="Enter reason for assistance"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  value={reasonForAssistance}
                  onChange={(e) => setReasonForAssistance(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
          )}

          {/* Navigation buttons with Previous on the left side and Next/Submit on the right */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 bg-gray-400 text-white rounded-md font-semibold hover:bg-gray-500 transition duration-200"
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
                type="button"
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

export default StudentAssistance;