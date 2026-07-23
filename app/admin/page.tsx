"use client";

import React, { useState, useEffect } from "react";
import { Users, Upload, ShieldCheck, Search, Image as ImageIcon, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Remove MOCK_USERS since we will fetch from DB now.
export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Load any custom photos we've saved in localStorage
    const savedPhotos: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("custom_photo_")) {
        savedPhotos[key.replace("custom_photo_", "")] = localStorage.getItem(key) || "";
      }
    }
    setCustomPhotos(savedPhotos);
    
    // Fetch users from our new DB endpoint
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tooliqo.onrender.com";
    fetch(`${API_URL}/api/admin/users`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.users) {
        const formattedUsers = data.users.map((u: any) => ({
          id: u._id,
          name: u.name,
          email: u.email,
          role: u.role || "user",
          joined: new Date(u.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        }));
        setUsers(formattedUsers);
      }
    })
    .catch(console.error)
    .finally(() => {
      setIsLoading(false);
    });

  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, email: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit for base64 storage
      toast.error("Image too large. Please use an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      
      // Save to local state
      setCustomPhotos(prev => ({ ...prev, [email]: base64String }));
      
      // Save to "Database" (localStorage simulation)
      localStorage.setItem(`custom_photo_${email}`, base64String);
      
      toast.success(`Profile photo updated for ${email}`);
      setSelectedUser(null);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (email: string) => {
    const newPhotos = { ...customPhotos };
    delete newPhotos[email];
    setCustomPhotos(newPhotos);
    localStorage.removeItem(`custom_photo_${email}`);
    toast.success("Custom photo removed");
    setSelectedUser(null);
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
            <p className="text-slate-500 mt-2">Manage users and platform settings</p>
          </div>
          
          <div className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Registered Users</p>
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
                  const hasCustomPhoto = !!customPhotos[user.email];
                  const photoUrl = hasCustomPhoto 
                    ? customPhotos[user.email] 
                    : `https://api.dicebear.com/9.x/notionists/svg?seed=${user.name}`;

                  return (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm relative shrink-0">
                            <img src={photoUrl} alt={user.name} className="w-full h-full object-cover" />
                            {hasCustomPhoto && (
                              <div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 line-clamp-1">{user.name}</p>
                            <p className="text-sm text-slate-500 line-clamp-1">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                        {user.joined}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm inline-flex items-center gap-2 ml-auto whitespace-nowrap"
                        >
                          <ImageIcon className="w-4 h-4" />
                          Change Photo
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

      {/* Photo Upload Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Update Profile Photo</h3>
                <p className="text-sm text-slate-500 mt-1">For {selectedUser.name}</p>
              </div>
            </div>
            
            <div className="p-8 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 mb-6 relative group bg-slate-50">
                <img 
                  src={customPhotos[selectedUser.email] || `https://api.dicebear.com/9.x/notionists/svg?seed=${selectedUser.name}`} 
                  alt="Current" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload className="w-6 h-6 text-white mb-1" />
                  <span className="text-xs font-semibold text-white">Upload</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  onChange={(e) => handlePhotoUpload(e, selectedUser.email)}
                />
              </div>

              <div className="w-full flex gap-3">
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                {customPhotos[selectedUser.email] && (
                  <button 
                    onClick={() => removePhoto(selectedUser.email)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
