import React from "react";
import "./Register.css"
import Logo from "../Logo/Logo";


function Register() {
    return (
        <form className="register">
            <div className="register__container">
                <Logo />
            </div>
            <h2 className="register__title">Добро пожаловать!</h2>
            <label className="register__label">Имя<input className="register__input" value="Виталий"></input></label>
            <label className="register__label">E-mail<input className="register__input" value="i@mail.ru"></input></label>
            <label className="register__label">Пароль<input className="register__input" type="password" value="1111111"></input></label>
            <button className="register__button">Зарегистрироваться</button>
            <p className="register__text">Уже зарегистрированы?<a className="register__link" href="http://localhost:3000/signin">Войти</a></p>
        </form>
    )
}

export default Register;