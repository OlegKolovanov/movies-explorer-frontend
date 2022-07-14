import React, { useEffect, useState } from "react";
import './App.css';
import Main from '../Main/Main';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
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

  const location = useLocation();
  const history = useNavigate();
  const jwt = localStorage.getItem('jwt');

  const [loggedIn, setLoggedIn] = useState(false)
  const [userMovie, setUserMovie] = useState([])
  const [longUserMovie, setLongUserMovie] = useState([])

  useEffect(() => {
    if (jwt) {
      mainApi.getUser(jwt)
        .then((res) => {
          if (res) {
            console.log(res)
            setLoggedIn(true)
            setCurrentUser(res)
            history('/movies')
          }
        })
        .catch((err) => {
          console.log(err)
        })
      mainApi.getMovie(jwt)
        .then((res) => {
          console.log(res.data)
          const savedMoviesList = res.data.filter(
            (item) => item.owner === currentUser._id

          );
          console.log(savedMoviesList)
          setLongUserMovie(savedMoviesList)
          setUserMovie(savedMoviesList)
        })
    }
  }, [loggedIn])

  const [movie, setMovie] = useState([])
  const [searchCard, setSearchCard] = useState([])
  const [shortMovies, setShortMovies] = useState(false)
  const [saveShortMovies, setSaveShortMovies] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [longMovie, setLongMovie] = useState([])

  console.log(location.pathname)
  //SearchForm
  function handleSearchForm(films) {
    const regexp = new RegExp(films, "gi")
    const findedMovies = movie.filter(
      (item) => regexp.test(item.nameRU) || regexp.test(item.nameEN)
    )

    setSearchCard(findedMovies)
    setLongMovie(findedMovies)
  }

  function handleSaveMovieSearch(films) {
    const regexp = new RegExp(films, "gi")
    const findedMovies = userMovie.filter(
      (item) => regexp.test(item.nameRU) || regexp.test(item.nameEN)
    )
    setUserMovie(findedMovies)
  }


  function handleCheckBox() {
    console.log(searchCard)
    setShortMovies(!shortMovies);
    if (shortMovies === true) {
      setSearchCard(longMovie)

    }
  }

  function handleSaveCheckBox() {
    console.log(searchCard)
    setSaveShortMovies(!saveShortMovies);
    if (saveShortMovies === true) {
      setUserMovie(longUserMovie)
    }
  }


  function filterShortMovies() {

    if ((searchCard.length !== 0 || searchCard !== "undefind") && shortMovies === true) {
      const shortMovie = searchCard.filter(movie => {
        return movie.duration <= 40
      })
      setSearchCard(shortMovie)
    }
  }

  function filterSaveShortMovie() {
    console.log(userMovie)
    if ((userMovie.length !== 0 || userMovie !== "undefind") && saveShortMovies === true) {
      const shortMovie = userMovie.filter(movie => {
        return movie.duration <= 40
      })
      setUserMovie(shortMovie)
    }
  }

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
      });
  }

  function handleRegister({ name, email, password }) {
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          console.log(email, password)
          handleLogin({ email, password })
        }
      })
      .catch((err) => {
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
    setLoggedIn(false)
    history('/signin')
  }

  useEffect(() => {
    beatfilmApi.getMovies()
      .then((res) => {
        setMovie(res)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (shortMovies === true) {
      filterShortMovies()
    }
    if (saveShortMovies === true) {
      filterSaveShortMovie()
    }
  }, [shortMovies, saveShortMovies])


  function handleUpdateProfile(data) {

    console.log(jwt)
    mainApi.updateUser(data, jwt)
      .then((res) => {

        console.log(res.data.name)
        setCurrentUser(res.data);

      })
      .catch((err) => {
        console.log(err);
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
            shortMovies={filterShortMovies} /> : <Navigate to='/signin' />} />
          <Route path="/saved-movies" element={loggedIn ? <SavedMovies card={userMovie}
            handleDelete={handleDelete}
            handleSaveSearchForm={handleSaveMovieSearch}
            shortSaveMovies={filterSaveShortMovie}
            checkedSave={saveShortMovies}
            sortSaveMovie={handleSaveCheckBox} /> : <Navigate to='/signin' />} />
          <Route path="/profile" element={loggedIn ? <Profile handleLogout={handleLogout} handleUpdateProfile={handleUpdateProfile} /> : <Navigate to='/signin' />} />
          <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
