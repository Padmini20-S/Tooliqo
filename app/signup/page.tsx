"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtpArr = formData.otp.split("");
    newOtpArr[index] = value;
    const newOtp = newOtpArr.join("");
    setFormData({ ...formData, otp: newOtp });
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields.");
      return;
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setStep(3); // Let's create password first, then send OTP. Wait, spec says: Step 1 Name/Email, Step 2 OTP, Step 3 Password.
    // If we follow spec exactly: Step 1 -> Step 2 (OTP). But we need password to create the user account!
    // The previous design in the chat had Step 3 Create Password. 
    // Let's adjust logic: 
    // Usually, you send OTP at Step 1, verify at Step 2, create password at Step 3.
    // Let's modify slightly: We ask for Name, Email, Password all at once (Step 1 -> 3 flow, then verify OTP).
    // I will adjust the UI flow to match API: 
  };

  // Re-adjusting the flow logic based on our API:
  // We need to send name, email, password to /api/auth/signup to trigger the OTP email.
  // So Step 1: Name, Email. Step 2: Password. Then API call. Step 3: Verify OTP.
  // I will restructure it so Step 1 gathers everything, or Step 1 (Name, Email), Step 2 (Password) -> API -> Step 3 (Verify).

  const handleContinueToPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields.");
      return;
    }
    setStep(2);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Network Error");
      } else {
        toast.success("OTP sent to your email");
        setStep(3); // Move to OTP verification
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp.length < 6) {
      toast.error("Please enter complete OTP");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Invalid OTP");
      } else {
        toast.success("🎉 Account created successfully. Your email has been verified. Welcome to Tooliqo.");
        router.push("/profile");
      }
    } catch (error) {
      toast.error("Network Error");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-soft">
            T
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8 px-4">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
            <div className={`w-16 h-1 mx-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
            <div className={`w-16 h-1 mx-2 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
          </div>
        </div>

        <div className="bg-white py-8 px-4 shadow-card sm:rounded-[24px] sm:px-10 border border-slate-200">
          
          {step === 1 && (
            <form onSubmit={handleContinueToPassword} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                <div className="mt-2 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="name" name="name" type="text" required
                    value={formData.name} onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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

              <button type="submit" className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Create Password</label>
                <div className="mt-2 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password" name="password" type={showPassword ? "text" : "password"} required
                    value={formData.password} onChange={handleChange}
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Confirm Password</label>
                <div className="mt-2 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required
                    value={formData.confirmPassword} onChange={handleChange}
                    className="block w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="p-1 text-slate-400 hover:text-slate-600">
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
                <button type="button" onClick={() => setStep(1)} className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                  Back
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6 text-center">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Email Verification</h3>
                <p className="mt-2 text-sm text-slate-500">
                  We've sent a 6-digit one-time password (OTP) to <strong>{formData.email}</strong>.
                </p>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={formData.otp[index] || ""}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-xl font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ))}
              </div>

              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3.5 px-4 mt-8 rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70">
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
