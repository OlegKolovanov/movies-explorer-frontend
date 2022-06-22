import './Movies.css'
import Header from "../Header/Header";
import SearchForm from '../SerchForm/SearchForm';
import Footer from '../Footer/Footer';
import MovieCardList from '../MoviesCardList/MovieCardList';
import MoviesMoreButton from '../MoviesMoreButton/MoviesMoreButton';

function Movies() {
    return (
        <section className="movies">
            <Header />
            <SearchForm />
            <MovieCardList />
            <MoviesMoreButton />
            <Footer />
        </section>
    )
}

export default Movies;