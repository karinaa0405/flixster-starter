import React from "react";
import "./Modal.css";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* <div className="modal-header">
          <button onClick={props.onClose}>Close</button>
        </div> */}
        <div className="modal-body">
            {/* <h1>{props.title}</h1> */}
            <img className = "modalImg" src = {props.img}/>
            <h1 className = "modalTitle">{props.title}</h1>
            <p className = "date"> <span className = "dateText">Release Date:</span> {props.releaseDate}</p>
            <p className = "overview"> <span className = "overviewText">Overview: </span>{props.overview}</p>
            <p className = "genre"> <span className = "genreText">Genres:</span> {props.genre}</p>
        </div>
        <div className="modal-header">
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;