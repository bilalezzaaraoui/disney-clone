import { Routes, Route } from "react-router-dom";
import Login from "../../pages/login/Login";
import Home from "../../pages/home/Home";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Router;
