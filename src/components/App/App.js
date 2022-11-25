import './App.css';
import Register from "../Register/Register";
import Login from '../Login/Login';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import {Route, Routes, Link, useLocation, useNavigate} from 'react-router-dom';
import icon from '../../images/icon-profile.svg';
import {useState, useEffect} from "react";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import {mainApi} from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''});
  const [loggedIn, setLoggedIn] = useState(false);
  const [successIn, setSuccess] = useState(false);
  const [userData, setUserData] = useState({
      username: '',
      email: ''
  });
  const navigate = useNavigate();

  const handlePopupOpenClick = () => {
      setIsOpen(true);
  }

  const handlePopupCloseClick = () => {
      setIsOpen(false);
  }

  useEffect(() => {
        handleTokenCheck();
  }, [loggedIn])

  function handleTokenCheck() {
    let jwt = localStorage.getItem('token');
    if (jwt) {
        mainApi.getUserInfo(jwt)
            .then((res) => {
                if (res.email) {
                    setUserData({
                        username: res._id,
                        email: res.email
                    })
                    setLoggedIn(true);
                    setCurrentUser({name: res.name, email: res.email, _id: res._id})
                }
            })
            .catch(err => console.log(err));
        }
  }

  function handleRegister(name, email, password) {
      mainApi.register(name, email, password)
          .then(() => {
             setSuccess(true);
             navigate('/signin');
          })
          .catch(() => {
            setSuccess(false);
          })
  }

  function handleLogin(email, password) {
      mainApi.authorize(email, password)
          .then(res => {
              if (res.token) {
                  localStorage.setItem('token', res.token);
                  setLoggedIn(true);
                  navigate('/movies');
              }
          })
          .catch(() => {
              setSuccess(false);
              setLoggedIn(false);
          })
  }

  function handleUpdateUser(data) {
      let jwt = localStorage.getItem('token');
      mainApi.editProfileInfo(data, jwt)
          .then(() => {
              setCurrentUser({
                  name: data.name,
                  email: data.email,
              })
          })
          .catch(err => console.log(err))
  }

  function handleLogOut() {
      localStorage.removeItem('token');
      setUserData({
         username: '',
         email: '',
      });
      setLoggedIn(false);
      navigate('/signin');
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="App">
            <Routes>
                <Route path="/signup" element={
                    <Register
                        handleRegister={handleRegister}
                    />
                }/>
                <Route path="/signin" element={
                    <Login
                        handleLogin={handleLogin}
                    />
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
                            buttonText="Редактировать"
                            onUpdateUser={handleUpdateUser}
                            onLogOut={handleLogOut}
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
