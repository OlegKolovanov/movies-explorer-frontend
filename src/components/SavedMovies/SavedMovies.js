import './SavedMovies.css'
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MovieCardList from "../MoviesCardList/MovieCardList";
import SearchForm from "../SerchForm/SearchForm";

function SavedMovies(props) {
    return (
        <section className="savedmovies">
            <Header />
            <SearchForm
                handleSaveSearchForm={props.handleSaveSearchForm}
                sortSaveMovie={props.sortSaveMovie}
                shortSaveMovies={props.shortSaveMovies}
                checkedSave={props.checkedSave} />
            <MovieCardList card={props.card} handleDelete={props.handleDelete} />
            <Footer />
        </section>
    )
}

export default SavedMovies;
