import './MovieList.css'
import React from "react"
import {useState, useEffect} from "react"
import MovieCard from "../MovieCard/MovieCard"

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNum, setPageNum] = useState(1);

    useEffect (() => {
        
        async function fetchMovie() {
            const apiKey = import.meta.env.VITE_API_KEY;
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNum}`;  
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.results);
            if (pageNum === 1) {
                setMovies(data.results); // Set initial movies
            }   
            else {
                setMovies((prevMovies) => [...prevMovies, ...data.results]); // Append new movies
            }

        }

        fetchMovie();

    }, [pageNum]);

    // const searchMovies = async () => {
    //     const apiKey = import.meta.env.VITE_API_KEY;
    //     let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`; 
  
    //     try { // from chatgpt
    //         const response = await fetch(searchUrl);
    //         const data = await response.json();
    //         console.log('Search results:', data);
    //         setMovies(data.results);
    //     } catch (error) {
    //         console.error('Error searching movies:', error);
    //     }
    // };
  
    // const handleSearch = () => {
    //     if (searchTerm.trim() !== '') {
    //         searchMovies();
    //     }
    // };

    const filteredMovies = movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const loadMoreMovies = () => {
        setPageNum((pageNum) => pageNum + 1);
    }

    return (
        <>
            <div className = "searchContainer">
                <input 
                    type = "text"
                    placeholder = "Search Movies..."
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button onClick={handleSearch}>Search</button> */}
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
            <button onClick={loadMoreMovies}>Load More Movies</button>
        </>
    );
    
}

export default MovieList;
