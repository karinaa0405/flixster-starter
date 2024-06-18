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
    const [sortBy, setSortBy] = useState("");

    useEffect (() => {
        
        async function fetchMovie() {
            const apiKey = import.meta.env.VITE_API_KEY;
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNum}`;  
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.results);
            if (pageNum === 1) {
                setMovies(data.results);
            }   
            else {
                setMovies((prevMovies) => [...prevMovies, ...data.results]);
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
        if (searchTerm == "") {
            searchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNum}`;  
        }
        const response = await fetch(searchUrl);
        const data = await response.json();
        console.log(data.results);
        if (pageNum === 1) {
            setMovies(data.results);
        }   
        else {
            setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
    }
  
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

    const sortMovies = (option) => {
        let sortedMovies = [...movies];
        switch (option) {
            case "🔤 Alphabetic":
                sortedMovies.sort((a, b) => a.original_title.localeCompare(b.original_title));
                break;
            case "📆 Release Date":
                sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                break;
            case "📈 Rating":
                sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
                break;
            default:
                break;
        }
        return sortedMovies;
    };

    return (
        <>
            <div className = "searchContainer">
                <div className = "searching">
                <input 
                    className = "searchBar"
                    type = "text"
                    placeholder = "🔍 Search Movies..."
                    value = {searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)
                        handleSearch();
                    }}
                />
                <button className = "searchButton" onClick={handleSearch}>Search</button>
                </div>
                <select className = "sortSelector" onChange={(e) => setSortBy(e.target.value)}>
                    <option>👀 Sort By...</option> 
                    <option>🔤 Alphabetic</option>
                    <option>📆 Release Date</option>
                    <option>📈 Rating</option>
                </select>
            </div>
            <div className = "movieList">
                {sortMovies(sortBy).map((movie) => (
                    <MovieCard
                        key={movie.id}
                        img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        title={movie.title}
                        rating={movie.vote_average}
                        onClick={() => setSelectedMovie(movie)}
                    />
                ))}
            </div>
            <div className = "buttonDiv">
                <button className = "loadMoreButton" onClick={loadMoreMovies}>Load More Movies</button>
            </div>
            {selectedMovie && (
                <Modal
                    show = {selectedMovie !== null}
                    onClose={() => setSelectedMovie(null)}
                    title = {selectedMovie.title}
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
