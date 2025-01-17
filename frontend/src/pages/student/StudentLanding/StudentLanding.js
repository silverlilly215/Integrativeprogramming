import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import Navbar from '../../../components/Navbar/Navbar';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Contact from '../../../components/Contact/Contact';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

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

function StudentLandingPage() {
  const institutionalScholarships = [
    {
      title: "ASOLC Scholarship",
      description: (
        <>
          <p>Given to the 1st degree – brother or sister, 2nd degree – niece or nephew, 3rd degree – son or daughter of the niece or nephew of an Augustinian Sister of Our Lady of Consolation</p>
          <p><strong>No. of Scholars allowed:</strong> Open</p>
          <p><strong>Criteria:</strong> Based on the ASOLC Congregation's Policy</p>
          <p><strong>Discount:</strong></p>
          <ul className="list-disc pl-6">
            <li>100% Discount on Tuition Fee Only</li>
            <li>100% Discount on Miscellaneous Fee</li>
            <li>Laboratory Fees will be shouldered by the scholar</li>
          </ul>
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc pl-6">
            <li>Accomplished Application Form bearing the signature of the sponsoring ASOLC Sister for New Applicants.</li>
            <li>Short interview with the Scholarship Staff regarding the degree of relationship with the sponsoring ASOLC Sister.</li>
            <li>Copy of complete grades of the previous Academic Year or Semester.</li>
          </ul>
          <p><strong>Conditions:</strong></p>
          <ul className="list-disc pl-6">
            <li>The ASOLC Scholarship is valid for 1 scholar for every 1 ASOLC Sister only.</li>
            <li>The Scholar must submit a copy of his or her Complete Grades of the previous Academic Year to continue his or her Scholarship.</li>
          </ul>
          
          {/* Apply Now Button */}
          <Link to="/asolcForms">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
          Apply Now
        </button>
      </Link>
        </>
      ),
    },
    {
      title: "Siblings Privilege for Integrated School",
      description: (
        <>
          <p>Given to an Integrated School Pupil or Student who has two or three other siblings simultaneously enrolled in LCCB.</p>
          <p><strong>No. of Scholars Allowed:</strong> Open</p>
          <p><strong>Criteria:</strong> Student or pupil must be officially enrolled in the Integrated School.</p>
          <p><strong>Discount:</strong></p>
          <ul className="list-disc pl-6">
            <li>The youngest of three (3) siblings simultaneously enrolled in LCCB shall receive a 20% Discount on Tuition Fee only.</li>
            <li>The youngest of four (4) siblings simultaneously enrolled in LCCB shall receive a 50% Discount on Tuition Fee only.</li>
          </ul>
          <p><strong>Requirement:</strong></p>
          <ul className="list-disc pl-6">
            <li>Accomplished Application Form from the LCCB Scholarship Program.</li>
          </ul>
          <p><strong>Conditions:</strong></p>
          <ul className="list-disc pl-6">
            <li>Siblings Privilege is valid for one regular academic year.</li>
            <li>Applicants must renew their application during the enrollment period of the succeeding Academic Year to continue their Scholarship privilege.</li>
          </ul>
    
          {/* Apply Now Button */}
          <Link to="/SiblingsForm">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
              Apply Now
            </button>
          </Link>
        </>
      ),
    }
    ,
    {
      title: "Academic Achievement",
      description: (
        <>
          <p>Given to an incoming Grade 7, Grade 11, or 1st year College applicant who has successfully graduated and ranked 1st, 2nd, or 3rd in a class of at least 100 students in his/her respective public or private school.</p>
          <p><strong>No. of Scholars Allowed:</strong> Open</p>
          <p><strong>Criteria:</strong> Must have graduated as Rank 1, Rank 2, or Rank 3 from a public or private school with a graduating class of no less than 100 students.</p>
          <p><strong>Discount:</strong></p>
          <ul className="list-disc pl-6">
            <li><strong>Rank 1:</strong> 100% Discount on Tuition Fee only</li>
            <li><strong>Rank 2:</strong> 50% Discount on Tuition Fee only</li>
            <li><strong>Rank 3:</strong> 25% Discount on Tuition Fee only</li>
          </ul>
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc pl-6">
            <li>Photocopy of Report Card with Complete Grades</li>
            <li>Original Certification from the Principal stating that the student has graduated with honorable distinction, indicating the student’s Rank and the number of graduates in the batch</li>
            <li>Accomplished Application Form from the LCCB Scholarship Program</li>
          </ul>
          <p><strong>Conditions:</strong></p>
          <ul className="list-disc pl-6">
            <li>The Academic Achievement Scholarship is valid for 1 academic year only.</li>
          </ul>
    
          {/* Apply Now Button */}
          <Link to="/academicachievement">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
              Apply Now
            </button>
          </Link>
        </>
      ),
    }
    ,
    {
      title: "Loyalty Discount",
      description: (
        <>
          <p>Given to an incoming Grade 11 or 1st year College applicant who graduated from LCC Bacolod (LCCB) and ASAS Sisters Schools.</p>
          <p><strong>No. of Scholars Allowed:</strong> Open</p>
          <p><strong>Criteria:</strong> Student must be a graduate of LCCB and ASAS Sister Schools.</p>
          <p><strong>Qualification or Discount:</strong></p>
          <p><strong>For Senior High School:</strong></p>
          <ul className="list-disc pl-6">
            <li>20% discount on tuition fee for students who studied in LCCB and ASAS Sister Schools from Grade 1 to Grade 10</li>
            <li>10% discount on tuition fee for students who studied in LCCB and ASAS Sister Schools from Grade 7 to Grade 10</li>
          </ul>
          <p><strong>For College:</strong></p>
          <ul className="list-disc pl-6">
            <li>40% discount on tuition fee for students who studied K-12 in LCCB and ASAS Sister Schools</li>
            <li>20% discount on tuition fee for students who studied in LCCB and ASAS Sister Schools from Grade 7 to Grade 10</li>
            <li>10% discount on tuition fee for students who studied in LCCB and ASAS Sister Schools during Senior High School</li>
          </ul>
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc pl-6">
            <li>Accomplished Application Form from the LCCB Scholarship Program</li>
            <li>Certificate of Residence (for ASAS Sister Schools)</li>
          </ul>
          <p><strong>Condition:</strong></p>
          <ul className="list-disc pl-6">
            <li>The Loyalty Discount is valid for 1 academic year only.</li>
          </ul>
    
          {/* Apply Now Button */}
          <Link to="/LoyaltyDiscount">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
              Apply Now
            </button>
          </Link>
        </>
      ),
    }
    ,
    {
      title: "Student Assistant Scholarship",
      description: (
        <>
          <p>Given to poor but deserving students who would like to pursue a college education.</p>
          <p><strong>No. of Scholars Allowed:</strong> Open</p>
          <p><strong>Criteria:</strong> The student must be willing to render service to the school in exchange for the financial assistance provided.</p>
          <p><strong>Qualification or Discount:</strong></p>
          <p><strong>For Regular Semester:</strong></p>
          <ul className="list-disc pl-6">
            <li>18 units load for first-year and second-year Student Assistants</li>
            <li>21 units load for third-year and fourth-year Student Assistants</li>
            <li>6 units load during the summer for all year levels</li>
          </ul>
          <p><strong>For Interns:</strong></p>
          <ul className="list-disc pl-6">
            <li>100% discount on tuition and miscellaneous fees for the regular term</li>
            <li>100% discount on tuition and basic fees. SA’s are also covered for some miscellaneous fees that are non-cash out during summer</li>
            <li>Interns will receive a ₱500 monthly allowance provided by the school</li>
          </ul>
          <p><strong>For Externs:</strong></p>
          <ul className="list-disc pl-6">
            <li>100% discount on tuition fees</li>
            <li>50% discount on basic fees</li>
          </ul>
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc pl-6">
            <li>Accomplished Application Form</li>
            <li>Photocopy of:
              <ul className="list-disc pl-6">
                <li>Form 138 or Senior High School Report Card with a final average grade of 80% and no failing grades (for incoming freshmen)</li>
                <li>Latest Grade Report with a GWA of 80% and no failing grades (for transferees and higher year students)</li>
              </ul>
            </li>
            <li>Certificate of Indigence from the Barangay Captain if parents/guardians are unemployed. Latest Income Tax Return if parents/guardians are employed.</li>
            <li>Psychological Exam Result from the LCCB College Guidance</li>
            <li>Birth Certificate (photocopy)</li>
            <li>Baptismal Certificate (photocopy)</li>
            <li>Recommendation Letter from 3 different persons (not relatives)</li>
          </ul>
          <p><strong>Condition:</strong></p>
          <ul className="list-disc pl-6">
            <li>Student Assistant scholarships are non-cumulative and non-transferable.</li>
          </ul>
    
          {/* Apply Now Button */}
          <Link to="/StudentAssista">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
              Apply Now
            </button>
          </Link>
        </>
      ),
    }
    ,
    {
      title: "Sr. Cecilia Maceren, OSA Scholarship (LCCB Chorale)",
      description: (
        <>
          <p>Given to deserving members of the Chorale in the Integrated School and College.</p>
          <p><strong>No. of Scholars Allowed:</strong> Depending on the recommendation of the choir master.</p>
          <p><strong>Qualification or Discount:</strong></p>
          <ul className="list-disc pl-6">
            <li>No failing grade or dropped subject in the previous academic years.</li>
            <li><strong>Integrated School:</strong> One Thousand Pesos (₱1,000.00) discount on tuition fee.</li>
            <li><strong>College:</strong> Two Thousand Pesos (₱2,000.00) discount on tuition fee.</li>
          </ul>
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc pl-6">
            <li>Endorsement from the choir master after audition.</li>
          </ul>
          <p><strong>Condition:</strong></p>
          <ul className="list-disc pl-6">
            <li>Must pass the screening and audition.</li>
          </ul>
    
          {/* Apply Now Button */}
          <Link to="/LccbChoraleScholarsh">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
              Apply Now
            </button>
          </Link>
        </>
      ),
    }
    ,
    {
      title: "Blue Panthers / Basketball Varsity Scholarship",
      description: (
        <>
          <p>Given to deserving members of the Basketball Team in Senior High School and College.</p>
          <p><strong>No. of Scholars Allowed:</strong> Depending on the recommendation of the Sports Coordinator/Coach.</p>
          <p><strong>Qualification or Discount:</strong></p>
          <ul className="list-disc pl-6">
            <li>Must have an average of 80% with no failure or dropped subject.</li>
            <li>Discount on tuition fee of players depends on the ratings as endorsed by the Sports Coordinator/Coach.</li>
          </ul>
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc pl-6">
            <li>Endorsement from the Sports Coordinator/Coach.</li>
          </ul>
          <p><strong>Conditions:</strong></p>
          <ul className="list-disc pl-6">
            <li>Must pass the screening and tryouts.</li>
          </ul>
    
          {/* Apply Now Button */}
          <Link to="/varsity">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
              Apply Now
            </button>
          </Link>
        </>
      ),
    }
    ,
    {
      title: "Scholarship for BS Interior Design Students",
      description: (
        <>
          <p>Given to deserving 3rd year and 4th year students of the BS Interior Design program.</p>
          <p><strong>No. of Scholars Allowed:</strong> 2</p>
          <p><strong>Qualification or Discount:</strong></p>
          <ul className="list-disc pl-6">
            <li>100% discount on tuition fee.</li>
            <li>Cost of board exam review excluding board and lodging.</li>
          </ul>
          <p><strong>Requirements:</strong></p>
          <ul className="list-disc pl-6">
            <li>Endorsement from the Department Head/MOA.</li>
          </ul>
          <p><strong>Conditions:</strong></p>
          <ul className="list-disc pl-6">
            <li>Must pass the screening and requirements.</li>
          </ul>
    
          {/* Apply Now Button */}
          <Link to="/asolcForms">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
              Apply Now
            </button>
          </Link>
        </>
      ),
    }
    ,
  ];

  

  // Show a toast notification when page loads or when the user logs in
  useEffect(() => {
    toast.success("Welcome to the Student Scholarship Portal!"); // Show success toast on page load
  }, []);

  return (
    <div className="font-sans">
      {/* Navbar */}
      <Navbar />

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

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-center" // This will center the toast on the page
        autoClose={5000} // Optional: toast auto close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default StudentLandingPage;
