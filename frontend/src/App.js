import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/student/Login/Login'; 
import StudentLanding from './pages/student/StudentLanding/StudentLanding'; 
import AsolcForms from './pages/student/asolc_scholarship/asolc_scholarship'; 
import Registration from './pages/student/Registration/Registration'; 
import AdminLandingPage from './pages/admin/ManageAccount/ManageAccount'; 
import ManageApplication from './pages/admin/ManageApplication/ManageApplication';
import ViewApplications from './pages/student/ViewApplications/ViewApplication';
import ViewScholarships from './pages/admin/ViewScholarships/ViewScholarships';
import AcademicAchievement  from './pages/student/AcademicAchievement/AcademicAchievement';
import  StudentAssista  from './pages/student/StudentAssista/StudentAssista';
import  LoyaltyDiscount  from './pages/student/LoyaltyDiscount/LoyaltyDiscount';
import  LccbChoraleScholarsh  from './pages/student/LccbChoraleScholarsh/LccbChoraleScholarsh';
import  SiblingsForm  from './pages/student/SiblingsForm/SiblingsForm';
import  Varsity  from './pages/student/varsity/varsity';







function App() {
  return (
    <Router>
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/StudentLanding" element={<StudentLanding />} />
        <Route path="/asolcForms" element={<AsolcForms />} /> 
        <Route path="/register" element={<Registration />} />
        <Route path="/viewapplications" element={<ViewApplications />} />
        <Route path="/academicachievement" element={<AcademicAchievement />} /> 
        <Route path="/StudentAssista" element={<StudentAssista />} /> 
        <Route path="/LoyaltyDiscount" element={<LoyaltyDiscount />} /> 
        <Route path="/LccbChoraleScholarsh" element={<LccbChoraleScholarsh />} /> 
        <Route path="/SiblingsForm" element={<SiblingsForm />} /> 
        <Route path="/varsity" element={<Varsity />} /> 


          {/* Admin Routes */}
          <Route path="/manageaccount" element={<AdminLandingPage />} />
          <Route path="/manageapplications" element={<ManageApplication />} />
          <Route path="/viewscholarships" element={<ViewScholarships />} />
      </Routes>
    </Router>
  );
}

export default App;
