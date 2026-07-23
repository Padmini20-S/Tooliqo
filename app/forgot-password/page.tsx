"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tooliqo.onrender.com";
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.message || "Failed to send OTP");
      } else {
        toast.success("OTP sent to your email");
        setStep(2);
      }
    } catch (error) {
      toast.error("Network Error: Something went wrong.");
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp.length < 6 || formData.newPassword.length < 8) {
      toast.error("Please enter a valid OTP and a password of at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tooliqo.onrender.com";
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp, newPassword: formData.newPassword }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.message || "Invalid OTP");
      } else {
        toast.success("✅ Password reset successfully. You can now log in.");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Network Error: Something went wrong.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/">
            <img src="/icon.png" alt="Tooliqo Logo" className="w-14 h-14 rounded-2xl object-contain drop-shadow-sm hover:scale-105 transition-transform" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Remembered your password?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            Log in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white py-8 px-4 shadow-card sm:rounded-[24px] sm:px-10 border border-slate-200">
          
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSendOTP}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                <div className="mt-2 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email" name="email" type="email" required
                    value={formData.email} onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70">
                {isLoading ? "Sending..." : "Send Reset OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-slate-700">Enter 6-digit OTP</label>
                <div className="mt-2 relative rounded-xl shadow-sm">
                  <input
                    id="otp" name="otp" type="text" required maxLength={6}
                    value={formData.otp} onChange={handleChange}
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold tracking-widest text-lg"
                    placeholder="------"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700">New Password</label>
                <div className="mt-2 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="newPassword" name="newPassword" type={showPassword ? "text" : "password"} required
                    value={formData.newPassword} onChange={handleChange}
                    className="block w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-1 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Minimum 8 characters
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70">
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
