import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const ModalVideo = (props) => {
  return (
    <Container>
      <VideoLayout>
        <button onClick={() => props.closeModal()}>
          <IoClose />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${props.youtubeUrl}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </VideoLayout>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoLayout = styled.div`
  position: relative;
  width: 80%;
  height: fit-content;
  max-width: 800px;

  button {
    position: absolute;
    top: -40px;
    right: 0;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;

    svg {
      color: white;
    }
  }

  iframe {
    width: 100%;
    height: 50vh;
  }
`;

export default ModalVideo;
