import './SavedMovies.css'
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MovieCardList from "../MoviesCardList/MovieCardList";
import SearchForm from "../SerchForm/SearchForm";

function SavedMovies() {
    return (
        <section className="savedmovies">
            <Header />
            <SearchForm />
            <MovieCardList />
            <Footer />
        </section>
    )
}

export default SavedMovies;
