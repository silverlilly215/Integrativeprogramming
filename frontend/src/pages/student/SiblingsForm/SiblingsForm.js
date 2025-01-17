import React, { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';

function SiblingsForm() {
  // Step management
  const [step, setStep] = useState(1);

  // Form data
  const [siblingName, setSiblingName] = useState('');
  const [siblingAge, setSiblingAge] = useState('');
  const [relationship, setRelationship] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');

  // Handle Next button click
  const handleNext = () => {
    if (step === 1) {
      if (!siblingName || !siblingAge || !relationship) {
        alert('Please fill in all fields.');
        return;
      }
    }

    if (step === 2) {
      if (!educationLevel) {
        alert('Please select an educational level.');
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
  const handleSubmit = async () => {
    if (!schoolName || !schoolAddress) {
      alert('Please provide both school name and address.');
      return;
    }
  
    const formData = {
      siblingName,
      siblingAge,
      relationship,
      educationLevel,
      schoolName,
      schoolAddress,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/siblings/add-sibling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Form submitted successfully!');
        console.log(data);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
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
              Sibling Information (Step {step})
            </h3>
            <p className="text-gray-600">
              Please provide accurate details about siblings for evaluation purposes.
            </p>
          </header>

          {/* Step 1: Sibling Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name of Sibling</label>
                <input
                  type="text"
                  name="siblingName"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={siblingName}
                  onChange={(e) => setSiblingName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Age</label>
                  <input
                    type="number"
                    name="siblingAge"
                    placeholder="Enter age"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={siblingAge}
                    onChange={(e) => setSiblingAge(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Relationship</label>
                  <select
                    name="relationship"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Educational Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Educational Level</label>
                <select
                  name="educationLevel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  required
                >
                  <option value="">Select educational level</option>
                  <option value="elementary">Elementary</option>
                  <option value="secondary">Secondary</option>
                  <option value="college">College</option>
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
                <label className="block text-gray-700 font-semibold mb-2">School Address</label>
                <textarea
                  name="schoolAddress"
                  placeholder="Enter school address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  value={schoolAddress}
                  onChange={(e) => setSchoolAddress(e.target.value)}
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

export default SiblingsForm;