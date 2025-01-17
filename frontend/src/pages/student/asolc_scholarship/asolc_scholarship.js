import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AsolcForms() {
  const [formData, setFormData] = useState({
    nameOfAugustSister: '',
    firstName: '',
    middleName: '',
    lastName: '',
    relationship: '',
    degree: {
      first: false,
      second: false,
      third: false,
    },
    dob: '',
    fathersName: '',
    mothersName: '',
    address: '',
    schoolLastAttended: '',
    asasSchoolAppliedFor: '',
    schoolAddress: '',
    levelOfEducation: {
      elementary: false,
      secondary: false,
      college: false,
    },
    gradeLevelElementary: '',
    gradeLevelSecondary: '',
    courseYearCollege: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      axios
        .get(`http://localhost:5000/api/asolcform/user/${storedUser.id}`)
        .then((response) => {
          console.log("Fetched user data:", response.data);
          setUser(response.data);
          setFormData((prev) => ({
            ...prev,
            firstName: response.data.first_name || '',
            middleName: response.data.middle_name || '',
            lastName: response.data.last_name || '',
          }));
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.dob) errors.dob = 'Date of Birth is required';
    if (!formData.relationship) errors.relationship = 'Relationship is required';
    if (!formData.fathersName) errors.fathersName = 'Father\'s name is required';
    if (!formData.mothersName) errors.mothersName = 'Mother\'s name is required';
    if (!formData.schoolAddress) errors.schoolAddress = 'School address is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.schoolLastAttended) errors.schoolLastAttended = 'School last attended is required';
    if (!formData.asasSchoolAppliedFor) errors.asasSchoolAppliedFor = 'School applied for is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name.startsWith('degree.')) {
        const degreeType = name.split('.')[1];
        setFormData((prev) => ({
          ...prev,
          degree: {
            ...prev.degree,
            [degreeType]: checked,
          },
        }));
      } else if (name.startsWith('levelOfEducation.')) {
        const level = name.split('.')[1];
        setFormData((prev) => ({
          ...prev,
          levelOfEducation: {
            ...prev.levelOfEducation,
            [level]: checked,
          },
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.id) {
      console.error('User is not logged in or user ID is missing.');
      toast.error('User is not logged in. Please log in and try again.');
      return;
    }
  
    const userId = storedUser.id;
    console.log('User ID:', userId);
  
    const formattedData = {
      ...formData,
      registration_id: userId,
      degree: JSON.stringify(formData.degree || {}),
      levelOfEducation: JSON.stringify(formData.levelOfEducation || {}),
    };
  
    console.log('Submitting data:', formattedData);
  
    try {
      const response = await axios.post('http://localhost:5000/api/asolcform/submit', formattedData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      toast.success(response.data.message); // Success toast notification
      setFormData({
        nameOfAugustSister: '',
        firstName: '',
        middleName: '',
        lastName: '',
        relationship: '',
        degree: { first: false, second: false, third: false },
        dob: '',
        fathersName: '',
        mothersName: '',
        address: '',
        schoolLastAttended: '',
        asasSchoolAppliedFor: '',
        schoolAddress: '',
        levelOfEducation: { elementary: false, secondary: false, college: false },
        gradeLevelElementary: '',
        gradeLevelSecondary: '',
        courseYearCollege: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
  
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`); // Error toast notification
      } else {
        toast.error('Failed to submit your application. Please try again later.');
      }
    }
  };
  

  const nextStep = () => {
    const stepValid = validateStep(currentStep); // Validate current step
    if (stepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.nameOfAugustSister) errors.nameOfAugustSister = 'This field is required';
      if (!formData.firstName) errors.firstName = 'First name is required';
      if (!formData.lastName) errors.lastName = 'Last name is required';
      if (!formData.relationship) errors.relationship = 'Relationship is required';
      if (!formData.dob) errors.dob = 'Date of Birth is required';
    }

    if (step === 2) {
      if (!formData.fathersName) errors.fathersName = "Father's name is required";
      if (!formData.mothersName) errors.mothersName = "Mother's name is required";
      if (!formData.address) errors.address = 'Address is required';
      if (!formData.schoolLastAttended) errors.schoolLastAttended = 'School last attended is required';
      if (!formData.asasSchoolAppliedFor) errors.asasSchoolAppliedFor = 'School applied for is required';
    }

    setFormErrors(errors); // Update errors state
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="font-sans bg-[#f3f3f3]">
      <Navbar user={user} setUser={setUser} />
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-800 mt-10">
          Augustinian Sisters of Our Lady of Consolation
        </h2>
        <p className="text-lg text-center text-gray-700 mt-2">
          Educational Assistance to ASOLC Relatives
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6 max-w-3xl mx-auto mt-4">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>Step {currentStep} of 3</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full">
              <div className="h-full bg-blue-600" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
            </div>
          </div>

          {currentStep === 1 && (
            <>
              <div>
                <label className="block text-gray-700 text-xl font-semibold mb-2">
                  Name of Augustinian Sisters
                </label>
                <input
                  type="text"
                  name="nameOfAugustSister"
                  value={formData.nameOfAugustSister}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Name of Scholar</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                    {formErrors.firstName && <p className="text-red-500 text-xs">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                    {formErrors.lastName && <p className="text-red-500 text-xs">{formErrors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-xl font-semibold mb-2">Relationship</label>
                <input
                  type="text"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                {formErrors.relationship && <p className="text-red-500 text-xs">{formErrors.relationship}</p>}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-xl font-semibold mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
                {formErrors.dob && <p className="text-red-500 text-xs">{formErrors.dob}</p>}
              </div>
            </>
          )}

{currentStep === 2 && (
  <>
    <div className="mb-4">
      <h3 className="text-xl font-semibold">Parents Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Father's Name</label>
          <input
            type="text"
            name="fathersName"
            value={formData.fathersName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          {formErrors.fathersName && <p className="text-red-500 text-xs">{formErrors.fathersName}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Mother's Name</label>
          <input
            type="text"
            name="mothersName"
            value={formData.mothersName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          {formErrors.mothersName && <p className="text-red-500 text-xs">{formErrors.mothersName}</p>}
        </div>
      </div>
    </div>

    <div className="mt-4">
      <label className="block text-gray-700 text-xl font-semibold mb-2">Address</label>
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address}</p>}
    </div>

    <div className="mt-4">
      <label className="block text-gray-700 text-xl font-semibold mb-2">School Last Attended</label>
      <input
        type="text"
        name="schoolLastAttended"
        value={formData.schoolLastAttended}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      {formErrors.schoolLastAttended && <p className="text-red-500 text-xs">{formErrors.schoolLastAttended}</p>}
    </div>

    <div className="mt-4">
      <label className="block text-gray-700 text-xl font-semibold mb-2">ASAS School Applied For</label>
      <input
        type="text"
        name="asasSchoolAppliedFor"
        value={formData.asasSchoolAppliedFor}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      {formErrors.asasSchoolAppliedFor && <p className="text-red-500 text-xs">{formErrors.asasSchoolAppliedFor}</p>}
    </div>

    <div className="mt-4">
      <label className="block text-gray-700 text-xl font-semibold mb-2">School Address</label>
      <input
        type="text"
        name="schoolAddress"
        value={formData.schoolAddress}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      {formErrors.schoolAddress && <p className="text-red-500 text-xs">{formErrors.schoolAddress}</p>}
    </div>
  </>
)}


          {currentStep === 3 && (
            <>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Education Level</h3>
                <div className="flex flex-col">
                  <div>
                    <label className="text-gray-700">
                      <input
                        type="checkbox"
                        name="levelOfEducation.elementary"
                        checked={formData.levelOfEducation.elementary}
                        onChange={handleChange}
                      />
                      Elementary
                    </label>
                  </div>
                  <div>
                    <label className="text-gray-700">
                      <input
                        type="checkbox"
                        name="levelOfEducation.secondary"
                        checked={formData.levelOfEducation.secondary}
                        onChange={handleChange}
                      />
                      Secondary
                    </label>
                  </div>
                  <div>
                    <label className="text-gray-700">
                      <input
                        type="checkbox"
                        name="levelOfEducation.college"
                        checked={formData.levelOfEducation.college}
                        onChange={handleChange}
                      />
                      College
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-xl font-semibold mb-2">Grade Level (Elementary)</label>
                <input
                  type="text"
                  name="gradeLevelElementary"
                  value={formData.gradeLevelElementary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-xl font-semibold mb-2">Grade Level (Secondary)</label>
                <input
                  type="text"
                  name="gradeLevelSecondary"
                  value={formData.gradeLevelSecondary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-xl font-semibold mb-2">Course Year (College)</label>
                <input
                  type="text"
                  name="courseYearCollege"
                  value={formData.courseYearCollege}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            </>
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Prev
              </button>
            )}

            <div className="flex">
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Next
              </button>

              {currentStep === 3 && (
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default AsolcForms;
