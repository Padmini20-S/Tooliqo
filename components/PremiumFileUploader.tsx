"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File, CheckCircle2, Download, Share2, RefreshCw } from "lucide-react";

export default function PremiumFileUploader({ toolName }: { toolName?: string }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [processingState, setProcessingState] = useState<"idle" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startProcessing(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      startProcessing(e.target.files[0]);
    }
  };

  const startProcessing = (selectedFile: File) => {
    setFile(selectedFile);
    setProcessingState("processing");
    setProgress(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessingState("done");
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 400);
  };

  const reset = () => {
    setFile(null);
    setProcessingState("idle");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden p-8 sm:p-12">
      <AnimatePresence mode="wait">
        
        {processingState === "idle" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`relative w-full h-[400px] rounded-[20px] border-2 border-dashed flex flex-col items-center justify-center transition-colors cursor-pointer
              ${dragActive ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              multiple={false}
              onChange={handleChange}
              className="hidden"
              accept="*/*"
            />
            
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <UploadCloud className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Select your files</h3>
            <p className="text-slate-500 mb-8 max-w-md text-center px-4">
              Drag and drop your files here, or click to browse. Files are processed securely in your browser.
            </p>
            
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-sm transition-colors flex items-center gap-2">
              <File className="w-5 h-5" /> Browse Files
            </button>
          </motion.div>
        )}

        {processingState === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-[400px] flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 mb-8">
              {/* Spinning border */}
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"
              ></div>
              {/* Inner content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">{progress}%</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Processing {file?.name}...</h3>
            <p className="text-slate-500">Please wait while we apply the magic.</p>
          </motion.div>
        )}

        {processingState === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full min-h-[400px] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
              className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Task Completed!</h3>
            <p className="text-slate-500 mb-8 max-w-md text-center px-4">
              Your file <strong>{file?.name}</strong> has been successfully processed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
              <button 
                onClick={reset}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-colors"
              >
                <Download className="w-5 h-5" /> Download File
              </button>
              <div className="flex gap-4">
                <button 
                  onClick={reset}
                  className="flex items-center justify-center p-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors group"
                  title="Process another file"
                >
                  <RefreshCw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
                </button>
                <button 
                  className="flex items-center justify-center p-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors"
                  title="Share result"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
}
