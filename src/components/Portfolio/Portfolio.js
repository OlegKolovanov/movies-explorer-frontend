import React from "react";
import './Portfolio.css'
import Header from "../Header/Header";
import ProfileForm from "../ProfileForm/ProfileForm";

function Profile(props) {
    return (
        <section className="portfolio">
            <Header />
            <ProfileForm handleLogout={props.handleLogout} handleUpdateProfile={props.handleUpdateProfile} />
        </section>
    )
}

export default Profile