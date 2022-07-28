import Router from "./components/router/Router";
import "./App.css";
import { Fragment } from "react";
import Header from "./layout/header/Header";

function App() {
  return (
    <Fragment>
      <Header />
      <Router />
    </Fragment>
  );
}

export default App;
