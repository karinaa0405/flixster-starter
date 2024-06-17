import { useState } from "react";
import React from "react";
import Header from "./Components/Header/Header";
// import MovieCard from "./Components/MovieCard/MovieCard";
import MovieList from "./Components/MovieList/MovieList";
import "./App.css";

const App = () => {
  return (
      <div className="App">
        <Header />
        <MovieList />
      </div>
  );
};
export default App;
