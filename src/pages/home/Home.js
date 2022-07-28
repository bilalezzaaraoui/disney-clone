import styled from "styled-components";
import HomeBg from "../../asset/images/home-background.png";
import ImgSlider from "../../components/ui/ImgSlider";

const Home = (props) => {
  return (
    <Container>
      <ImgSlider />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh- 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url(${HomeBg}) center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
