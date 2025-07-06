import React, { useEffect, useState } from "react";
import { callGetApis, callPutApis } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Ban, Trash } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import Loading from "../../components/ui/Loading";
const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 20;

  const { user } = useAuth();

  const adminId = user?._id;

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
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#19223a] via-[#1e2a3a] to-[#2ec4f1] px-0 sm:px-4 max-h-screen overflow-auto scrollbar-hide">
      <h2 className="text-2xl font-bold mb-4 text-cyan-200 drop-shadow">
        All Users
      </h2>
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
          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm text-white w-full md:w-64"
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-white text-sm w-full md:w-48"
        >
          <option className="text-black" value="">
            All Roles
          </option>
          <option className="text-black" value="user">
            User
          </option>
          <option className="text-black" value="seller">
            Seller
          </option>
          <option className="text-black" value="admin">
            Admin
          </option>
          <option className="text-black" value="blacklisted">
            Blacklisted
          </option>
        </select>
      </div>
      {users && users.length > 0 ? (
        <div className="bg-[#1e293b]/80  h-[800px] rounded-xl shadow-2xl border border-cyan-900 overflow-x-auto backdrop-blur-md scrollbar-hide">
          <table className="min-w-full text-sm text-cyan-100">
            <thead>
              <tr className="bg-gradient-to-r from-[#233554] to-[#2ec4f1] text-cyan-100">
                <th className="py-3 px-4 text-left font-semibold">#</th>
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
                <th className="py-3 px-4 text-left font-semibold">Role</th>
                <th className="py-3 px-4 text-left font-semibold">Joined</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Role Change
                </th>
                <th className="py-3 px-4  font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user._id}
                  className={`border-b last:border-b-0 ${
                    user?.role === "blacklisted"
                      ? "bg-rose-900/40"
                      : "hover:bg-cyan-900/30"
                  } transition `}
                >
                  <td className="py-2 px-4">
                    {(page - 1) * usersPerPage + idx + 1}
                  </td>
                  <td className="py-2 px-4 font-medium text-cyan-100">
                    {user.fullname}
                  </td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        user.role === "admin"
                          ? "bg-cyan-700/80 text-cyan-100"
                          : user.role === "seller"
                          ? "bg-emerald-700/80 text-emerald-100"
                          : user.role === "blacklisted"
                          ? "bg-rose-900/80 text-rose-100"
                          : "bg-slate-700/80 text-slate-100"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-cyan-300">{user.createdAt}</td>

                  <td className="py-2 px-4">
                    {user?.role !== "blacklisted" && (
                      <select
                        className="ml-2 px-2 py-1 rounded border border-cyan-700 bg-cyan-900/80 text-xs font-semibold text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
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

                  <td className="py-2 px-4 flex items-center justify-center gap-2">
                    {user?._id === adminId ? (
                      "You"
                    ) : (
                      <div className="flex items-center gap-2">
                        {user.role !== "blacklisted" ? (
                          <button
                            onClick={() =>
                              roleChangeHandler(
                                user._id,
                                "blacklisted",
                                user?.role
                              )
                            }
                            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-rose-500 text-white px-2 py-1 rounded text-xs font-semibold shadow-md hover:from-rose-500 hover:to-yellow-400 transition-colors duration-150"
                          >
                            <Ban size={13} /> Block
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              // Restore previous role from sessionStorage
                              const previewRole =
                                localStorage.getItem("previesRole");
                              let prevRole = "user";
                              if (previewRole) {
                                const previesRoles = JSON.parse(previewRole);
                                const previesRole = previesRoles.find(
                                  (prev) => prev.userId === user._id
                                );
                                if (previesRole) {
                                  prevRole = previesRole.previesRole;
                                }
                              }
                              roleChangeHandler(
                                user._id,
                                prevRole,
                                "blacklisted"
                              );
                            }}
                            className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-cyan-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-md hover:from-cyan-600 hover:to-green-400 transition-colors duration-150"
                          >
                            <Ban size={13} /> Unblock
                          </button>
                        )}
                      </div>
                    )}

                    <Link
                      to={`/admin/dashboard/users/${user._id}?username=${user.fullname}&role=${user.role}`}
                      className="flex items-center gap-2 bg-gradient-to-r from-[#2B5476] to-[#3290B9] text-white px-2 py-1 rounded text-xs font-semibold shadow-md hover:from-[#3290B9] hover:to-[#2B5476] transition-colors duration-150"
                    >
                      Analytics
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 mb-[100px]">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-cyan-900 border border-cyan-700 text-cyan-100 font-semibold hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed shadow"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded font-semibold border transition-all duration-150 ${
              page === i + 1
                ? "bg-cyan-500 text-white border-cyan-500 shadow"
                : "bg-cyan-900 text-cyan-100 border-cyan-700 hover:bg-cyan-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-cyan-900 border border-cyan-700 text-cyan-100 font-semibold hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
