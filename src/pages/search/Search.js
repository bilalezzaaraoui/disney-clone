import styled from "styled-components";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AllMovies from "../../components/ui/AllMovies";

const Search = (props) => {
  const originalMovies = useSelector((state) => state.movie.allMovies);
  const [inputValue, setInputValue] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [movies, setMovies] = useState(originalMovies);

  console.log(movies);

  useEffect(() => {
    if (inputValue.length >= 1) {
      const filteredMovies = originalMovies
        .map((item) => item)
        .find((item) => {
          if (item.title.toLowerCase().startsWith(inputValue.toLowerCase())) {
            return item;
          }
        });
      console.log(filteredMovies);
      setMovies([filteredMovies]);
      setShowBtn(true);
    } else if (inputValue.length === 0) {
      setShowBtn(false);
      setMovies(originalMovies);
    }
  }, [inputValue]);

  const inputHandler = () => {
    setInputValue("");
    setShowBtn(false);
  };

  return (
    <Fragment>
      <Container>
        <InputLayout>
          <form>
            <input
              type="text"
              placeholder="Titre, personnage ou genre"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            {showBtn && (
              <button type="reset" onClick={() => inputHandler()}>
                <IoClose />
              </button>
            )}
          </form>
        </InputLayout>
        <LittleContainer>
          <AllMovies movies={movies} />
        </LittleContainer>
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  /* overflow-x: hidden; */
  display: block;
  top: 10px;
`;

const InputLayout = styled.div`
  position: fixed;
  width: 100vw;
  background-color: rgb(75, 78, 90);
  padding-top: 1rem;
  padding-bottom: 1rem;
  z-index: 20;

  form {
    display: flex;

    input {
      flex: 1;
      background-color: rgb(75, 78, 90);
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      outline: none;
      border: none;
      font-size: 44px;
      font-weight: 700;
      color: white;
      padding-left: calc(3.5vw + 24px);
      letter-spacing: 0.2px;
      line-height: 1.2;
      height: 60px;
      text-overflow: ellipsis;

      &::placeholder {
        color: rgb(168, 169, 173);
      }
    }

    button {
      margin-right: calc(3.5vw + 4px);
      background: none;
      border: none;
      cursor: pointer;

      svg {
        font-size: 2.5rem;
        color: rgb(168, 169, 173);
      }
    }
  }
`;

const LittleContainer = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 120px;
  padding: 0 calc(3.5vw + 5px);
  margin-top: 3.5rem;
`;

export default Search;
