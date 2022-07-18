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
  const [profileUpdateMessage, setProfileUpdateMessage] = useState("");
  const [profileErrorMessage, setProfileErrorMessage] = useState("");
  const [isProfileUpdateSuccessful, setIsProfileUpdateSuccessful] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");


  function handleLogin({ email, password }) {
    console.log(email, password)
    if (!email || !password) {
      return;
    }

    console.log(email, password)
    mainApi
      .login(email, password)
      .then((res) => {
        if (!res) throw new Error("Неправильные имя пользователя или пароль");
        else {
          console.log(res)
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true)
          setCurrentUser(res)
          history('/movies')
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginErrorMessage("Не удалось войти, пожалуйста, проверьте данные");
        setLoginError(true);
      });
  }


  useEffect(() => {
    if (jwt) {
      Promise.all([mainApi.getUser(jwt), mainApi.getMovie(jwt)])
        .then(([user, movie]) => {

          setCurrentUser(user)
          setLoggedIn(true)
          const savedMoviesList = movie.data.filter(
            (item) => item.owner === currentUser._id

          );
          const movieList = JSON.parse(localStorage.getItem('movie'))
          setSearchCard(movieList)
          const listMovie = JSON.parse(localStorage.getItem('movies'))
          setLongUserMovie(savedMoviesList)
          setUserMovie(savedMoviesList)

          setMovie(listMovie)
          history("/movies");

        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  const checkbox = JSON.parse(localStorage.getItem('boolean'))

  useEffect(() => {

    if (localStorage.getItem('search')) {
      setShortMovies(checkbox)
      const previousSearchWord = JSON.parse(localStorage.getItem('search'))
      handleSearchForm(previousSearchWord)
    }
  }, [movie])

  function handleSearchForm(films) {
    setNothingFound(false);
    setIsLoading(true);
    const regexp = new RegExp(films, "gi")

    const findedMovies = movie.filter(
      (item) => regexp.test(item.nameRU) || regexp.test(item.nameEN)
    )
    // console.log(shortMovies)
    // console.log(findedMovies)

    setSearchCard(findedMovies)
    // console.log(searchCard)
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
    setNothingFound(false);
    setIsLoading(true);
    if (films === '') {
      setUserMovie(longUserMovie)
    }
    const regexp = new RegExp(films, "gi")
    const findedMovies = longUserMovie.filter(
      (item) => regexp.test(item.nameRU) || regexp.test(item.nameEN)
    )
    if (findedMovies.length === 0) {
      setNothingFound(false);
      setIsLoading(true);
    }

    setUserMovie(findedMovies)
    setTimeout(() => setIsLoading(false), 500)
  }
  // console.log(localStorage.getItem('boolean'))

  function handleCheckBox() {
    setShortMovies(!shortMovies)
    console.log(shortMovies)

  }

  // console.log(movie)


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
    console.log(userMovie)
    console.log(saveShortMovies)
    if ((userMovie.length !== 0 || userMovie !== "undefind") && !saveShortMovies === true) {
      const shortMovie = userMovie.filter(movie => {
        return movie.duration <= 40
      })
      setUserMovie(shortMovie)

    }
  }

  function handleRegister({ name, email, password }) {
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          console.log(email, password)
          setIsRegistrationSuccessful(true);
          setUserMessage("Вы успешно зарегистрированы!");
          setTimeout(() => handleLogin({ email, password }), 1000)
        }
      })
      .catch((err) => {
        setRegistrationError("Что-то пошло не так...");
        console.log(err);
      });
  }



  function handleLogout() {
    console.log('1')
    localStorage.clear()
    setLongUserMovie([])
    setSearchCard([])
    setUserMovie([])
    setLongMovie([])
    setLoggedIn(false)
    setSaveShortMovies([])
    setCurrentUser({})
    setShortMovies([])
    setMovie([])
    history('/signin')
  }

  useEffect(() => {
    beatfilmApi.getMovies()
      .then((res) => {
        setMovie(res)
      })
      .catch((err) => console.log(err))
  }, [loggedIn])

  // useEffect(() => {
  //   if (shortMovies === true) {
  //     console.log('1')
  //     filterShortMovies()
  //   }
  //   if (saveShortMovies === true) {
  //     filterSaveShortMovie()
  //   }
  // }, [shortMovies, saveShortMovies])


  function handleUpdateProfile(data) {
    setProfileUpdateMessage("");
    setProfileErrorMessage("");
    console.log(jwt)
    mainApi.updateUser(data, jwt)
      .then((res) => {
        setIsProfileUpdateSuccessful(true);
        setProfileUpdateMessage("Данные успешно изменены");
        console.log(res.data.name)
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
        console.log(newMovies)
        localStorage.setItem('userMovie', JSON.stringify((newMovies = [newMovies, ...userMovie])))
        setUserMovie(newMovies)
        setLongUserMovie(newMovies)
        console.log(newMovies)
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
      })
      .catch((err) => console.log(err))
  }, [loggedIn])


  return (

    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="/movies" element={loggedIn ? <Movies
            handleDelete={handleDelete} handleLike={handleLike}
            handleSearchForm={handleSearchForm}
            checked={shortMovies}
            saveCard={userMovie}
            card={searchCard}
            sortMovie={handleCheckBox}
            shortMovies={filterShortMovies}
            isNothingFound={nothingFound}
            isLoading={isLoading} /> : <Navigate to='/' />} />
          <Route path="/saved-movies" element={loggedIn ? <SavedMovies card={userMovie}
            handleDelete={handleDelete}
            handleSaveSearchForm={handleSaveMovieSearch}
            shortSaveMovies={filterSaveShortMovie}
            checkedSave={saveShortMovies}
            sortSaveMovie={handleSaveCheckBox}
            isNothingFound={nothingFound}
            isLoading={isLoading} /> : <Navigate to='/' />} />
          <Route path="/profile" element={loggedIn ? <Profile
            handleLogout={handleLogout}
            handleUpdateProfile={handleUpdateProfile}
            profileUpdateMessage={profileUpdateMessage}
            profileErrorMessage={profileErrorMessage}
            isProfileUpdateSuccessful={isProfileUpdateSuccessful}
          /> : <Navigate to='/' />} />
          <Route path="/signup" element={<Register
            handleRegister={handleRegister}
            userMessage={userMessage}
            registrationError={registrationError}
            isRegistrationSuccessful={isRegistrationSuccessful} />} />
          <Route path="/signin" element={<Login
            handleLogin={handleLogin}
            loginError={loginError}
            loginErrorMessage={loginErrorMessage} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
