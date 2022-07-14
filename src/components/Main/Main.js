import React from "react";
import './Main.css';
import Promo from '../Promo/Promo'
import Header from '../Header/Header';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import NavTab from "../NavTab/NavTab";

function Main(props) {
  return (
    <main>
      <Header loggedIn={props.loggedIn}>
        <NavTab />
      </Header>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </main>
  );
}

export default Main;