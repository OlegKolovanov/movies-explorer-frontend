import React from "react";
import './App.css';
import Main from '../Main/Main';
import {Route, Routes} from 'react-router-dom';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Portfolio/Portfolio";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {

  return (
    <div className="app">
 <Routes>
   <Route path="/" element={<Main />} />
   <Route path="/movies" element={<Movies />} />
   <Route path="/saved-movies" element={<SavedMovies />} />
   <Route path="/profile" element={<Profile />} />
   <Route path="/signup" element={<Register />}/>
   <Route path="/signin" element={<Login />}/>
   <Route path="*" element={<NotFound />}/>
 </Routes>
 </div>
  )
}

export default App;
