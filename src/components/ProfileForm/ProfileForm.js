import React from "react";
import "./ProfileForm.css"

function ProfileForm() {
    return(
        <form className="profile-form">
            <h2 className="profile-form__username">Привет, Виталий!</h2>
            <div className="profile-form__container">
                <label className="profile-form__label">Имя<input className="profile-form__input"  type="text" value="Витайлий"></input></label>
                <label className="profile-form__label">E-mail<input className="profile-form__input"  type="text" value="i@mail.ru"></input></label>
            </div>
            <button className="profile-form__button">Редактировать</button>
            <button className="profile-form__exit">Выйти из аккаунта</button>
        </form>
        
    )
}

export default ProfileForm;