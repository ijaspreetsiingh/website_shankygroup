 
import { useState } from "react";
import VideoPopup from "../../modals/video-popup";

const VideoAbout = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="video-section text-center">
        <div className="background-image" style={{ backgroundImage: `url(/assets/images/resource/video-bg.jpg)` }}></div>
        <div className="container">
          <div className="video-btn">
            <a onClick={() => setIsVideoOpen(true)}
              style={{ cursor: "pointer", zIndex: "99999" }} className="lightbox-image">
              <img src="assets/images/icons/icon-20.png" alt="" /></a>
          </div>
        </div>
      </section>
      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"Q5PG0rMXgvw"}
      />
      {/* video modal end */}
    </>
  );
};

export default VideoAbout;