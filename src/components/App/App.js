import React, { useEffect, useState } from "react";
import './App.css';
import Main from '../Main/Main';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Portfolio/Portfolio";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import * as beatfilmApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";



function App() {

  const history = useNavigate();
  const jwt = localStorage.getItem('jwt')
  const [loggedIn, setLoggedIn] = useState(false)
  const [userMovie, setUserMovie] = useState([])
  const [longUserMovie, setLongUserMovie] = useState([])
  const [movie, setMovie] = useState([])
  const [searchCard, setSearchCard] = useState([])
  const [shortMovies, setShortMovies] = useState(false)
  const [saveShortMovies, setSaveShortMovies] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [longMovie, setLongMovie] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [nothingFoundSave, setNothingFoundSave] = useState(false);
  const [profileUpdateMessage, setProfileUpdateMessage] = useState("");
  const [profileErrorMessage, setProfileErrorMessage] = useState("");
  const [isProfileUpdateSuccessful, setIsProfileUpdateSuccessful] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");

  useEffect(() => {

    if (jwt) {
      setIsLoading(true)
      setLoggedIn(true)
      Promise.all([mainApi.getUser(jwt), mainApi.getMovie(jwt)])
        .then(([user, movie]) => {
          setCurrentUser(user)

          const savedMoviesList = movie.data.filter(
            (item) => item.owner === user._id
          );
          localStorage.setItem('saveMovie', JSON.stringify(savedMoviesList))
          setLongUserMovie(savedMoviesList)
          setUserMovie(savedMoviesList)

          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }, [loggedIn])

  const checkbox = JSON.parse(localStorage.getItem('boolean'))

  useEffect(() => {
    if (localStorage.getItem('search')) {
      setShortMovies(checkbox)
      const previousSearchWord = JSON.parse(localStorage.getItem('search'))
      handleSearchForm(previousSearchWord)
    } else {
      setShortMovies(false)
      setSaveShortMovies(false)
    }
  }, [movie])

  function handleSearchForm(films) {
    setNothingFound(false);
    setIsLoading(true);

    const findedMovies = movie.filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(films.trim().toLowerCase());
    });
    setSearchCard(findedMovies)
    setLongMovie(findedMovies)
    localStorage.setItem('search', JSON.stringify(films))
    localStorage.setItem('movie', JSON.stringify(findedMovies))
    if (shortMovies === true) {

      filterShortMovies(findedMovies)
      setTimeout(() => setIsLoading(false), 500);
    }
    else if (findedMovies.length === 0) {
      setIsLoading(false)
      setNothingFound(true)
      setSearchCard([])
      setLongMovie([])
      localStorage.setItem('search', JSON.stringify(films))
      localStorage.setItem('movie', JSON.stringify(findedMovies))
    } else {
      localStorage.setItem('search', JSON.stringify(films))
      localStorage.setItem('movie', JSON.stringify(findedMovies))
      setSearchCard(findedMovies)

      setLongMovie(findedMovies)
      setTimeout(() => setIsLoading(false), 500);
    }

  }

  function handleSaveMovieSearch(films) {
    setNothingFoundSave(false);
    setIsLoading(true);

    if (films === '') {
      setUserMovie(longUserMovie)
    }
    const findedMovies = longUserMovie.filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(films.trim().toLowerCase());
    });
    if (findedMovies.length === 0) {
      setNothingFoundSave(true);
      setIsLoading(true);
    }

    setUserMovie(findedMovies)
    setTimeout(() => setIsLoading(false), 500)
  }


  function handleCheckBox() {
    setShortMovies(!shortMovies)
    console.log(shortMovies)

  }

  useEffect(() => {
    localStorage.setItem('boolean', JSON.stringify(shortMovies))
    if (shortMovies === true) {
      filterShortMovies(longMovie)
    } else {
      setSearchCard(longMovie)
    }
  }, [shortMovies])

  function handleSaveCheckBox() {

    setSaveShortMovies(!saveShortMovies);
    if (saveShortMovies === true) {
      setUserMovie(longUserMovie)
      localStorage.removeItem('shortMovie')

    } else {
      filterSaveShortMovie()
    }
  }

  function filterShortMovies(searchCard) {

    if ((searchCard.length !== 0 || searchCard !== "undefind") && shortMovies === true) {
      const shortMovie = searchCard.filter(movie => {
        return movie.duration <= 40
      })
      setSearchCard(shortMovie)

      localStorage.setItem('Movie', JSON.stringify(searchCard))
    }
  }

  function filterSaveShortMovie() {
    if ((userMovie.length !== 0 || userMovie !== "undefind") && !saveShortMovies === true) {
      const shortMovie = userMovie.filter(movie => {
        return movie.duration <= 40
      })
      setUserMovie(shortMovie)

    }
  }

  function handleRegister({ name, email, password }) {
    setUserMessage("");
    setRegistrationError("");
    setIsLoading(true)
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {

          setIsRegistrationSuccessful(true);
          setUserMessage("Вы успешно зарегистрированы!");
          setTimeout(() => handleLogin({ email, password }), 1000)
          setTimeout(() => setUserMessage(""), 3000)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setRegistrationError("Что-то пошло не так...");
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {

    if (!email || !password) {
      return;
    }
    setIsLoading(true)
    mainApi
      .login(email, password)
      .then((res) => {
        if (!res) throw new Error("Неправильные имя пользователя или пароль");
        else {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true)
          setCurrentUser(res)
          setIsLoading(false)
          history('/movies')

        }
      })
      .catch((err) => {
        console.log(err);
        setLoginErrorMessage("Не удалось войти, пожалуйста, проверьте данные");
        setLoginError(true);
        setIsLoading(false)
      });
  }



  function handleLogout() {
    console.log('1')
    localStorage.removeItem('jwt')
    localStorage.removeItem('movie')
    localStorage.removeItem('search')

    setSearchCard([])

    setLongMovie([])
    setLoggedIn(false)
    setSaveShortMovies([])
    setCurrentUser({})
    setShortMovies([])
    setMovie([])
    history('/')
  }

  useEffect(() => {
    beatfilmApi.getMovies()
      .then((res) => {
        setMovie(res)
      })
      .catch((err) => console.log(err))
  }, [loggedIn])

  function handleUpdateProfile(data) {
    setProfileUpdateMessage("");
    setProfileErrorMessage("");
    mainApi.updateUser(data, jwt)
      .then((res) => {
        setIsProfileUpdateSuccessful(true);
        setProfileUpdateMessage("Данные успешно изменены");
        setCurrentUser(res.data);
        setTimeout(() => setProfileUpdateMessage(""), 3000);
      })
      .catch((err) => {
        console.log(err);
        setIsProfileUpdateSuccessful(false);
        setProfileErrorMessage("Что-то пошло не так...");
        setTimeout(() => setProfileErrorMessage(""), 3000);
      });
  }

  function handleLike(movie) {
    mainApi.saveMovie(movie, jwt)
      .then((newMovies) => {
        localStorage.setItem('userMovie', JSON.stringify((newMovies = [newMovies, ...userMovie])))
        setUserMovie(newMovies)
        setLongUserMovie(newMovies)
      })
  }

  function handleDelete(movie) {
    const movieId = movie.id || movie.movieId;
    console.log(userMovie)
    const selectedMovie = userMovie.find((item) => item.movieId === movieId);
    console.log(selectedMovie)
    mainApi.deleteMovie(selectedMovie._id, jwt)
      .then((res) => {
        const newMovies = userMovie.filter((c) => c.movieId !== movieId)
        setUserMovie(newMovies);
        console.log(newMovies)
      })
  }

  useEffect(() => {
    beatfilmApi.getMovies()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res));
        setMovie(res)
      })
      .catch((err) => console.log(err))
  }, [loggedIn])


  return (


    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />

          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path="/movies" element={<Movies handleDelete={handleDelete} handleLike={handleLike}
              handleSearchForm={handleSearchForm}
              checked={shortMovies}
              saveCard={longUserMovie}
              card={searchCard}
              sortMovie={handleCheckBox}
              shortMovies={filterShortMovies}
              isNothingFound={nothingFound}
              isLoading={isLoading}
              previousSearchWord={JSON.parse(localStorage.getItem('search'))} />} />
            <Route path="/saved-movies" element={<SavedMovies card={userMovie}
              handleDelete={handleDelete}
              handleSaveSearchForm={handleSaveMovieSearch}
              shortSaveMovies={filterSaveShortMovie}
              checkedSave={saveShortMovies}
              sortSaveMovie={handleSaveCheckBox}
              isNothingFound={nothingFoundSave}
              isLoading={isLoading} />} />
            <Route path="/profile" element={<Profile handleLogout={handleLogout}
              handleUpdateProfile={handleUpdateProfile}
              profileUpdateMessage={profileUpdateMessage}
              profileErrorMessage={profileErrorMessage}
              isProfileUpdateSuccessful={isProfileUpdateSuccessful} />} />
          </Route>
          <Route exact path="/signup" element={!loggedIn ? <Register
            isLoading={isLoading}
            handleRegister={handleRegister}
            userMessage={userMessage}
            registrationError={registrationError}
            isRegistrationSuccessful={isRegistrationSuccessful} /> : <Navigate to='/' />} />
          <Route exact path="/signin" element={!loggedIn ? <Login
            isLoading={isLoading}
            handleLogin={handleLogin}
            loginError={loginError}
            loginErrorMessage={loginErrorMessage} /> : <Navigate to='/' />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
