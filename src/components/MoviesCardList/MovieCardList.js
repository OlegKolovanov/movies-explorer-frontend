import { React, useState, useEffect } from 'react';
import './MovieCardList.css'
import MovieCard from '../MoviesCard/MovieCard';
import MoviesMoreButton from '../MoviesMoreButton/MoviesMoreButton';
import { useLocation } from 'react-router-dom';

function MovieCardList(props) {

    const locationPathname = useLocation()

    const getWidth = () => {
        return document.documentElement.clientWidth;
    };

    const SIZE_WIDTH_LARGE = 1024;
    const SIZE_WIDTH_MEDIUM = 768;
    const SIZE_WIDTH_SMALL = 320;

    const NUMBER_MOVIES_TO_RENDER_LARGE = 12;
    const NUMBER_MOVIES_TO_RENDER_MEDIUM = 8;
    const NUMBER_MOVIES_TO_RENDER_SMALL = 5;

    const NUMBER_MOVIES_TO_ADD_LARGE = 3;
    const NUMBER_MOVIES_TO_ADD_MEDIUM = 2;

    const ZERO_NUMBER = 0;

    const [moviesToRender, setMoviesToRender] = useState([]);
    const [isShowButtonActive, setIsShowButtonActive] = useState(false);
    const [numberMoviesToRender, setNumberMoviesToRender] = useState(0);
    const [numberMoviesToAdd, setNumberMoviesToAdd] = useState(0);


    const size = getWidth()

    const countNumberMoviesToRender = () => {
        if (size >= SIZE_WIDTH_LARGE) {
            setNumberMoviesToRender(NUMBER_MOVIES_TO_RENDER_LARGE);
            setNumberMoviesToAdd(NUMBER_MOVIES_TO_ADD_LARGE);
        } else if (size < SIZE_WIDTH_LARGE && size >= SIZE_WIDTH_MEDIUM) {
            setNumberMoviesToRender(NUMBER_MOVIES_TO_RENDER_MEDIUM);
            setNumberMoviesToAdd(NUMBER_MOVIES_TO_ADD_MEDIUM);
        } else if (size < SIZE_WIDTH_MEDIUM && size >= SIZE_WIDTH_SMALL) {
            setNumberMoviesToRender(NUMBER_MOVIES_TO_RENDER_SMALL);
            setNumberMoviesToAdd(NUMBER_MOVIES_TO_ADD_MEDIUM);
        };
    };

    const handleShowMoreMoviesButtonClick = () => {
        setMoviesToRender(props.card.slice(ZERO_NUMBER, moviesToRender.length + numberMoviesToAdd));

        if (moviesToRender.length >= props.card.length - numberMoviesToAdd) {
            setIsShowButtonActive(false);
        }
    }


    useEffect(() => {
        countNumberMoviesToRender();
    }, [size])

    useEffect(() => {

        if (locationPathname.pathname === '/movies') {
            setMoviesToRender(props.card.slice(ZERO_NUMBER, numberMoviesToRender));
            if (props.card.length <= numberMoviesToRender) {
                setIsShowButtonActive(false);
            } else {
                setIsShowButtonActive(true);
            };
        } else if (locationPathname.pathname === '/saved-movies') {
            setMoviesToRender(props.card);
            setIsShowButtonActive(false);
        }
    }, [props.card, numberMoviesToRender])

    const moviesCards = moviesToRender.map((card, id) => (
        <MovieCard
            key={card.id || card.movieId}
            card={card}
            handleLike={props.handleLike}
            handleDelete={props.handleDelete}
            saveCard={props.saveCard}
        />

    ))


    return (
        <>
            <div className='cardlist'>
                {moviesCards}
            </div>
            {locationPathname.pathname === '/movies' && isShowButtonActive ? (
                <MoviesMoreButton
                    onClick={handleShowMoreMoviesButtonClick}
                />
            ) : null}
        </>
    )
}

export default MovieCardList;