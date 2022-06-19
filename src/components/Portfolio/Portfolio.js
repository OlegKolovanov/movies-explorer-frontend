import React from "react";
import './Portfolio.css'
import Header from "../Header/Header";
import ProfileForm from "../ProfileForm/ProfileForm";

function Profile() {
    return (
        <section className="portfolio">
            <Header />
            <ProfileForm />
        </section>
    )
}

export default Profile