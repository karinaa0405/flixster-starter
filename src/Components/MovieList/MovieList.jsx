import './MovieList.css'
import React from "react"
import {useState, useEffect} from "react"
import MovieCard from "../MovieCard/MovieCard"
import Modal from "../Modal/Modal"

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genres, setGenres] = useState([]);

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

        const fetchGenres = async () => {
            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            setGenres(data.genres);
            
        };
        fetchMovie();
        fetchGenres();

    }, [pageNum]);

    async function fetchSearch() {
        const apiKey = import.meta.env.VITE_API_KEY;
        let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pageNum}`;
        const response = await fetch(searchUrl);
        const data = await response.json();
        console.log(data.results);
        if (pageNum === 1) {
            setMovies(data.results); // Set initial movies
        }   
        else {
            setMovies((prevMovies) => [...prevMovies, ...data.results]); // Append new movies
        }
    }

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
  
    const handleSearch = () => {
        setPageNum(1);
        fetchSearch();
    };

    const filteredMovies = movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const loadMoreMovies = () => {
        setPageNum((pageNum) => pageNum + 1);
    }

    const getGenreNames = (genreIds) => {
        return genreIds.map(id => genres.find(genre => genre.id === id).name).join(', ');
    };

    return (
        <>
            <div className = "searchContainer">
                <input 
                    type = "text"
                    placeholder = "Search Movies..."
                    value = {searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)
                        handleSearch();
                    }}
                />
                {/* <button onClick={handleSearch}>Search</button> */}
            </div>
            <div className = "movieList">
                {filteredMovies.map((movie) => (
                    <MovieCard 
                        key = {movie.id}
                        img ={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        title = {movie.original_title}
                        rating = {movie.vote_average}
                        onClick ={() => setSelectedMovie(movie)}
                    />
                ))}
            </div>
            <button onClick={loadMoreMovies}>Load More Movies</button>
            {selectedMovie && (
                <Modal
                    show = {selectedMovie !== null}
                    onClose={() => setSelectedMovie(null)}
                    title = {selectedMovie.original_title}
                    img = {`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
                    releaseDate = {selectedMovie.release_date}
                    overview = {selectedMovie.overview}
                    genre = {getGenreNames(selectedMovie.genre_ids)}
                />
            
            )}
        </>
    );
    
}

export default MovieList;
