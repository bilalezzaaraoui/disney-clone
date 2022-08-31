import { Routes, Route } from "react-router-dom";
import Login from "../../pages/login/Login";
import Home from "../../pages/home/Home";
import Detail from "../../pages/detail/Detail";
import Search from "../../pages/search/Search";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Router = () => {
  const isConnected = useSelector((state) => state.user.login);

  return (
    <Routes>
      <Route
        path="/"
        element={isConnected ? <Navigate replace to="/home" /> : <Login />}
      />
      <Route
        path="/home"
        element={isConnected ? <Home /> : <Navigate replace to="/" />}
      />
      <Route
        path="/search"
        element={isConnected ? <Search /> : <Navigate replace to="/" />}
      />
      <Route
        path="/detail/:id"
        element={isConnected ? <Detail /> : <Navigate replace to="/" />}
      />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
