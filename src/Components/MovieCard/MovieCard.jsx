import './MovieCard.css'
import React from "react";


const MovieCard = (props) => {
    return (
        <>
            <div className = "movieCard">
                <img src = {props.img}/>
                <h1>{props.title}</h1>
                <p>Rating: {props.rating}</p>
            </div>
        </>
    );
};

export default MovieCard;
