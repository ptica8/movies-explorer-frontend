import './App.css';
import Register from "../Register/Register";
import Login from '../Login/Login';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import icon from '../../images/icon-profile.svg';
import {useState} from "react";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  const [loggedIn, setLoggedIn] = useState(false);

  const handlePopupOpenClick = () => {
      setIsOpen(true);
  }

  const handlePopupCloseClick = () => {
      setIsOpen(false);
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="App">
            <Routes>
                <Route path="/signup" element={
                    <Register />
                }/>
                <Route path="/signin" element={
                    <Login />
                }/>
                <Route path="/" element={
                    <>
                        <Header location={location.pathname}>
                            <Link to="/signup" className="header__btn header__btn-registration">Регистрация</Link>
                            <Link to="/signin" className="header__btn header__btn-login">Войти</Link>
                        </Header>
                        <Main />
                        <Footer />
                    </>
                }/>
                <Route path="/movies" element={
                    <>
                        <Header location={location.pathname} isOpen={handlePopupOpenClick}>
                            <Link to="/movies" className="header__btn header__btn-films">Фильмы</Link>
                            <Link to="/saved-movies" className="header__btn header__btn-saved">Сохраненные фильмы</Link>
                            <Link to="/profile" className="header__btn header__btn-profile">
                                Аккаунт
                                <img src={icon} className="header__icon-profile" alt="Icon"/>
                            </Link>
                        </Header>
                        <Navigation isOpen={isOpen} onClose={handlePopupCloseClick} />
                        <Movies />
                        <Footer />
                    </>
                }/>
                <Route path="/saved-movies" element={
                    <>
                        <Header location={location.pathname} isOpen={handlePopupOpenClick}>
                            <Link to="/movies" className="header__btn header__btn-films">Фильмы</Link>
                            <Link to="/saved-movies" className="header__btn header__btn-saved">Сохраненные фильмы</Link>
                            <Link to="/profile" className="header__btn header__btn-profile">
                                Аккаунт
                                <img src={icon} className="header__icon-profile" alt="Icon"/>
                            </Link>
                        </Header>
                        <Navigation isOpen={isOpen} onClose={handlePopupCloseClick} />
                        <SavedMovies/>
                        <Footer />
                    </>
                }/>
                <Route path="/profile" element={
                    <>
                        <Header location={location.pathname} isOpen={handlePopupOpenClick}>
                            <Link to="/movies" className="header__btn header__btn-films">Фильмы</Link>
                            <Link to="/saved-movies" className="header__btn header__btn-saved">Сохраненные фильмы</Link>
                            <Link to="/profile" className="header__btn header__btn-profile">
                                Аккаунт
                                <img src={icon} className="header__icon-profile" alt="Icon"/>
                            </Link>
                        </Header>
                        <Navigation isOpen={isOpen} onClose={handlePopupCloseClick} />
                       <Profile
                            title="Привет"
                            userName="Виталий"
                            buttonText="Редактировать"
                       />
                    </>
                }/>
                <Route path="/*" element={
                    <PageNotFound />
                }/>
            </Routes>
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
