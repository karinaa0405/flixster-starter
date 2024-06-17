import './MovieList.css'
import React from "react"
import {useState, useEffect} from "react"
import MovieCard from "../MovieCard/MovieCard"

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect (() => {
        
        async function fetchMovie() {
            const apiKey = import.meta.env.VITE_API_KEY;
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;  
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.results);
            setMovies(data.results);
        }

        fetchMovie();

    }, []);

    return (
        <>
        <div className = "movieList">
            {movies.map((movie) => (
                <MovieCard 
                    key = {movie.id}
                    img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    title = {movie.original_title}
                    rating = {movie.vote_average}
                />
            ))}
        </div>
        </>
    );
    
}

export default MovieList;