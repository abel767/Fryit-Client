import { useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import AdminLayout from "./layouts/AdminLayouts";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setUsers(data.data);
      } catch (err) {
        toast.error('Failed to load users');
        console.error(err)
      }
    };
    fetchUsers();
  }, []);

  const updateRole = async(userId, newRole) => {
      try {
          await axios.patch(
              `${import.meta.env.VITE_API_URL}/admin/users/${userId}/role`,
              { role: newRole },
              {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                  }
              }
          );
          toast.success('Role updated');
          setUsers(users.map(user =>
              user._id === userId ? {...user, role: newRole} : user
          ));
      } catch(err) {
          toast.error('Failed to update role');
          console.error(err)
      }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => updateRole(user._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="player">Player</option>
                    <option value="developer">Developer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}