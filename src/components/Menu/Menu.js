import React from "react";
import "./Menu.css"
import { useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
    const [isActive, setIsActive] = useState(false)

    console.log(isActive)

    function handlePopup() {
        setIsActive(!isActive)
        console.log('1')
    }

    return (
        <section className={`${isActive ? 'menu_hidden' : 'menu'}`} onClick={handlePopup}>
            <div className={`${isActive ? 'menu__block_active' : 'menu__block'}`}>
                <div className="menu__container-close">
                    <button className="menu__close" type="button" ></button>
                </div>

                <Link className="menu__link" to="/">Главная</Link>
                <Link className="menu__link" to="/movies">Фильмы</Link>
                <Link className="menu__link" to="/saved-movies">Сохраненные фильмы</Link>
                <div className="menu__container">
                    <Link className="menu__acc" to="/profile">Аккаунт</Link>
                    <Link to="/profile"><button type="button" className="menu__button"></button></Link>
                </div>

            </div>
        </section>
    )
}

export default Menu;