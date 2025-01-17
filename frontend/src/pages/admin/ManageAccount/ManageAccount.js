import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../../components/Navbar/AdminNavbar';
import Footer from '../../../components/Footer/Footer';
import { FaCheckCircle, FaTimesCircle, FaRedoAlt } from 'react-icons/fa'; // Importing icons

function ManageAccount() {
  const [accounts, setAccounts] = useState([]); // Initialize as empty array
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all accounts (including declined) on component mount
  useEffect(() => {
    const fetchAllAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/manage-account/all-users');
        if (response.data.users) {
          setAccounts(response.data.users);
        } else {
          setErrorMessage('No accounts found.');
        }
      } catch (error) {
        setErrorMessage('Error fetching accounts');
        console.error(error);
      }
    };

    fetchAllAccounts();
  }, []);

  // Handle account approval or decline
  const handleAccountStatus = async (id, status) => {
    try {
      await axios.put('http://localhost:5000/api/manage-account/update-status', { id, status });
      setAccounts(accounts.map(account => account.id === id ? { ...account, status } : account));
    } catch (error) {
      setErrorMessage('Error updating account status');
    }
  };

  // Confirm decline action
  const handleDeclineConfirmation = (account) => {
    const confirmation = window.confirm(`Are you sure you want to decline the account of ${account.first_name} ${account.middle_name} ${account.last_name}?`);
    if (confirmation) {
      handleAccountStatus(account.id, 'declined');
    }
  };

  return (
    <div className="font-sans bg-gray-100">
      <AdminNavbar />

      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Accounts</h1>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">First Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Middle Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Last Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map(account => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{account.first_name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{account.middle_name || 'N/A'}</td> {/* Display middle name or 'N/A' if not available */}
                    <td className="py-3 px-4 text-sm text-gray-700">{account.last_name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{account.email}</td>
                    <td className="py-3 px-4 text-sm">
                      {account.status === 'pending' ? (
                        <span className="text-yellow-500 font-semibold">Pending</span>
                      ) : account.status === 'approved' ? (
                        <span className="text-green-500 font-semibold">Approved</span>
                      ) : (
                        <span className="text-red-500 font-semibold">Declined</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      {account.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAccountStatus(account.id, 'approved')}
                            className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition duration-150 ease-in-out"
                          >
                            <FaCheckCircle className="inline-block mr-2" /> Approve
                          </button>
                          <button
                            onClick={() => handleDeclineConfirmation(account)}
                            className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition duration-150 ease-in-out"
                          >
                            <FaTimesCircle className="inline-block mr-2" /> Decline
                          </button>
                        </>
                      )}

                      {account.status === 'approved' && (
                        <button
                          onClick={() => handleAccountStatus(account.id, 'declined')}
                          className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition duration-150 ease-in-out"
                        >
                          <FaTimesCircle className="inline-block mr-2" /> Decline
                        </button>
                      )}

                      {account.status === 'declined' && (
                        <>
                          <button
                            onClick={() => handleAccountStatus(account.id, 'approved')}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-150 ease-in-out"
                          >
                            <FaRedoAlt className="inline-block mr-2" /> Re-Approve
                          </button>
                          <button
                            onClick={() => handleAccountStatus(account.id, 'declined')}
                            className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition duration-150 ease-in-out"
                          >
                            <FaTimesCircle className="inline-block mr-2" /> Decline Again
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-3 px-4 text-center text-sm text-gray-500">
                    No accounts to approve or decline.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

  <Footer /> 
    </div>
  );
}

export default ManageAccount;
