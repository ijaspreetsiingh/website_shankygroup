import ModalVideo from "react-modal-video"; 
import "react-modal-video/css/modal-video.css";  


const VideoPopup = ({
  isVideoOpen,
  setIsVideoOpen,
  videoId = "Q5PG0rMXgvw", 
  
}:any ) => {
  return (
    <>
      <ModalVideo
        channel="youtube"
        // autoplay
        isOpen={isVideoOpen}
        videoId={videoId}
        onClose={() => setIsVideoOpen(false)}
      />
    </>
  );
};

export default VideoPopup;

