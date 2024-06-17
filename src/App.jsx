import { useState } from "react";
import React from "react";
import Header from "./Components/Header/Header";
import MovieList from "./Components/MovieList/MovieList";
import Footer from "./Components/Footer/Footer";
import "./App.css";

const App = () => {
  return (
      <div className="App">
        <Header />
        <MovieList />
        <Footer />
      </div>
  );
};
export default App;
