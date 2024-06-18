import './MovieCard.css'
import React from "react";


const MovieCard = (props) => {
    return (
        <>
            <div className = "movieCard" onClick={props.onClick}>
                <img className = "movieImg" src = {props.img}/>
                <h1 className = "movieTitle">{props.title}</h1>
                <p className = "movieRating">Rating: {props.rating}</p>
            </div>
        </>
    );
};

export default MovieCard;
