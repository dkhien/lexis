import React from 'react';
import BGvideo from '../../assets/images/BGvideo.mp4';

function VideoBackground() {
  return (
    <div width="100%" height="100vh">
      <video src={BGvideo} autoPlay loop muted width="100%" height="100%" />
    </div>
  );
}

export default VideoBackground;
