import './App.css';
import Register from "../Register/Register";
import Login from '../Login/Login';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import {Route, Routes, Link, useLocation, useNavigate, Navigate} from 'react-router-dom';
import icon from '../../images/icon-profile.svg';
import {useState, useEffect} from "react";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import {mainApi} from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';

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
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
      let jwt = localStorage.getItem('token');
      if (loggedIn === true) {
          mainApi.getAllMovies(jwt)
              .then((moviesList) => {
                  setMovies(moviesList)
              })
              .catch(err => console.log(err))
      }
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
            .catch(err => {
                console.log(err);
                setLoggedIn(false);
            });
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
                  setSuccess(true);
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
      setIsLoading(true);
      mainApi.editProfileInfo(data, jwt)
          .then(() => {
              setCurrentUser({
                  name: data.name,
                  email: data.email,
              })
              setIsLoading(false);
          })
          .catch(err => console.log(err))
  }

  function handleLogOut() {
      setLoggedIn(false);
      localStorage.removeItem('token');
      setUserData({
         username: '',
         email: '',
      });
      navigate('/');
  }

  function handleGetMovieList(input) {
      MoviesApi()
          .then((movies) => {
              setMovies(movies.filter(movie => {
                  const lowerCaseInput = input?.toLowerCase();
                  return movie.nameRU?.toLowerCase().includes(lowerCaseInput) || movie.nameEN?.toLowerCase().includes(lowerCaseInput);
              }));
              setIsLoading(false);
          })
          .catch(err => console.log(err));
  }

  function handleMovieDelete(movie) {
      let jwt = localStorage.getItem('token');
      mainApi.deleteMovie(movie.id, jwt)
          .then(() => {
              const newMovieList = savedMovies.filter((c) => c._id === movie.id ? '' : c);
              setSavedMovies(newMovieList);
              localStorage.setItem('savedMovies', JSON.stringify(newMovieList))
          })
          .catch(err => console.log(err))
  }

  function handleMovieLikeToSaved(movie) {
      let jwt = localStorage.getItem('token');
      mainApi.addLikeToMovieSaved(jwt, movie)
          .then((savedMovie) => {
              const newMovieList = [...savedMovies, {...savedMovie, id: savedMovie.movieId}]
              console.log('newMovieList:', newMovieList)
              setSavedMovies(newMovieList);
              localStorage.setItem('savedMovies', JSON.stringify(newMovieList));
              setIsLoading(false);
          })
          .catch(err => console.log(err))
  }

  function handleMovieClick(movie) {

  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="App">
            <Routes>
                <Route path="/signup" element={
                    !loggedIn ? <Register handleRegister={handleRegister} /> : <Navigate to='/movies' replace />
                }/>
                <Route path="/signin" element={
                    !loggedIn ? <Login handleLogin={handleLogin} /> : <Navigate to='/movies' replace />
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
                        <ProtectedRoute
                            path="/movies"
                            component={Navigation}
                            isOpen={isOpen}
                            onClose={handlePopupCloseClick}
                        />
                        <ProtectedRoute
                            path="/movies"
                            component={Movies}
                            moviesList={movies}
                            savedMovies={savedMovies}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            onMovieLike={handleMovieLikeToSaved}
                            onMovieDelete={handleMovieDelete}
                            onMovieCLick={handleMovieClick}
                            getMovieList={handleGetMovieList}
                            location={location}
                        />
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
                        <ProtectedRoute
                            path="/saved-movies"
                            component={Navigation}
                            isOpen={isOpen}
                            onClose={handlePopupCloseClick}
                        />
                        <ProtectedRoute
                            path="/saved-movies"
                            component={SavedMovies}
                            savedMoviesList={savedMovies}
                            isLoading={isLoading}
                        />
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
                        <ProtectedRoute
                            path="/profile"
                            component={Navigation}
                            isOpen={isOpen}
                            onClose={handlePopupCloseClick}
                        />
                        <ProtectedRoute
                            path="/profile"
                            component={Profile}
                            title="Привет"
                            onUpdateUser={handleUpdateUser}
                            onLogOut={handleLogOut}
                        />
                    </>
                }/>
                <Route path="/*" element={
                    <PageNotFound />
                }/>
                <Route exact path="/" element={
                    loggedIn ? (<Navigate to="/movies" replace />) : (<Navigate to="/" replace />)
                }/>
            </Routes>
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
