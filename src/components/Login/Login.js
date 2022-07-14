import React from "react";
import "./Login.css"
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../Validation/Validation";
import { Link } from "react-router-dom";

function Login(props) {

    const { values, isValid, handleChange, errors } = useFormWithValidation({
        email: "",
        password: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        if (isValid) {
            props.handleLogin({
                email: values.email,
                password: values.password,
            })
        }
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="login__container">
                <Logo />
            </div>
            <h2 className="login__title">Рады видеть!</h2>
            <label className="login__label">E-mail<input className="login__input" onChange={(e) => handleChange(e)} type="email" id="email" name="email" value={values.email || ''} required></input></label>
            <label className="login__label">Пароль<input className="login__input" onChange={(e) => handleChange(e)} id="password" type="password" name="password" value={values.password || ''} minLength="8" required></input></label>
            <button className="login__button" type="submit">Войти</button>
            <p className="login__text">Ещё не зарегистрированы?<Link className="login__link" to="/signup">Регистрация</Link></p>
        </form>
    )
}

export default Login;