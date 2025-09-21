
// import React, { useEffect, useState, useCallback } from "react";
// import { adminAPI } from "../../services/api";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { toast } from "react-hot-toast";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [search, setSearch] = useState("");

//   const fetchUsers = useCallback(async () => {
//     try {
//       const { users, total } = await adminAPI.getUsers({ page, limit: 10, search });
//       setUsers(users);
//       setTotal(total);
//     } catch (err) {
//       toast.error("Failed to fetch users");
//     }
//   }, [page, search]);

//   const toggleActive = async (id, isActive) => {
//     try {
//       await adminAPI.updateUser(id, { is_active: !isActive });
//       toast.success(`User ${!isActive ? "activated" : "deactivated"}`);
//       fetchUsers();
//     } catch (err) {
//       toast.error("Failed to update user");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//         <h2 className="text-2xl font-bold">User Management</h2>

//         <div className="flex items-center gap-2 w-full md:w-72">
//           <Search className="w-4 h-4 text-gray-500 absolute ml-3" />
//           <Input
//             placeholder="Search by email..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="pl-9"
//           />
//         </div>
//       </div>

//       <p className="text-sm text-gray-500">
//         Showing page <span className="font-medium">{page}</span> of{" "}
//         <span className="font-medium">{Math.ceil(total / 10) || 1}</span> —{" "}
//         total users: {total}
//       </p>

//       {/* Desktop table */}
//       <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm border bg-white">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="p-3 text-left font-medium">Email</th>
//               <th className="p-3 text-left font-medium">Role</th>
//               <th className="p-3 text-left font-medium">Status</th>
//               <th className="p-3 text-left font-medium">Active</th>
//               <th className="p-3 text-left font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">{u.email}</td>
//                 <td className="p-3">
//                   <Badge variant="secondary">{u.role}</Badge>
//                 </td>
//                 <td className="p-3">
//                   <Badge variant={u.status === "verified" ? "success" : "destructive"}>
//                     {u.status}
//                   </Badge>
//                 </td>
//                 <td className="p-3">
//                   {u.is_active ? (
//                     <Badge variant="success">Active</Badge>
//                   ) : (
//                     <Badge variant="outline">Inactive</Badge>
//                   )}
//                 </td>
//                 <td className="p-3">
//                   <Button
//                     size="sm"
//                     variant={u.is_active ? "destructive" : "default"}
//                     onClick={() => toggleActive(u.id, u.is_active)}
//                   >
//                     {u.is_active ? "Deactivate" : "Activate"}
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile cards */}
//       <div className="space-y-4 md:hidden">
//         {users.map((u) => (
//           <Card key={u.id}>
//             <CardHeader>
//               <CardTitle className="text-sm font-medium">{u.email}</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <p className="text-xs text-gray-500">
//                 <span className="font-semibold">Role:</span> {u.role}
//               </p>
//               <p className="text-xs text-gray-500">
//                 <span className="font-semibold">Status:</span>{" "}
//                 <Badge variant={u.status === "verified" ? "success" : "destructive"}>
//                   {u.status}
//                 </Badge>
//               </p>
//               <p className="text-xs text-gray-500">
//                 <span className="font-semibold">Active:</span>{" "}
//                 {u.is_active ? (
//                   <Badge variant="success">Yes</Badge>
//                 ) : (
//                   <Badge variant="outline">No</Badge>
//                 )}
//               </p>
//               <Button
//                 size="sm"
//                 variant={u.is_active ? "destructive" : "default"}
//                 onClick={() => toggleActive(u.id, u.is_active)}
//                 className="w-full"
//               >
//                 {u.is_active ? "Deactivate" : "Activate"}
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between pt-4 border-t">
//         <Button
//           variant="outline"
//           size="sm"
//           disabled={page === 1}
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//         >
//           <ChevronLeft className="w-4 h-4 mr-1" /> Prev
//         </Button>
//         <span className="text-sm text-gray-500">
//           Page {page} of {Math.ceil(total / 10) || 1}
//         </span>
//         <Button
//           variant="outline"
//           size="sm"
//           disabled={page >= Math.ceil(total / 10)}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           Next <ChevronRight className="w-4 h-4 ml-1" />
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback } from "react";
import { adminAPI } from "../../services/api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { toast } from "react-hot-toast";
import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const roles = ["all", "admin", "user", "moderator"];

  // fetch users
  const fetchUsers = useCallback(
    async (searchTerm = search, role = roleFilter) => {
      try {
        const { users, total } = await adminAPI.getUsers({
          page,
          limit: 10,
          search: searchTerm,
          role: role !== "all" ? role : undefined,
        });
        setUsers(users);
        setTotal(total);
      } catch (err) {
        toast.error("Failed to fetch users");
      }
    },
    [page, search, roleFilter]
  );

  // toggle active
  const toggleActive = async (id, isActive) => {
    try {
      // optimistic UI update
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, is_active: !isActive } : u
        )
      );
      await adminAPI.updateUser(id, { is_active: !isActive });
      toast.success(`User ${!isActive ? "activated" : "deactivated"}`);
    } catch (err) {
      toast.error("Failed to update user");
      fetchUsers();
    }
  };

  // debounce search + role filter
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers(search, roleFilter);
    }, 500);
    return () => clearTimeout(delay);
  }, [search, page, roleFilter, fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-2xl font-bold">User Management</h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Role filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{Math.ceil(total / 10) || 1}</span> —{" "}
        total users: {total}
      </p>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm border bg-card text-card-foreground">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="p-3 text-left font-medium">Email</th>
              <th className="p-3 text-left font-medium">Role</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">Active</th>
              <th className="p-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-muted/30">
                <td className="p-3 break-all">{u.email}</td>
                <td className="p-3">
                  <Badge variant="secondary">{u.role}</Badge>
                </td>
                <td className="p-3">
                  <Badge
                    variant={u.status === "verified" ? "success" : "destructive"}
                  >
                    {u.status}
                  </Badge>
                </td>
                <td className="p-3">
                  {u.is_active ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="destructive">Inactive</Badge>
                  )}
                </td>
                <td className="p-3">
                  <Button
                    size="sm"
                    variant={u.is_active ? "destructive" : "default"}
                    onClick={() => toggleActive(u.id, u.is_active)}
                  >
                    {u.is_active ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {users.map((u) => (
          <Card key={u.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm font-medium break-all">
                {u.email}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Role:</span>
                <Badge variant="secondary">{u.role}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <Badge
                  variant={u.status === "verified" ? "success" : "destructive"}
                >
                  {u.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Active:</span>
                {u.is_active ? (
                  <Badge variant="success">Yes</Badge>
                ) : (
                  <Badge variant="destructive">No</Badge>
                )}
              </div>
              <Button
                size="sm"
                variant={u.is_active ? "destructive" : "default"}
                onClick={() => toggleActive(u.id, u.is_active)}
                className="w-full"
              >
                {u.is_active ? "Deactivate" : "Activate"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Prev
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {Math.ceil(total / 10) || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= Math.ceil(total / 10)}
          onClick={() => setPage((p) => p + 1)}
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
