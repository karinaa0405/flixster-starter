import './MovieList.css'
import React from "react"
import {useState, useEffect} from "react"
import MovieCard from "../MovieCard/MovieCard"

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredMovies = movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className = "searchContainer">
                <input 
                    type = "text"
                    placeholder = "Search Movies..."
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button onClick={(e) => setSearchTerm(e.target.value)}>Search</button> */}
            </div>
            <div className = "movieList">
                {filteredMovies.map((movie) => (
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