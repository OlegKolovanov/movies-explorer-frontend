import React, { useEffect, useState } from 'react';
import './MovieCard.css'
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext";

function MovieCard(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation()
    const [isLiked, setIsLiked] = useState(false);
    const [save, setSave] = useState(true)


    function handleLikeCard() {
        setSave(false)
        setIsLiked(!isLiked)
        if (isLiked === false) {
            props.handleLike({
                image: `https://api.nomoreparties.co${props.card.image.url}`,
                country: props.card.country || ' ',
                director: props.card.director,
                duration: props.card.duration,
                year: props.card.year,
                description: props.card.description,
                trailerLink: props.card.trailerLink,
                nameRU: props.card.nameRU,
                nameEN: props.card.nameEN,
                thumbnail: `https://api.nomoreparties.co${props.card.image.formats.thumbnail ? props.card.image.formats.thumbnail.url : ""}`,
                movieId: props.card.id
            })
        } else {
            props.handleDelete(props.card)
            setSave(true)
        }
    }

    function handleDeleteCard() {
        props.handleDelete(props.card)
    }




    useEffect(() => {
        if (location.pathname === '/movies') {

            if (props.saveCard.find((item) => item.movieId === props.card.id)) {
                setIsLiked(true)
            }

        }
    }, [location])

    const cardLikeButtonClassName = `${isLiked ? "moviecard__like_active" : "moviecard__like"
        }`;


    return (
        <>
            <div className='moviecard'>
                <a href={props.card.trailer || props.card.trailerLink} target="_blank" rel="noreferrer">
                    <img src={location.pathname === '/movies' ? `https://api.nomoreparties.co${props.card.image.url}` : props.card.image} className='moviecard__image' alt={props.card.nameRU || props.card.nameEN}></img>
                </a>
                <div className='moviecard__container'>
                    <h2 className='moviecard__title'>{props.card.nameRU || props.card.nameEN}</h2>
                    <button type='button' onClick={location.pathname === '/movies' ? handleLikeCard : handleDeleteCard} className={location.pathname === '/movies' ? `${cardLikeButtonClassName}` : 'moviecard__delete'}></button>
                </div>
                <p className='moviecard__time'>{`${Math.floor(
                    props.card.duration / 60)}ч ${props.card.duration % 60}м`}</p>
            </div>
        </>
    )
}

export default MovieCard;