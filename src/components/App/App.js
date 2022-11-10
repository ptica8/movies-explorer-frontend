import './App.css';
import Register from "../Register/Register";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import icon from '../../images/icon-profile.svg';
import React from "react";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
  const location = useLocation();

  return (
    <div className="App">
        <Routes>
            <Route path="/signup" element={
                <Register
                    title="Добро пожаловать!"
                    buttonText="Зарегистрироваться"
                />
            }/>
            <Route path="/" element={
                <>
                    <Header location={location.pathname}>
                        <Link to="/" className="header__btn header__btn-registration">Регистрация</Link>
                        <Link to="/" className="header__btn header__btn-login">Войти</Link>
                    </Header>
                    <Main />
                    <Footer />
                </>
            }/>
            <Route path="/movies" element={
                <>
                    <Header location={location.pathname}>
                        <Link to="/movies" className="header__btn header__btn-films">Фильмы</Link>
                        <Link to="/saved-movies" className="header__btn header__btn-saved">Сохраненные фильмы</Link>
                        <Link to="/profile" className="header__btn header__btn-profile">
                            Аккаунт
                            <img src={icon} className="header__icon-profile" alt="Icon"/>
                        </Link>
                    </Header>
                    <Movies />
                    <Footer />
                </>
            }/>
            <Route path="/saved-movies" element={
                <>
                    <Header location={location.pathname}>
                        <Link to="/movies" className="header__btn header__btn-films">Фильмы</Link>
                        <Link to="/saved-movies" className="header__btn header__btn-saved">Сохраненные фильмы</Link>
                        <Link to="/profile" className="header__btn header__btn-profile">
                            Аккаунт
                            <img src={icon} className="header__icon-profile" alt="Icon"/>
                        </Link>
                    </Header>
                    <SavedMovies/>
                    <Footer />
                </>
            }/>
            <Route path="/profile" element={
                <>
                    <Header location={location.pathname}>
                        <Link to="/movies" className="header__btn header__btn-films">Фильмы</Link>
                        <Link to="/saved-movies" className="header__btn header__btn-saved">Сохраненные фильмы</Link>
                        <Link to="/profile" className="header__btn header__btn-profile">
                            Аккаунт
                            <img src={icon} className="header__icon-profile" alt="Icon"/>
                        </Link>
                    </Header>
                   <Profile />
                </>
            }/>
            <Route path="/*" element={
                <PageNotFound />
            }/>
        </Routes>
    </div>
  );
}

export default App;
