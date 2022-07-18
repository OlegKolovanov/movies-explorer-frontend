import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../Validation/Validation";



function Register(props) {


    const { values, isValid, handleChange, errors } = useFormWithValidation({
        name: "",
        email: "",
        password: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        if (isValid) {
            props.handleRegister({
                name: values.name,
                email: values.email,
                password: values.password,
            })
        }
    }

    console.log(props.isRegistrationSuccessful, props.userMessage, props.registrationError)

    return (
        <form className="register" onSubmit={handleSubmit}>
            <div className="register__container">
                <Logo />
            </div>
            <h2 className="register__title">Добро пожаловать!</h2>
            <label className="register__label">Имя<input className="register__input" onChange={(e) => handleChange(e)} type="text" id="name" name="name" value={values.name || ''} minLength="2" maxLength="18" required></input></label>
            <label className="register__label">E-mail<input className="register__input" onChange={(e) => handleChange(e)} type="email" id="email" name="email" value={values.email || ''} required></input></label>
            <label className="register__label">Пароль<input className="register__input" onChange={(e) => handleChange(e)} id="password" type="password" name="password" value={values.password || ''} minLength="8" required></input></label>
            <span className={`register__info-message 
             ${!isValid ? `register__info-message_active` : null}`}>
                {errors?.name}{errors?.email}{errors?.password}
            </span>
            <span className={`register__info-message 
             ${props.isRegistrationSuccessful ?
                    `register__info-message_active-success` :
                    `register__info-message_active`
                }`}>
                {props.isRegistrationSuccessful ? `${props.userMessage}` : `${props.registrationError}`}
            </span>
            <button className="register__button" type="submit" >Зарегистрироваться</button>
            <p className="register__text">Уже зарегистрированы?<Link className="register__link" to="/signin">Войти</Link></p>
        </form>
    )
}

export default Register;