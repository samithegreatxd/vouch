import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref as dbRef, onValue } from "firebase/database";
import "./Vouch.css";

const Vouch = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imagesRef = dbRef(db, "images");

    // Listen for live updates
    const unsubscribe = onValue(imagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const imgList = Object.values(data).map((item) => item.url);
        setImages(imgList);
      } else {
        setImages([]);
      }
    });

    return () => unsubscribe(); // clean up listener
  }, []);

  return (
    <div className="vouch-shell">
      <div className="vouch-gallery">
        {images.length === 0 && <p className="vouch-empty">No photos uploaded yet.</p>}
        {images.map((img, idx) => (
          <div key={idx} className="vouch-image-card">
            <img src={img} alt={`upload-${idx}`} className="vouch-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vouch;