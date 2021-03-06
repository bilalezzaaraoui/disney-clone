/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImgBadging from "../../asset/images/slider-badging.jpg";
import ImgScale from "../../asset/images/slider-scale.jpg";
import ImgBadag from "../../asset/images/slider-badag.jpg";
import ImgScales from "../../asset/images/slider-scales.jpg";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const images = [ImgBadging, ImgScale, ImgBadag, ImgScales];
  return (
    <div>
      <Carousel {...settings}>
        {images.map((item, key) => (
          <Wrap key={key}>
            <a>
              <img src={item} alt="" />
            </a>
          </Wrap>
        ))}
      </Carousel>
    </div>
  );
};

const Carousel = styled(Slider)`
  margin-top: 20px;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  .slick-dots {
    position: static;
  }

  ul {
    li button {
      &:before {
        font-size: 12px;
        color: rgb(150, 158, 171);
      }
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

export default ImgSlider;
