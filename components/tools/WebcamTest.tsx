"use client";

import React, { useState, useRef, useEffect } from "react";
import { Camera, CameraOff, Video } from "lucide-react";

export default function WebcamTest() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      setError(err.message || "Unable to access the webcam. Please grant permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stream]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
      <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        <Camera className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Webcam Tester</h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        Test your webcam directly in the browser to ensure it's working properly before meetings. We do not record or save your video.
      </p>

      <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video relative flex items-center justify-center mb-6 shadow-inner">
        {stream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-slate-500 flex flex-col items-center">
            <Video className="w-12 h-12 mb-2 opacity-50" />
            <p>Camera is currently off</p>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!stream ? (
          <button
            onClick={startCamera}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-sm transition-colors flex items-center gap-2"
          >
            <Camera className="w-5 h-5" /> Test My Webcam
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="px-8 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full font-semibold transition-colors flex items-center gap-2"
          >
            <CameraOff className="w-5 h-5" /> Stop Camera
          </button>
        )}
      </div>
    </div>
  );
}
