import React, { useEffect } from "react";

import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./components/Layout/Header";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import FindSitter from "./containers/FindSitter";
import About from "./containers/About";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("lang") || "en");
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename={"/"}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/find" component={FindSitter} />
            <Route path="/about" component={About} />
            {/* <Route path="/login" component={Login} /> */}
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
