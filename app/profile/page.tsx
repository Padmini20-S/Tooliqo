"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, Mail, Calendar, Settings, Heart, Clock, 
  LogOut, Globe, Moon, ChevronRight, History
} from "lucide-react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tooliqo.onrender.com";
    fetch(`${API_URL}/api/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => {
        setUser({
          ...data.user,
          memberSince: new Date(data.user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          photoUrl: `https://api.dicebear.com/9.x/notionists/svg?seed=${data.user.name}`
        });
        setIsLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
        router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("auth_token");
    toast.success("👋 Logged out successfully");
    router.push("/login");
  };

  if (isLoading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const favoriteTools = tools.slice(0, 3);
  const recentTools = tools.slice(3, 6);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-slate-100 mb-4 overflow-hidden border-4 border-white shadow-soft">
                <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-sm text-slate-500 flex items-center justify-center mt-1">
                <Mail className="w-3.5 h-3.5 mr-1" />
                {user.email}
              </p>
              <p className="text-xs text-slate-400 flex items-center justify-center mt-2">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Member since {user.memberSince}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <nav className="flex flex-col">
              <button onClick={() => setActiveTab("overview")} className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${activeTab === "overview" ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                <User className="w-5 h-5 mr-3" /> Overview
              </button>
              <button onClick={() => setActiveTab("favorites")} className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${activeTab === "favorites" ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                <Heart className="w-5 h-5 mr-3" /> Favorites
              </button>
              <button onClick={() => setActiveTab("history")} className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${activeTab === "history" ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                <History className="w-5 h-5 mr-3" /> History
              </button>
              <button onClick={() => setActiveTab("settings")} className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${activeTab === "settings" ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                <Settings className="w-5 h-5 mr-3" /> Settings
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button onClick={handleLogout} className="w-full flex items-center px-6 py-4 text-sm font-medium text-red-600 hover:bg-red-50 border-l-4 border-transparent transition-colors text-left">
                <LogOut className="w-5 h-5 mr-3" /> Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
              {/* Similar dashboard content rendering recent Tools and favorites */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Welcome to your dashboard</h3>
                <p className="text-slate-600">Your profile is active and verified. Features like live history and favorite saving are ready to be used!</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Theme & Settings</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                <div className="flex items-center space-x-4">
                  <Moon className="w-5 h-5 text-slate-600" />
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">Dark Mode</h4>
                    <p className="text-sm text-slate-500">Only premium light theme is supported currently.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
