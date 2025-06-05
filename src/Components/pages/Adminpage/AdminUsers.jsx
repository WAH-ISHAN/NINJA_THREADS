import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function AdminUsers() {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/allusers`)
      .then((res) => {
        const allUsers = res?.data?.users || [];

        const adminsList = allUsers.filter(user => user.usertype === 'admin');
        const normalUsersList = allUsers.filter(user => user.usertype === 'user');

        setAdmins(adminsList);
        setUsers(normalUsersList);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
        setError("Failed to fetch users.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
  };

  return (
    <div className="w-full h-full p-6 overflow-x-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Users</h1>

      {loading ? (
        <p className="text-white">Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden mb-10">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">👑 Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Last Logged In</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map(user => (
                  <tr key={user._id} className="border-b border-gray-600">
                    <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{formatDate(user.lastLoggedIn)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-white p-4">No admin users found.</td></tr>
              )}
            </tbody>
          </table>

          
          <h1 className="text-3xl font-bold text-white mb-4">Normal Users</h1>
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">🙍 Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Last Logged In</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user._id} className="border-b border-gray-600">
                    <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{formatDate(user.lastLoggedIn)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-white p-4">No normal users found.</td></tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
