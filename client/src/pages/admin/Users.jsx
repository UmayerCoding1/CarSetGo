import React, { useEffect, useState } from "react";
import { callGetApis, callPutApis } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Ban, Trash } from "lucide-react";
import { toast } from "sonner";
const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 20;

  const { user } = useAuth();
  
  const adminId = user?._id;


  console.log(roleFilter);
  
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", page, usersPerPage, searchId, roleFilter],
    queryFn: async () => {
      let url = `/auth/users?page=${page}&limit=${usersPerPage}&search=${searchId}&filterRole=${roleFilter}`;
      
      const res = await callGetApis(url);
      if (res.success) {
        setTotalPages(res.totalPage);
        return res.users;
      }
      return [];
    },
  });

  const roleChangeHandler = async (id, role, prevRole) => {
    if (!id || !role) return;

    

    const previewRole = localStorage.getItem("previesRole");

    if (previewRole) {
      const previesRoles = JSON.parse(previewRole);
      const previesRole = previesRoles.find((prev) => prev.userId === id);
      if (previesRole) {
        previesRole.previesRole = prevRole;
      } else {
        previesRoles.push({ userId: id, previesRole: prevRole });
      }
      localStorage.setItem("previesRole", JSON.stringify(previesRoles));
    } else {
      localStorage.setItem(
        "previesRole",
        JSON.stringify([{ userId: id, previesRole: prevRole }])
      );
    }


    
      try {
        const res = await callPutApis(`/auth/update-role/${id}`, { role });
        if (res.success) {
          toast.success(res.message, { duration: 1000 });
          refetch();
        }
      } catch (error) {
        throw new Error(error);
      }
    
  };

  return (
    <div className="p-4 max-h-screen overflow-auto scrollb">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">All Users</h2>
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-3 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm w-full md:w-64"
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm w-full md:w-48"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-blue-50 text-blue-900">
              <th className="py-3 px-4 text-left font-semibold">#</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Role</th>
              <th className="py-3 px-4 text-left font-semibold">Joined</th>
              <th className="py-3 px-4 text-left font-semibold">Role Change</th>
              <th className="py-3 px-4  font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className={`border-b last:border-b-0 ${
                  user?.role === "blacklisted"
                    ? "bg-red-200"
                    : "hover:bg-blue-50"
                } transition`}
              >
                <td className="py-2 px-4">
                  {(page - 1) * usersPerPage + idx + 1}
                </td>
                <td className="py-2 px-4 font-medium text-gray-900">
                  {user.fullname}
                </td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-blue-200 text-blue-800"
                        : user.role === "seller"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-2 px-4 text-gray-500">{user.createdAt}</td>

                <td className="py-2 px-4">
                  {user?.role !== "blacklisted" && (
                    <select
                      className="ml-2 px-2 py-1 rounded border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                      value={user?.role}
                      onChange={(e) =>
                        roleChangeHandler(user._id, e.target.value)
                      }
                    >
                      <option value="User">{user.role}</option>
                      {user.role !== "user" && (
                        <option value="user">User</option>
                      )}
                      {user.role !== "seller" && (
                        <option value="seller">Seller</option>
                      )}
                      {user.role !== "admin" && (
                        <option value="admin">Admin</option>
                      )}
                    </select>
                  )}
                </td>

                <td className="py-2 px-4 flex items-center justify-center">
                  {user?._id === adminId  ? "You" : (
                       <div className="flex items-center gap-2">
                    {user.role !== "blacklisted" ? (
                      <button
                        onClick={() =>
                          roleChangeHandler(user._id, "blacklisted", user?.role)
                        }
                        className="flex items-center gap-2 bg-yellow-400 hover:bg-red-500 text-yellow-900 hover:text-white px-2 py-1 rounded text-xs font-semibold shadow-sm transition-colors duration-150"
                      >
                        <Ban size={13} /> Block
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // Restore previous role from sessionStorage
                          const previewRole = localStorage.getItem("previesRole");
                          let prevRole = "user";
                          if (previewRole) {
                            const previesRoles = JSON.parse(previewRole);
                            const previesRole = previesRoles.find((prev) => prev.userId === user._id);
                            if (previesRole) {
                              prevRole = previesRole.previesRole;
                            }

                           
                            
                            
                          }
                          roleChangeHandler(user._id, prevRole, "blacklisted");
                        }}
                        className="flex items-center gap-2 bg-green-400 hover:bg-green-600 text-green-900 hover:text-white px-2 py-1 rounded text-xs font-semibold shadow-sm transition-colors duration-150"
                      >
                        <Ban size={13} /> Unblock
                      </button>
                    )}
                    <button className="flex items-center gap-2 bg-gradient-to-r from-red-500 via-red-500 to-red-500 hover:from-red-600 hover:to-red-400 text-white px-2 py-1 rounded text-xs font-semibold shadow-sm transition-colors duration-150">
                      <Trash size={13} /> Delete
                    </button>
                  </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 mb-[100px]">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-white border border-gray-200 text-blue-700 font-semibold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded font-semibold border ${
              page === i + 1
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-700 border-gray-200 hover:bg-blue-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-white border border-gray-200 text-blue-700 font-semibold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
