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

                <h2 className="menu__title">Главная</h2>
                <a className="menu__link" href="http://localhost:3000/movies">Фильмы</a>
                <a className="menu__link" href="http://localhost:3000/saved-movies">Сохраненные фильмы</a>
                <div className="menu__container">
                    <a className="menu__acc" href="http://localhost:3000/profile">Аккаунт</a>
                    <Link to="/profile"><button type="button" className="menu__button"></button></Link>
                </div>

            </div>
        </section>
    )
}

export default Menu;