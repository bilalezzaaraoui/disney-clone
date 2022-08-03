import styled from "styled-components";
import ImgDisney from "../../asset/images/viewers-disney.png";
import ImgMarvel from "../../asset/images/viewers-marvel.png";
import ImgNational from "../../asset/images/viewers-national.png";
import ImgPixar from "../../asset/images/viewers-pixar.png";
import ImgStarWars from "../../asset/images/viewers-starwars.png";
import ImgStars from "../../asset/images/viewers-star.png";
import VidDisney from "../../asset/videos/1564674844-disney.mp4";
import VidMarvel from "../../asset/videos/1564676115-marvel.mp4";
import VidNational from "../../asset/videos/1564676296-national-geographic.mp4";
import VidPixar from "../../asset/videos/1564676714-pixar.mp4";
import VidStarWars from "../../asset/videos/1608229455-star-wars.mp4";
import VidStars from "../../asset/videos/1608169994-brand-star.mp4";

const Viewers = () => {
  const images = [
    { image: ImgDisney, video: VidDisney },
    { image: ImgPixar, video: VidPixar },
    { image: ImgMarvel, video: VidMarvel },
    { image: ImgNational, video: VidNational },
    { image: ImgStarWars, video: VidStarWars },
    { image: ImgStars, video: VidStars },
  ];

  return (
    <Container>
      {images.map((item, key) => {
        return (
          <Wrap key={key}>
            <img src={item.image} alt="logo" />
            <video autoPlay muted loop={true} playsInline={true}>
              <source src={item.video} type="video/mp4" />
            </video>
          </Wrap>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  /* margin-top: 30px; */
  padding: 30px 0px 26px;
  display: grid;
  grid-gap: 15px;
  gap: 15px;
  grid-template-columns: repeat(6, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  background: linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42)) !important;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px --10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.2);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  video {
    /* width: 100%; */
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px --16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);

    video {
      opacity: 1;
    }
  }
`;
export default Viewers;
