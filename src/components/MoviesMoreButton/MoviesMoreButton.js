import React from 'react';
import './MoviesMoreButton.css';

function MoviesMoreButton(props) {

  return (
    <button
      type="button"
      className="movies-button"
      onClick={props.onClick}
    >
      Ещё
    </button>
  );
}

export default MoviesMoreButton;