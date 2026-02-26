import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref as dbRef, onValue } from "firebase/database";
import "./Gallery.css";

const Gallery = ({ onBack }) => {
  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    const imagesRef = dbRef(db, "images");

    const unsubscribe = onValue(imagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const imgList = Object.values(data).map((item) => ({
          url: item.url,
          uploadedBy: item.uploadedBy,
        }));
        setImages(imgList);
      } else {
        setImages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Open lightbox at a specific image
  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  const prevImage = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + images.length) % images.length,
    }));
  const nextImage = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % images.length,
    }));

  return (
    <div className="app-shell" style={{ padding: "2rem" }}>
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          padding: "0.6rem 1.2rem",
          borderRadius: "12px",
          border: "1px solid var(--accent-blue)",
          background: "rgba(12,22,38,0.6)",
          color: "var(--text-primary)",
          cursor: "pointer",
          boxShadow: "0 0 12px var(--accent-glow)",
          fontWeight: 600,
        }}
      >
        Back
      </button>

      <div className="vouch-gallery">
        {images.length === 0 && (
          <p className="vouch-empty">No photos uploaded yet.</p>
        )}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="vouch-image-card"
            onClick={() => openLightbox(idx)}
          >
            <h3 className="vouch-heading">Vouch {idx + 1}</h3>
            <img src={img.url} alt={`upload-${idx}`} className="vouch-image" />
          </div>
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightbox.open && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <img
            src={images[lightbox.index].url}
            alt={`zoom-${lightbox.index}`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
          />
          {/* Optional prev/next buttons */}
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            ‹
          </button>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;