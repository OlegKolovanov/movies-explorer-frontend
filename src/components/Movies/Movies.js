import { React, useState, useEffect } from 'react';
import './Movies.css'
import Header from "../Header/Header";
import SearchForm from '../SerchForm/SearchForm';
import Footer from '../Footer/Footer';
import MovieCardList from '../MoviesCardList/MovieCardList';
import MoviesMoreButton from '../MoviesMoreButton/MoviesMoreButton';
import { useLocation } from 'react-router-dom';

function Movies(props) {

    return (
        <section className="movies">
            <Header />
            <SearchForm
                handleSearchForm={props.handleSearchForm}
                sortMovie={props.sortMovie}
                shortMovies={props.shortMovies}
                checked={props.checked}
            />
            <MovieCardList
                card={props.card}
                handleLike={props.handleLike}
                handleDelete={props.handleDelete}
                saveCard={props.saveCard}
            />
            <Footer />
        </section>
    )
}

export default Movies;