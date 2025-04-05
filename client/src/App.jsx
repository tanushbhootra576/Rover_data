import RoverStatus from "./components/RoverStatus";
import RoverControls from "./components/RoverControls";
import "./App.css";
import IframeComponent from "./components/iframe";
import { useState } from "react";
import img2 from "./assets/images/image2.jpg";
import img1 from "./assets/images/image1.jpg";

function App() {
    const [showGallery, setShowGallery] = useState(false);

    return (
        <div className="app-container">
            <h1>Rover Control Panel</h1>
            <div className="abra">           
                <div className="temp1"> 
                    <RoverStatus />
                    <RoverControls />
                </div>
                <div className="temp2">
                    <IframeComponent />
                </div>
            </div>
            
            <button className="gallery-button" onClick={() => setShowGallery(!showGallery)}>
                {showGallery ? "Hide Gallery" : "Show Gallery"}
            </button>
            
            {showGallery && (
                <div className="gallery">
                  
<img src={img1} alt="Gallery Image 1" />
<img src={img2} alt="Gallery Image 2" />


<video controls width="600">
  <source src="/videos/roverVideo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>



                </div>
            )}
        </div>
    );
}

export default App;