import { React } from 'react';
import './Movies.css'
import Header from "../Header/Header";
import SearchForm from '../SerchForm/SearchForm';
import Footer from '../Footer/Footer';
import MovieCardList from '../MoviesCardList/MovieCardList';
import Preloader from '../Preloader/Preloader';


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
            <Preloader
                isLoading={props.isLoading}
                isNothingFound={props.isNothingFound}
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