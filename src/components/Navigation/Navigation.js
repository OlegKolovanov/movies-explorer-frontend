import "./Navigation.css"
import { Link } from "react-router-dom";
import Menu from '../Menu/Menu';

function Navigation() {
    return (
        <>
            <nav className="navigation">
                <Link className="navigation__link" to="/movies">Фильмы</Link>
                <Link className="navigation__link" to="/saved-movies">Сохраненные фильмы</Link>
                <Link className="navigation__link" to="/profile">Аккаунт</Link>
                <Link to="/profile"><button type="button" className="navigation__button"></button></Link>
            </nav>
            <Menu />
        </>
    )
}

export default Navigation;