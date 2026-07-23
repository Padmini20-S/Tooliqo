"use client";

import React, { useState, useEffect } from "react";
import { Users, Upload, ShieldCheck, Search, CheckCircle, Edit } from "lucide-react";
import { toast } from "sonner";

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // State for the edit modal form
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhoto, setEditPhoto] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tooliqo.onrender.com";

  const fetchUsers = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    
    fetch(`${API_URL}/api/admin/users`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    .then(async (res) => {
      if (res.status === 403) {
        toast.error("Access Denied: You are not an Admin");
        window.location.href = "/";
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (data && data.users) {
        setUsers(data.users);
      }
    })
    .catch(console.error)
    .finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhoto(user.photo || null);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { 
      toast.error("Image too large. Please use an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setEditPhoto(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("auth_token");
    
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          photo: editPhoto
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success("User updated successfully in Database!");
        setSelectedUser(null);
        fetchUsers(); // Refresh the list
      } else {
        toast.error(data.message || "Failed to update user");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
              Admin Dashboard
            </h1>
            <p className="text-slate-500 mt-2">Manage users and database records in real-time</p>
          </div>
          
          <div className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Real Database Users</p>
              <h2 className="text-2xl font-bold text-slate-900">{users.length}</h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
            <div className="relative w-72">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Joined Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => {
                  const photoUrl = user.photo || `https://api.dicebear.com/9.x/notionists/svg?seed=${user.name}`;

                  return (
                    <tr key={user._id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm shrink-0">
                            <img src={photoUrl} alt={user.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 line-clamp-1">{user.name}</p>
                            <p className="text-sm text-slate-500 line-clamp-1">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                          {(user.role || 'user').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => openEditModal(user)}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm inline-flex items-center gap-2 ml-auto whitespace-nowrap"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Edit User Details</h3>
              <p className="text-sm text-slate-500 mt-1">Make real changes to the database</p>
            </div>
            
            <div className="p-6 space-y-5">
              
              <div className="flex flex-col items-center mb-2">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 mb-3 relative group bg-slate-50">
                  <img 
                    src={editPhoto || `https://api.dicebear.com/9.x/notionists/svg?seed=${editName}`} 
                    alt="Current" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Upload className="w-6 h-6 text-white mb-1" />
                    <span className="text-xs font-semibold text-white">Change</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    onChange={handlePhotoUpload}
                  />
                </div>
                {editPhoto && (
                  <button 
                    onClick={() => setEditPhoto(null)}
                    className="text-xs font-semibold text-red-500 hover:text-red-600"
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                />
              </div>

            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
              <button 
                onClick={() => setSelectedUser(null)}
                disabled={isSaving}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={saveChanges}
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70"
              >
                {isSaving ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Save to DB
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
