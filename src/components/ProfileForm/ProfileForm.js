import React from "react";
import "./ProfileForm.css"
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../Validation/Validation";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function ProfileForm(props) {

    const currentUser = React.useContext(CurrentUserContext);


    const [dataIsChanged, setDataIsChanged] = React.useState(false);

    const nameRef = React.useRef("");
    const emailRef = React.useRef("");
    const { values, isValid, handleChange, errors } = useFormWithValidation({
        userName: nameRef.current.value,
        userEmail: emailRef.currentValue,
    });


    React.useEffect(() => {
        nameRef.current.value === currentUser.name &&
            emailRef.current.value === currentUser.email
            ? setDataIsChanged(false)
            : setDataIsChanged(true);
    }, [values.userName, values.userEmail, currentUser.email, currentUser.name]);

    function handleSubmit(e) {
        e.preventDefault()
        if (dataIsChanged === true) {
            if (isValid) {
                props.handleUpdateProfile({
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                });
            }
        }
    };

    console.log(props.isProfileUpdateSuccessful, props.profileUpdateMessage, props.profileErrorMessage)

    function handleLogout() {
        props.handleLogout()
    }

    return (
        <>
            <form className="profile-form" onSubmit={handleSubmit}>
                <h2 className="profile-form__username">Привет, {currentUser.name}!</h2>
                <div className="profile-form__container">
                    <label className="profile-form__label">Имя<input className="profile-form__input" id="userName"
                        placeholder="Введите ваше имя"
                        name="userName"
                        maxLength="30"
                        minLength="2"
                        type="text"
                        defaultValue={currentUser.name}
                        onChange={(e) => handleChange(e)}
                        ref={nameRef}
                        required></input></label>
                    <label className="profile-form__label">E-mail<input className="profile-form__input" id="userEmail"
                        placeholder="Введите ваш email"
                        name="userEmail"
                        type="email"
                        onChange={(e) => handleChange(e)}
                        defaultValue={currentUser.email}
                        ref={emailRef}
                        required></input></label>
                    <span className={`profile-form__message ${isValid ? 'profile-form__message_active' : null}`}>
                        {errors?.userName}
                        {errors?.userEmail}
                    </span>
                    <span className={`profile-form__message ${props.isProfileUpdateSuccessful ? 'profile-form__message_active-success' : 'profile-form__message_active'}`}>
                        {props.isProfileUpdateSuccessful
                            ? `${props.profileUpdateMessage}`
                            : `${props.profileErrorMessage}`}
                    </span>
                </div>
                <button className={dataIsChanged ? 'profile-form__button' : 'profile-form__button_unactive'} type="submit">Редактировать</button>
                <button className="profile-form__exit" type="submit" onClick={handleLogout}>Выйти из аккаунта</button>
            </form>

        </>
    )
}

export default ProfileForm;