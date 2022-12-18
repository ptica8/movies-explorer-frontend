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
import {useState, useEffect, useContext} from "react";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {mainApi} from '../../utils/MainApi';
import MoviesApi from "../../utils/MoviesApi";
import {
	AUTHORIZATION_ERROR_MESSAGE,
	EXISTING_EMAIL_ERROR_MESSAGE, INCORRECT_EMAIL_PASSWORD_DATA_ERROR_MESSAGE, INVALID_LOGIN_DATA_ERROR_MESSAGE,
	REGISTER_ERROR_MESSAGE, SERVER_ERROR_MESSAGE, UPDATE_FAILED_ERROR_MESSAGE,
	UPDATE_USER_SUCCESS_MESSAGE
} from "../../constants/constants";

function App() {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''});
	const [loggedIn, setLoggedIn] = useState(false);
	const [input, setInput] = useState(localStorage.getItem('input') || '');
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
	const [successIn, setSuccess] = useState(false);
	const [savedMovies, setSavedMovies] = useState([]);
	const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false)
	const [isShortMovie, setIsShortMovie] = useState(localStorage.getItem('isShortMovie') === 'true' || false);
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const handlePopupOpenClick = () => {
		setIsOpen(true);
	}
	const handlePopupCloseClick = () => {
		setIsOpen(false);
	}

	useEffect(() => {
		if (location.pathname === '/movies') {
			if (filteredMovies.length === 0) return;
			localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
		}
	}, [filteredMovies])

	useEffect(() => {
		handleTokenCheck();
		handleGetSavedMovies();
	}, [])

	useEffect(() => {
		if (!localStorage.getItem('input') && !localStorage.getItem('isShortMovie')) return;
		if (location.pathname === '/saved-movies') return;
		setInput(localStorage.getItem('input') || '');
		setIsShortMovie(localStorage.getItem('isShortMovie') === 'true' || false);
		setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')) || []);
	}, [location]);

	useEffect(() => {
		setFilteredSavedMovies(filterMovies(savedMovies));
	}, [savedMovies])

	useEffect(() => {
		window.addEventListener("storage", () => {
			if (localStorage.getItem('token') === null) {
				handleLogOut();
			}
		});
	}, [])

	function handleTokenCheck() {
		let jwt = localStorage.getItem('token');
		if (jwt) {
			mainApi.getUserInfo(jwt)
				.then((res) => {
					if (res.email) {
						setCurrentUser({name: res.name, email: res.email, _id: res._id})
						setLoggedIn(true);
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
				setMessage('');
				setSuccess(true);
				handleLogin(email, password);
			})
			.catch((err) => {
				setSuccess(false);
				if (err === 'Ошибка 409') {
					setMessage(EXISTING_EMAIL_ERROR_MESSAGE)
				} else {
					setMessage(REGISTER_ERROR_MESSAGE)
				}
			})
	}

	function handleLogin(email, password) {
		mainApi.authorize(email, password)
			.then(res => {
				if (res.token) {
					setMessage('');
					localStorage.setItem('token', res.token);
					setLoggedIn(true);
					setSuccess(true);
					navigate('/movies');
					handleGetSavedMovies();
				}
			})
			.catch((err) => {
				setSuccess(false);
				setLoggedIn(false);
				if (err === 'Ошибка 400') {
					setMessage(INVALID_LOGIN_DATA_ERROR_MESSAGE)
				} else if (err === 'Ошибка 401') {
					setMessage(INCORRECT_EMAIL_PASSWORD_DATA_ERROR_MESSAGE)
				} else if (err === 'Ошибка 500') {
					setMessage(SERVER_ERROR_MESSAGE)
				} else {
					setMessage(AUTHORIZATION_ERROR_MESSAGE)
				}
			})
	}

	function handleUpdateUser(data) {
		let jwt = localStorage.getItem('token');
		mainApi.editProfileInfo(data, jwt)
			.then(() => {
				setMessage('');
				setCurrentUser({
					name: data.name,
					email: data.email,
				});
				setMessage(UPDATE_USER_SUCCESS_MESSAGE)
			})
			.catch(err => {
				handleTokenCheck();
				if (err === 'Ошибка 409') {
					setMessage(EXISTING_EMAIL_ERROR_MESSAGE)
				} else {
					setMessage(UPDATE_FAILED_ERROR_MESSAGE)
				}
			})
	}

	function handleLogOut() {
		setLoggedIn(false);
		localStorage.clear();
		setCurrentUser({name: '', email: '', _id: ''})
		setFilteredMovies([]);
		setMovies([]);
		setSavedMovies([]);
		setInput('');
		setIsShortMovie('');
		navigate('/');
	}

	const filterOnInput = (movie, input) => {
		const lowerCaseInput = input?.toLowerCase();
		return movie.nameRU?.toLowerCase().includes(lowerCaseInput) || movie.nameEN?.toLowerCase().includes(lowerCaseInput);
	}
	const filterOnShortMovieCheckbox = (movie, checkedStatus) => {
		return checkedStatus ? movie.duration <= 40 : true;
	}
	const filterMovies = (movies, checkedStatus) => {
		return movies.filter(movie => filterOnInput(movie, input) && filterOnShortMovieCheckbox(movie, checkedStatus));
	};

	function onCheckboxChange(status) {
		if (location.pathname === '/movies') {
			setFilteredMovies(filterMovies(movies, status));
		} else {
			setFilteredSavedMovies(filterMovies(savedMovies, status))
		}
	}

	function handleGetMovieList(input) {
		setHasError(false);
		setInput(input);
		setIsShortMovie(isShortMovie)
		handleTokenCheck();
		setIsLoading(true);
		MoviesApi()
			.then((res) => {
				setMovies(res);
				setFilteredMovies(filterMovies(res, isShortMovie));
				setIsLoading(false);
				localStorage.setItem('input', input)
				localStorage.setItem('isShortMovie', isShortMovie.toString())
			})
			.catch(err => {
				setHasError(true);
				console.log(err)
			});
	}

	function handleGetSavedMovies() {
		let jwt = localStorage.getItem('token');
		setInput('')
		setIsShortMovie(false)
		mainApi.getSavedMovies(jwt)
			.then((res) => {
				setSavedMovies(res)
				setFilteredSavedMovies(filterMovies(savedMovies, isShortMovie))
			})
			.catch(err => {
				console.log(err)
				handleTokenCheck();
			})
	}

	function handleSavedMoviesSearch(savedMoviesInput, savedMoviesIsShortMovie) {
		setInput(savedMoviesInput);
		setIsShortMovie(savedMoviesIsShortMovie);
		setFilteredSavedMovies(filterMovies(savedMovies, isShortMovie))
	}

	function handleMovieLikeToSaved(movie) {
		const jwt = localStorage.getItem('token');
		mainApi.addLikeToMovieSaved(jwt, movie, currentUser)
			.then((res) => {
				const newMovieList = [...savedMovies, {...res.data, id: res.data.movieId}]
				setSavedMovies(newMovieList);
			})
			.catch(err => {
				console.log(err)
				handleTokenCheck()
			})
	}

	function handleMovieLikeRemove(savedMovieId) {
		const jwt = localStorage.getItem('token');
		mainApi.deleteMovie(jwt, savedMovieId, currentUser)
			.then(() => {
				const newMovieList = savedMovies.filter((savedMovie) => {
					return savedMovie._id !== savedMovieId
				});
				setSavedMovies(newMovieList);
			})
			.catch(err => {
				console.log(err)
				handleTokenCheck();
			})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="App">
				<Routes>
					<Route path="/signup" element={
						!loggedIn ? <Register handleRegister={handleRegister} message={message}/> :
							<Navigate to='/movies' replace/>
					}/>
					<Route path="/signin" element={
						!loggedIn ? <Login handleLogin={handleLogin} message={message}/> :
							<Navigate to='/movies' replace/>
					}/>
					<Route path="/" element={
						<>
							<Header location={location.pathname}>
								{!loggedIn ?
									<>
										<Link
											to="/signup"
											className="header__btn header__btn-registration"
										>
											Регистрация
										</Link>
										<Link
											to="/signin"
											className="header__btn header__btn-login"
										>
											Войти
										</Link>
									</> :
									<>
										<Link
											to="/movies"
											className="header__btn header__btn-films"
										>
											Фильмы
										</Link>
										<Link
											to="/saved-movies"
											className="header__btn header__btn-saved"
										>
											Сохраненные фильмы
										</Link>
										<Link
											to="/profile"
											className="header__btn header__btn-profile"
										>
											Аккаунт
											<img src={icon} className="header__icon-profile" alt="Icon"/>
										</Link>
									</>
								}
							</Header>
							<Main/>
							<Footer/>
						</>
					}/>
					<Route path="/movies" element={
						<>
							<Header location={location.pathname} isOpen={handlePopupOpenClick}>
								<Link to="/movies" className="header__btn header__btn-films">Фильмы</Link>
								<Link to="/saved-movies" className="header__btn header__btn-saved">Сохраненные
									фильмы</Link>
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
								movies={movies}
								filteredMovies={filteredMovies}
								savedMovies={savedMovies}
								isLoading={isLoading}
								setIsLoading={setIsLoading}
								input={input}
								setInput={setInput}
								hasError={hasError}
								onMovieLike={handleMovieLikeToSaved}
								onMovieLikeRemove={handleMovieLikeRemove}
								getMovieList={handleGetMovieList}
								getSavedMovieList={handleGetSavedMovies}
								location={location}
								isShortMovie={isShortMovie}
								setIsShortMovie={setIsShortMovie}
								setFilteredMovies={setFilteredMovies}
								onCheckboxChange={onCheckboxChange}
							/>
							<Footer/>
						</>
					}/>
					<Route path="/saved-movies" element={
						<>
							<Header location={location.pathname} isOpen={handlePopupOpenClick}>
								<Link to="/movies" className="header__btn header__btn-films">Фильмы</Link>
								<Link to="/saved-movies" className="header__btn header__btn-saved">Сохраненные
									фильмы</Link>
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
								savedMovies={savedMovies}
								isLoading={isLoading}
								getSavedMovieList={handleGetSavedMovies}
								handleSavedMoviesSearch={handleSavedMoviesSearch}
								onMovieDelete={handleMovieLikeRemove}
								filteredSavedMovies={filteredSavedMovies}
								setIsLoading={setIsLoading}
								input={input}
								setInput={setInput}
								location={location}
								isShortMovie={isShortMovie}
								setIsShortMovie={setIsShortMovie}
								setFilteredMovies={setFilteredMovies}
								onCheckboxChange={onCheckboxChange}
							/>
							<Footer/>
						</>
					}/>
					<Route path="/profile" element={
						<>
							<Header location={location.pathname} isOpen={handlePopupOpenClick}>
								<Link to="/movies" className="header__btn header__btn-films">Фильмы</Link>
								<Link to="/saved-movies" className="header__btn header__btn-saved">Сохраненные
									фильмы</Link>
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
								message={message}
								setMessage={setMessage}
								title="Привет"
								onUpdateUser={handleUpdateUser}
								onLogOut={handleLogOut}
							/>
						</>
					}/>
					<Route path="/*" element={
						<PageNotFound/>
					}/>
					<Route exact path="/" element={
						loggedIn ? (<Navigate to="/movies" replace/>) : (<Navigate to="/" replace/>)
					}/>
				</Routes>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
