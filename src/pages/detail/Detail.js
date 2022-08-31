import styled from "styled-components";
import ReactDOM from "react-dom";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import PlayBlack from "../../asset/images/play-icon-black.png";
import ModalVideo from "../../components/ui/ModalVideo";
import { HiUserGroup } from "react-icons/hi";

const Detail = (props) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    db.collection("movies")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDetailData(doc.data());
        } else {
          console.log("no such document in firebase ");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [id]);

  return (
    <Fragment>
      <Container>
        <Background>
          <img src={detailData.backgroundImg} alt={detailData.title} />
        </Background>

        <ImageTitle>
          <img src={detailData.titleImg} alt={detailData.title} />
        </ImageTitle>
        <ContentMeta>
          <Controls>
            <Player onClick={() => setShowModal(true)}>
              <img src={PlayBlack} alt="" />
              <span>Play</span>
            </Player>
            <Trailer onClick={() => setShowModal(true)}>
              {/* <img src={PlayWhite} alt="" /> */}
              <span>Trailer</span>
            </Trailer>
            <FlexButton>
              <AddList>
                <span />
                <span />
              </AddList>
              <GroupWatch>
                <div>
                  <HiUserGroup />
                </div>
              </GroupWatch>
            </FlexButton>
          </Controls>
          <SubTitle>{detailData.subTitle}</SubTitle>
          <Description>{detailData.description}</Description>
        </ContentMeta>
      </Container>
      {showModal &&
        ReactDOM.createPortal(
          <ModalVideo
            closeModal={setShowModal}
            youtubeUrl={detailData.youtubeUrl}
          />,
          document.getElementById("modal-video")
        )}
    </Fragment>
  );
};

const Container = styled.div`
  position: relative;
  /* min-height: calc(100vh - 250px); */
  overflow-x: hidden;
  display: block;
  margin-top: 72px;
  padding: 0 calc(3.5vw + 5px);

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Background = styled.div`
  left: 0;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      height: auto;
    }
  }

  @media (max-width: 768px) {
    position: static;
  }
`;

const ImageTitle = styled.div`
  align-items: center;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  min-height: 170px;
  padding: 24px 0;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }

  @media (max-width: 768px) {
    justify-content: center;
    position: relative;
    /* top: -100px; */
    margin-top: -100px;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;

  @media (max-width: 768px) {
  }
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;

  @media (max-width: 768px) {
    /* margin: -100px 0px 0; */
    margin: 0;
    justify-content: center;
    flex-direction: column;
  }
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  transition: 0.3s;

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    width: 80%;
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0;

    img {
      width: 25px;
    }

    span {
      font-size: 1rem;
      font-weight: bold;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    display: none;
  }
`;

const FlexButton = styled.div`
  display: flex;
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50px;
  border: 2px solid white;
  cursor: pointer;
  transition: 0.3s;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 3px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
      border-radius: 1px;
    }

    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 3px;
      border-radius: 1px;
    }
  }

  &:hover {
    background-color: #fff;

    span {
      background-color: black;
    }
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;
  transition: 0.3s;

  div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 1.5rem;
    }
  }

  &:hover {
    div {
      background-color: #fff;

      svg {
        color: black;
      }
    }
  }
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0.5rem auto 0;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 15px;
    width: 90%;
    margin: 0.5rem auto 0;
  }
`;

export default Detail;
