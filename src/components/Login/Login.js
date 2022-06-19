import React from "react";
import "./Login.css"
import Logo from "../Logo/Logo";

function Login() {
    return (
        <form className="login">
            <div className="login__container">
                <Logo />
            </div>
            <h2 className="login__title">Рады видеть!</h2>
            <label className="login__label">E-mail<input className="login__input" value="i@mail.ru"></input></label>
            <label className="login__label">Пароль<input className="login__input" type="password" value="1111111"></input></label>
            <button className="login__button">Войти</button>
            <p className="login__text">Ещё не зарегистрированы?<a className="login__link" href="http://localhost:3000/signup">Регистрация</a></p>
        </form>
    )
}

export default Login;