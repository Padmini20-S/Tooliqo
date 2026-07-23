"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, Mail, Calendar, Settings, Heart, Clock, 
  LogOut, Globe, Moon, ChevronRight, History
} from "lucide-react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "July 2026",
    photoUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=John"
  };

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
              <button 
                onClick={() => setActiveTab("overview")}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "overview" 
                    ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" 
                    : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"
                }`}
              >
                <User className="w-5 h-5 mr-3" />
                Overview
              </button>
              <button 
                onClick={() => setActiveTab("favorites")}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "favorites" 
                    ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" 
                    : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"
                }`}
              >
                <Heart className="w-5 h-5 mr-3" />
                Favorites
              </button>
              <button 
                onClick={() => setActiveTab("history")}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "history" 
                    ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" 
                    : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"
                }`}
              >
                <History className="w-5 h-5 mr-3" />
                History
              </button>
              <button 
                onClick={() => setActiveTab("settings")}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "settings" 
                    ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600" 
                    : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
              
              <div className="border-t border-slate-100 my-1" />
              
              <Link 
                href="/"
                className="flex items-center px-6 py-4 text-sm font-medium text-red-600 hover:bg-red-50 border-l-4 border-transparent transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      Recently Used
                    </h3>
                    <button onClick={() => setActiveTab("history")} className="text-sm text-blue-600 hover:underline">View all</button>
                  </div>
                  <div className="space-y-3">
                    {recentTools.map((tool) => (
                      <Link href={`/tool/${tool.slug}`} key={tool.slug} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <span className="font-bold text-sm">T</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{tool.name}</p>
                            <p className="text-xs text-slate-500">2 hours ago</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      Favorites
                    </h3>
                    <button onClick={() => setActiveTab("favorites")} className="text-sm text-blue-600 hover:underline">View all</button>
                  </div>
                  <div className="space-y-3">
                    {favoriteTools.map((tool) => (
                      <Link href={`/tool/${tool.slug}`} key={tool.slug} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                            <Heart className="w-5 h-5 fill-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{tool.name}</p>
                            <p className="text-xs text-slate-500">{tool.category}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Your Favorite Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {favoriteTools.map((tool, index) => (
                  <ToolCard key={tool.slug} tool={tool} index={index} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Usage History</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {recentTools.map((tool, idx) => (
                    <div key={tool.slug} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start sm:items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                          <History className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-slate-900">{tool.name}</h4>
                          <p className="text-sm text-slate-500 mt-1">{tool.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 pl-16 sm:pl-0">
                        <span className="text-xs text-slate-400">{idx === 0 ? "2 hours ago" : idx === 1 ? "Yesterday" : "Last week"}</span>
                        <Link href={`/tool/${tool.slug}`} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                          Open Tool
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Theme & Settings</h2>
              
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                        <Moon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-900">Dark Mode</h4>
                        <p className="text-sm text-slate-500">We currently only support a premium light theme.</p>
                      </div>
                    </div>
                    <div>
                      <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-not-allowed opacity-50">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-slate-900">Language</h4>
                        <p className="text-sm text-slate-500">Select your preferred language.</p>
                      </div>
                    </div>
                    <div>
                      <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
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
