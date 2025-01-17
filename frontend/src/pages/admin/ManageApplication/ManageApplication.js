import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../../components/Navbar/AdminNavbar';
import axios from 'axios';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../../components/Footer/Footer';


function ManageApplication() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/manage-application/applications');
        setApplications(response.data.applications);
        setFilteredApplications(response.data.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.post('http://localhost:5000/api/manage-application/update-status', { id, status });
      setApplications(applications.map(app => (app.id === id ? { ...app, status } : app)));
      filterApplications(statusFilter);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axios.delete(`http://localhost:5000/api/manage-application/delete/${id}`);
        setApplications(applications.filter(app => app.id !== id));
        setFilteredApplications(filteredApplications.filter(app => app.id !== id));
        toast.success('Application deleted successfully!');
      } catch (error) {
        console.error('Error deleting application:', error);
        toast.error('Failed to delete application.');
      }
    }
  };
  

  const handleEdit = async () => {
    try {
      await axios.put('http://localhost:5000/api/manage-application/edit', editData);
      setApplications(applications.map(app => (app.id === editData.id ? editData : app)));
      filterApplications(statusFilter);
      closeEditModal();
      toast.success('Application updated successfully!');
    } catch (error) {
      console.error('Error editing application:', error);
      toast.error('Failed to update application.');
    }
  };
  

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setStatusFilter(filter);
    filterApplications(filter);
  };

  const filterApplications = (filter) => {
    if (filter === 'all') {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.status === filter));
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return 'Invalid Date';
    }
  };

  const getLevelOfEducation = (education) => {
    if (!education) return 'Not Specified';
    const levels = [];
    if (education.elementary) levels.push('Elementary');
    if (education.secondary) levels.push('Secondary');
    if (education.college) levels.push('College');
    return levels.length > 0 ? levels.join(', ') : 'Not Specified';
  };
  
  const openModal = (app) => {
    setModalData(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const openEditModal = (app) => {
    setEditData(app);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
  
    setEditData((prev) => ({
      ...prev,
      [name]: name === "level_of_education"
        ? value.split(", ").reduce((acc, level) => {
            acc[level] = true; // Set entered levels to true
            return acc;
          }, {})
        : value,
    }));
  };
  
  
  

  const openViewAllModal = (app) => {
    setModalData(app);
    setIsModalOpen(true);
  };
  
  const closeViewAllModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };
  
  const formatLevelOfEducation = (educationObject) => {
    if (typeof educationObject !== "object" || educationObject === null) {
      return "";
    }
  
    return Object.keys(educationObject)
      .filter((key) => educationObject[key]) // Only keep keys with true values
      .join(", "); // Join them as a string
  };
  
  return (
    <div className="font-sans bg-gray-100 max-h-[500px]">
      <AdminNavbar />
      <ToastContainer  position="top-center"/>
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mt-20">Manage Applications</h2>

        <div className="flex justify-end mt-4 mb-6">
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="bg-white border border-gray-300 rounded-md p-2 shadow-sm"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
        </div>

        <div className="mt-6">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-2  text-sm font-semibold text-gray-600 text-center border-r-2">Name of Augustinian Sister</th>
                <th className="px-4 py-2  text-sm font-semibold text-gray-600 text-center border-r-2">Full Name</th>
             <th className="px-4 py-2  text-sm font-semibold text-gray-600 text-center border-r-2">Relationship</th> 
                <th className="px-4 py-2  text-sm font-semibold text-gray-600 text-center border-r-2">Date of Birth</th>
                <th className="px-4 py-2  text-sm font-semibold text-gray-600 text-center border-r-2">Father's Name</th>
                <th className="px-4 py-2  text-sm font-semibold text-gray-600 text-center border-r-2">Mother's Name</th>
                <th className="px-4 py-2  text-sm font-semibold text-gray-600 text-center border-r-2">Address</th>
                {/* <th className="px-4 py-2  text-sm font-semibold text-gray-600">School Last Attended</th>
                <th className="px-4 py-2  text-sm font-semibold text-gray-600">School Address</th>
                <th className="px-4 py-2  text-sm font-semibold text-gray-600">Level of Education</th>
                <th className="px-4 py-2  text-sm font-semibold text-gray-600">School Applied For</th> */}
                <th className="px-4 py-2  text-sm font-semibold text-gray-600 text-center ">Status</th>
                <th className="px-4 py-2  text-sm font-semibold text-gray-600 text-center ">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center border-r-2 ">{app.name_of_august_sister}</td>
                  <td className="px-4 py-2 text-center border-r-2">{`${app.first_name} ${app.middle_name} ${app.last_name}`}</td>
                  <td className="px-4 py-2 text-center border-r-2">{app.relationship}</td>
                  <td className="px-4 py-2 text-center border-r-2">{formatDate(app.dob)}</td>
                  <td className="px-4 py-2 text-center border-r-2">{app.fathers_name}</td>
                  <td className="px-4 py-2 text-center border-r-2">{app.mothers_name}</td>
                  <td className="px-4 py-2 text-center border-r-2">{app.address}</td>
                  {/* <td className="px-4 py-2 text-center border-r-2">{app.school_last_attended}</td>
                  <td className="px-4 py-2 text-center border-r-2">{app.school_address}</td>
                  <td className="px-4 py-2 text-center border-r-2">{getLevelOfEducation(app.level_of_education)}</td>
                  <td className="px-4 py-2 text-center border-r-2">{app.asas_school_applied_for}</td> */}
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        app.status === 'approved'
                          ? 'bg-green-200 text-green-600'
                          : app.status === 'declined'
                          ? 'bg-red-200 text-red-600'
                          : 'bg-yellow-200 text-yellow-600'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex justify-center relative">
                    <button
                      onClick={() => toggleDropdown(app.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md"
                    >
                      Manage
                    </button>
                    {dropdownOpen[app.id] && (
                      <div className="absolute mt-10 bg-white border border-gray-300 rounded-md shadow-md z-10">
                        <button
                          onClick={() => handleStatusChange(app.id, 'approved')}
                          className="block px-4 py-2 text-sm text-white-700 hover:bg-blue-100 w-full text-left"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(app.id, 'declined')}
                          className="block px-4 py-2 text-sm text-white-700 hover:bg-blue-100 w-full text-left"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="block px-4 py-2 text-sm text-white-700 hover:bg-blue-100 w-full text-left"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => openEditModal(app)}
                          className="block px-4 py-2 text-sm text-white-700 hover:bg-blue-100 w-full text-left"
                        >
                          Edit
                        </button>

                        <button
                onClick={() => openModal(app)}  // Use openModal to open the "View All" modal
                className="block px-4 py-2 text-sm text-white-700 hover:bg-blue-100 w-full text-left"
              >
                View All
              </button>
                      </div>
                    )}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     {/* Modal for editing details */}{isEditModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
    <h3 className="text-xl font-bold mb-4">Edit Application</h3>
    <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Name of Augustinian Sister</label>
          <input
            type="text"
            name="name_of_august_sister"
            value={editData.name_of_august_sister || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="first_name"
            value={editData.first_name || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Middle Name</label>
          <input
            type="text"
            name="middle_name"
            value={editData.middle_name || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={editData.last_name || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Relationship</label>
          <input
            type="text"
            name="relationship"
            value={editData.relationship || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={editData.dob || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Father's Name</label>
          <input
            type="text"
            name="fathers_name"
            value={editData.fathers_name || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Mother's Name</label>
          <input
            type="text"
            name="mothers_name"
            value={editData.mothers_name || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={editData.address || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">School Last Attended</label>
          <input
            type="text"
            name="school_last_attended"
            value={editData.school_last_attended || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">School Address</label>
          <input
            type="text"
            name="school_address"
            value={editData.school_address || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
  <label className="block text-gray-700">Level of Education</label>
  <input
    type="text"
    name="level_of_education"
    value={
      typeof editData.level_of_education === "object"
        ? formatLevelOfEducation(editData.level_of_education)
        : editData.level_of_education
    }
    onChange={handleEditChange}
    className="w-full border border-gray-300 p-2 rounded-md"
  />
</div>



        <div>
          <label className="block text-gray-700">School Applied For</label>
          <input
            type="text"
            name="asas_school_applied_for"
            value={editData.asas_school_applied_for || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={editData.status || ''}
            onChange={handleEditChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Save Changes</button>
        <button onClick={closeEditModal} className="ml-4 bg-red-500 text-white py-2 px-4 rounded-md">Cancel</button>
      </div>
    </form>
  </div>
</div>
)}

{/* Modal for viewing details */}
{isModalOpen && modalData && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
      <h3 className="text-xl font-bold mb-4">View Application</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Name of Augustinian Sister</label>
          <p className="bg-gray-100 p-2 rounded-md">{modalData.name_of_august_sister || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-gray-700">Full Name</label>
          <p className="bg-gray-100 p-2 rounded-md">
            {`${modalData.first_name || ''} ${modalData.middle_name || ''} ${modalData.last_name || ''}`.trim()}
          </p>
        </div>
        <div>
          <label className="block text-gray-700">Relationship</label>
          <p className="bg-gray-100 p-2 rounded-md">{modalData.relationship || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-gray-700">Date of Birth</label>
          <p className="bg-gray-100 p-2 rounded-md">{formatDate(modalData.dob) || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-gray-700">Father's Name</label>
          <p className="bg-gray-100 p-2 rounded-md">{modalData.fathers_name || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-gray-700">Mother's Name</label>
          <p className="bg-gray-100 p-2 rounded-md">{modalData.mothers_name || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <p className="bg-gray-100 p-2 rounded-md">{modalData.address || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-gray-700">School Last Attended</label>
          <p className="bg-gray-100 p-2 rounded-md">{modalData.school_last_attended || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-gray-700">School Address</label>
          <p className="bg-gray-100 p-2 rounded-md">{modalData.school_address || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-gray-700">Level of Education</label>
          <p className="bg-gray-100 p-2 rounded-md">{getLevelOfEducation(modalData.level_of_education)}</p>
        </div>
        <div>
          <label className="block text-gray-700">School Applied For</label>
          <p className="bg-gray-100 p-2 rounded-md">{modalData.asas_school_applied_for || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-gray-700">Status</label>
          <p className={`px-2 py-1 rounded-md ${
            modalData.status === 'approved'
              ? 'bg-green-200 text-green-600'
              : modalData.status === 'declined'
              ? 'bg-red-200 text-red-600'
              : 'bg-yellow-200 text-yellow-600'
          }`}>
            {modalData.status}
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button onClick={closeViewAllModal} className="bg-blue-500 text-white py-2 px-4 rounded-md">Close</button>
      </div>
    </div>
  </div>
  
)}
  <div className="mt-20">
  {/* <Footer /> */}
</div>

    </div>

    
  );  
}

export default ManageApplication;
