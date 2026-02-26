import React, { useState } from "react";
import { useAuth } from "./authcontext";
import Sign from "./sign";
import Upload from "./upload";
import Gallery from "./gallery";

const App = () => {
  const { user, isAdmin } = useAuth();
  const [showGallery, setShowGallery] = useState(false);

  if (showGallery) return <Gallery onBack={() => setShowGallery(false)} />;

  return (
    <div className="app-shell">
      <Sign />
      {user && isAdmin && <Upload />}

      <button
  onClick={() => setShowGallery(true)}
  className="see-vouches-button"
>
  See Vouches
</button>
    </div>
  );
};

export default App;