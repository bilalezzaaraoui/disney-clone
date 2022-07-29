/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase";
import { movieAction } from "../../store/movieSlice/movieSlice";

// Components
import HomeBg from "../../asset/images/home-background.png";
import ImgSlider from "../../components/ui/ImgSlider";
import NewDisney from "../../components/ui/NewDisney";
import Originals from "../../components/ui/Originals";
import Recommends from "../../components/ui/Recommends";
import Trending from "../../components/ui/Trending";
import Viewers from "../../components/ui/Viewers";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  // const newRecommend = useSelector((state) => state.movie.recommended);
  // const newNewDisney = useSelector((state) => state.movie.newDisney);
  // const newOriginals = useSelector((state) => state.movie.originals);
  // const newTrending = useSelector((state) => state.movie.trending);
  let recommended = [];
  let arrDisney = [];
  let originals = [];
  let trending = [];

  // console.log(newRecommend);
  // console.log(newNewDisney);
  // console.log(newOriginals);
  // console.log(newTrending);

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        // console.log(recommended);
        switch (doc.data().type) {
          case "recommend":
            recommended = [...recommended, { id: doc.id, ...doc.data() }];
            // recommended.push({ id: doc.id, ...doc.data() });
            break;
          case "new":
            arrDisney = [...arrDisney, { id: doc.id, ...doc.data() }];
            // arrDisney.push({ id: doc.id, ...doc.data() });
            break;
          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            // originals.push({ id: doc.id, ...doc.data() });
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            // trending.push({ id: doc.id, ...doc.data() });
            break;
        }
      });

      dispatch(
        movieAction.setMovies({
          recommended: recommended,
          newDisney: arrDisney,
          original: originals,
          trending: trending,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
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
