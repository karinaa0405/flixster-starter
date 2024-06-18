import React from "react";
import "./Modal.css";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button onClick={props.onClose}>Close</button>
        </div>
        <div className="modal-body">
            <h1>{props.title}</h1>
            <img src = {props.img}/>
            <p> Release Date: {props.releaseDate}</p>
            <p>Overview: {props.overview}</p>
            <p>Genres: {props.genre}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;