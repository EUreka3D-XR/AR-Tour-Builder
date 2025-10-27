import ReactPlayer from "react-player";

function Video({ src }) {
  return (
    <ReactPlayer
      src={src}
      controls
      controlsList="nodownload"
      width="100%"
      height="100%"
    />
  );
}

export default Video;
