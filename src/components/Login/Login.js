import React from "react";
import "./Login.css"
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../Validation/Validation";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login(props) {

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState('false')

    function handleChangeEmail(e) {
        const valid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(
            e.target.value
        );
        setEmailValid(valid)
        setEmail(e.target.value)
    }

    const { values, isValid, handleChange, errors } = useFormWithValidation({
        email: "",
        password: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        if (isValid && emailValid) {
            props.handleLogin({
                email: email,
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
            <label className="login__label">E-mail<input className="login__input" onChange={(e) => handleChangeEmail(e)} type="email" id="email" name="email" value={email || ''} readOnly={props.isLoading} required></input></label>
            <label className="login__label">Пароль<input className="login__input" onChange={(e) => handleChange(e)} id="password" type="password" name="password" value={values.password || ''} minLength="8" readOnly={props.isLoading} required></input></label>
            <span
                className={`login__info-message 
             ${!isValid ? `login__info-message_active` : null}`}
            >
                {errors?.userName}
                {errors?.userEmail}
                {errors?.userPassword}
            </span>
            <span
                className={`login__info-message 
             ${props.loginError ? `login__info-message_active` : null}`}
            >
                {props.loginErrorMessage}
            </span>
            <button className="login__button" type="submit">Войти</button>
            <p className="login__text">Ещё не зарегистрированы?<Link className="login__link" to="/signup">Регистрация</Link></p>
        </form>
    )
}

export default Login;