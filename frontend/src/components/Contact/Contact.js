import React from 'react';

function Contact() {
  return (
    <section id="contact" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">Contact Information</h2>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Logo and Title */}
          <div className="flex-shrink-0">
            <img 
              src="/lccblogo.jpg" 
              alt="LCCB Logo" 
              className="w-48 h-48 object-contain"
            />
          </div>
  
          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Azel Grace F. Facultad, LPT</h3>
              <p className="text-gray-600">Staff</p>
              <p className="text-gray-600">Scholarships</p>
            </div>
  
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">E-mail Address:</span>
                <a 
                  href="mailto:scholarships@lccbonline.edu.ph" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  scholarships@lccbonline.edu.ph
                </a>
              </div>
  
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Telephone Number:</span>
                <span>(034) 434 – 9661 local 317</span>
              </div>
  
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Please address inquiries and updates to:</span>
                <span>Azel Grace F. Facultad – Scholarship Staff</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
