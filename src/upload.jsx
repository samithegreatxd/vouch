import React, { useState } from "react";
import { useAuth } from "./authcontext";
import { db } from "./firebase";
import { ref as dbRef, push, set } from "firebase/database";
import "./Upload.css";

const Upload = () => {
  const { user, isAdmin } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="upload-shell">
        <div className="upload-card">
          <h1 className="upload-title">Access Denied</h1>
          <p className="upload-description">Only Sami can upload photos.</p>
        </div>
      </div>
    );
  }

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    setLoading(true);

    try {
      // Convert image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64String = reader.result;

        // Save to Firebase Realtime Database
        const imagesRef = dbRef(db, "images");
        const newImageRef = push(imagesRef);
        await set(newImageRef, {
          url: base64String,
          uploadedBy: user.email,
          timestamp: Date.now(),
        });

        alert("Upload successful!");
        setFile(null);
        setLoading(false);
      };
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="upload-shell">
      <div className="upload-card">
        <h1 className="upload-title">Upload Photo</h1>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="upload-input"
        />
        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default Upload;