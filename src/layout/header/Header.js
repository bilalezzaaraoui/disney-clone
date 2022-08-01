/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, Fragment } from "react";
import styled from "styled-components";
import LogoImg from "../../asset/images/logo.svg";
import HomeIcon from "../../asset/images/home-icon.svg";
import MovieIcon from "../../asset/images/movie-icon.svg";
import OriginalIcon from "../../asset/images/original-icon.svg";
import SearchIcon from "../../asset/images/search-icon.svg";
import SeriesIcon from "../../asset/images/series-icon.svg";
import WatchlistIcon from "../../asset/images/watchlist-icon.svg";
import { auth, provider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice/userSlice";
import { Link } from "react-router-dom";

const Header = (props) => {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.user.login);
  const username = useSelector((state) => state.user.name);
  const userPhoto = useSelector((state) => state.user.photo);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleAuth = () => {
    if (!username) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => console.log(error.message));
    } else if (username) {
      auth.signOut().then(() => {
        dispatch(userActions.setSignOutState());
      });
    }
  };

  const setUser = (user) => {
    dispatch(
      userActions.setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src={LogoImg} alt="" />
      </Logo>
      {!username ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <Fragment>
          <NavMenu>
            <Link to="/home">
              <img src={HomeIcon} alt="Home" />
              <span>Home</span>
            </Link>
            <Link to="/search">
              <img src={SearchIcon} alt="Home" />
              <span>Search</span>
            </Link>
            <a>
              <img src={WatchlistIcon} alt="Home" />
              <span>Watchlist</span>
            </a>
            <a>
              <img src={OriginalIcon} alt="Home" />
              <span>Originals</span>
            </a>
            <a>
              <img src={MovieIcon} alt="Home" />
              <span>Movies</span>
            </a>
            <a>
              <img src={SeriesIcon} alt="Home" />
              <span>Series</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={username} />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </Fragment>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 300;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0px 12px;
    cursor: pointer;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px 2px 5px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgb(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background-color: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 130px;
  text-align: center;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  z-index: 200;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
