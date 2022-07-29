import { Routes, Route } from "react-router-dom";
import Login from "../../pages/login/Login";
import Home from "../../pages/home/Home";
import Detail from "../../pages/detail/Detail";
import Search from "../../pages/search/Search";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
};

export default Router;
