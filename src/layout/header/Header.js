/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, Fragment, useState } from "react";
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
  const username = useSelector((state) => state.user.name);
  const userPhoto = useSelector((state) => state.user.photo);

  const [isProfil, setIsProfil] = useState(false);

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

  const dropdown = {
    showDropdown: {
      signOut: {
        backgroundColor: "rgba(19, 19, 19, 1)",
        borderBottom: "1px solid #404040",
        borderLeft: "1px solid #404040",
      },
      userInfo: {
        borderBottom: "1px solid #404040",
      },
      dropdown: {
        display: "flex",
      },
    },
    hideDropdown: {
      signOut: {
        backgroundColor: "rgba(19, 19, 19, 0)",
        borderBottom: "0px solid #404040",
        borderLeft: "0px solid #404040",
      },
      userInfo: {
        borderBottom: "0px",
      },
      dropdown: {
        display: "none",
      },
    },
  };

  const [dimension, setDimension] = useState(getWindowDimensions());
  const [bg, setBg] = useState(false);

  function getWindowDimensions() {
    const { scrollY } = window;
    return {
      scrollY,
    };
  }

  useEffect(() => {
    function handleResize() {
      setDimension(getWindowDimensions());
    }

    if (dimension.scrollY <= 5) {
      setBg(false);
    } else if (dimension.scrollY >= 6) {
      setBg(true);
    }

    window.addEventListener("scroll", handleResize);
    return () => window.removeEventListener("scroll", handleResize);
  }, [dimension.scrollY]);

  return (
    <NavNew
      style={bg ? { backgroundColor: "#090b13" } : { backgroundColor: "" }}
    >
      <LogoNew>
        <img src={LogoImg} alt="" />
      </LogoNew>
      {!username ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <Fragment>
          <NavMenuNew>
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
          </NavMenuNew>
          <SignOut
            style={
              isProfil
                ? dropdown.showDropdown.signOut
                : dropdown.hideDropdown.signOut
            }
            onMouseLeave={() => setIsProfil(false)}
          >
            <UserInfo
              style={
                isProfil
                  ? dropdown.showDropdown.userInfo
                  : dropdown.hideDropdown.userInfo
              }
            >
              <UserName>{username.split(" ")[0].toLowerCase()}</UserName>
              <ImgLayout>
                <UserImg
                  onMouseEnter={() => setIsProfil(true)}
                  src={userPhoto}
                  alt={username}
                />
              </ImgLayout>
            </UserInfo>
            <DropDown
              style={
                isProfil
                  ? dropdown.showDropdown.dropdown
                  : dropdown.hideDropdown.dropdown
              }
            >
              <Link to="search">
                <span>Search</span>
              </Link>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </Fragment>
      )}
    </NavNew>
  );

  // return (
  //   <Nav>
  //     <Logo>
  //       <img src={LogoImg} alt="" />
  //     </Logo>
  //     {!username ? (
  //       <Login onClick={handleAuth}>Login</Login>
  //     ) : (
  //       <Fragment>
  //         <NavMenu>
  //           <Link to="/home">
  //             <img src={HomeIcon} alt="Home" />
  //             <span>Home</span>
  //           </Link>
  //           <Link to="/search">
  //             <img src={SearchIcon} alt="Home" />
  //             <span>Search</span>
  //           </Link>
  //           <a>
  //             <img src={WatchlistIcon} alt="Home" />
  //             <span>Watchlist</span>
  //           </a>
  //           <a>
  //             <img src={OriginalIcon} alt="Home" />
  //             <span>Originals</span>
  //           </a>
  //           <a>
  //             <img src={MovieIcon} alt="Home" />
  //             <span>Movies</span>
  //           </a>
  //           <a>
  //             <img src={SeriesIcon} alt="Home" />
  //             <span>Series</span>
  //           </a>
  //         </NavMenu>
  //         <SignOut>
  //           <UserImg src={userPhoto} alt={username} />
  //           <DropDown>
  //             <span onClick={handleAuth}>Sign Out</span>
  //           </DropDown>
  //         </SignOut>
  //       </Fragment>
  //     )}
  //   </Nav>
  // );
};

const NavNew = styled.nav`
  width: 100%;
  position: fixed;
  height: 70px;
  /* background-color: #090b13; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 36px;
  letter-spacing: 16px;
  z-index: 300;
`;

// const NavOld = styled.nav`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 70px;
//   background-color: #090b13;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 36px;
//   letter-spacing: 16px;
//   z-index: 300;
// `;

const LogoNew = styled.a`
  display: inline-block;
  width: 80px;
  max-height: 70px;

  img {
    width: 100%;
  }
`;

// const Logo = styled.a`
//   padding: 0;
//   width: 80px;
//   margin-top: 4px;
//   max-height: 70px;
//   font-size: 0;
//   display: inline-block;

//   img {
//     display: block;
//     width: 100%;
//   }
// `;

const NavMenuNew = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 35px;

  a {
    display: flex;
    align-items: center;
    padding: 0px 20px;
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
      padding-left: 8px;
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

// const NavMenu = styled.div`
//   display: flex;
//   align-items: center;
//   flex-flow: row nowrap;
//   height: 100%;
//   justify-content: flex-end;
//   margin: 0px;
//   padding: 0px;
//   position: relative;
//   margin-right: auto;
//   margin-left: 25px;

//   a {
//     display: flex;
//     align-items: center;
//     padding: 0px 12px;
//     cursor: pointer;

//     img {
//       height: 20px;
//       min-width: 20px;
//       width: 20px;
//       z-index: auto;
//     }

//     span {
//       color: rgb(249, 249, 249);
//       font-size: 13px;
//       text-transform: uppercase;
//       letter-spacing: 1.42px;
//       line-height: 1.08;
//       padding: 2px 0px 2px 5px;
//       white-space: nowrap;
//       position: relative;

//       &:before {
//         background-color: rgb(249, 249, 249);
//         border-radius: 0px 0px 4px 4px;
//         bottom: -6px;
//         content: "";
//         height: 2px;
//         left: 0px;
//         opacity: 0;
//         position: absolute;
//         right: 0px;
//         transform-origin: left center;
//         transform: scaleX(0);
//         transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
//         visibility: hidden;
//         width: auto;
//       }
//     }

//     &:hover {
//       span:before {
//         transform: scaleX(1);
//         visibility: visible;
//         opacity: 1 !important;
//       }
//     }
//   }

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

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

const DropDown = styled.div`
  /* position: absolute;
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
  opacity: 0; */
  padding: 10px 0;
  letter-spacing: normal;
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 0.6rem;
  }
`;

const SignOut = styled.div`
  width: 180px;
  z-index: 200;
  position: relative;
  align-self: flex-start;
  border-radius: 0 0 0 5px;
  padding-left: 1rem;

  span {
    cursor: pointer;
  }
`;

const UserInfo = styled.div`
  // Hover

  // ----
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding-right: 20px;
  transition: 0.3s;

  &:hover {
    ${DropDown} {
      display: none;
      /* background-color: rgba(19, 19, 19, 0);
    border: 0px solid #404040;
    z-index: 0; */
    }
  }
`;

const UserImg = styled.img`
  /* padding: 1rem 0; */
  transition: 0.3s;
  cursor: pointer;
  height: 100%;
  border-radius: 50%;
`;

const UserName = styled.p`
  color: white;
  text-transform: capitalize;
  letter-spacing: normal;
`;

const ImgLayout = styled.div`
  height: 100%;
  padding: 13px 0;
`;

export default Header;
