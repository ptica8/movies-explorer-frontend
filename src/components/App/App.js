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
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {mainApi} from '../../utils/MainApi';
import MoviesApi from "../../utils/MoviesApi";

function App() {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''});
	const [loggedIn, setLoggedIn] = useState(false);
	const [input, setInput] = useState('');
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
	const [successIn, setSuccess] = useState(false);
	const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false)
	const [isShortMovie, setIsShortMovie] = useState(false);
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
		if (location.pathname === '/movies') {
			localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
		}
	}, [filteredMovies])

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
		setLoggedIn(false);
		localStorage.removeItem('token');
		localStorage.removeItem('filteredMovies');
		localStorage.removeItem('savedMovies');
		setCurrentUser({name: '', email: '', _id: ''})
		navigate('/');
	}

	const filterOnInput = (movie, input) => {
		const lowerCaseInput = input?.toLowerCase();
		return movie.nameRU?.toLowerCase().includes(lowerCaseInput) || movie.nameEN?.toLowerCase().includes(lowerCaseInput);
	}
	const filterOnShortMovieCheckbox = (movie, checkedStatus) => {
		return checkedStatus ? movie.duration <= 40 : true;
	}
	const filterMovies = (movies) => {
		return movies.filter(movie => filterOnInput(movie, input) && filterOnShortMovieCheckbox(movie, isShortMovie))
	};

	function onCheckboxChange() {
		if (location.pathname === '/movies') {
			setFilteredMovies(filterMovies(movies));
		} else if (location.pathname === '/saved-movies') {
			setSavedMovies(filterMovies(movies))
		}
	}

	function handleGetMovieList(input) {
		setIsLoading(true);
		setHasError(false);
		MoviesApi()
			.then((movies) => {
				setInput(input);
				setMovies(movies);
				setFilteredMovies(filterMovies(movies));
				setIsLoading(false);
			})
			.catch(err => {
				setHasError(true);
				console.log(err)
			});
	}

	function handleGetSavedMovies() {
		let jwt = localStorage.getItem('token');
		mainApi.getSavedMovies(jwt)
			.then((res) => {
				setSavedMovies(filterMovies(res))
				localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
			})
			.catch(err => console.log(err))
	}

	function handleMovieLikeToSaved(movie) {
		const jwt = localStorage.getItem('token');
		mainApi.addLikeToMovieSaved(jwt, movie, currentUser)
			.then((res) => {
				const newMovieList = [...savedMovies, {...res.data, id: res.data.movieId}]
				setSavedMovies(newMovieList);
				localStorage.setItem('savedMovies', JSON.stringify(newMovieList));
			})
			.catch(err => console.log(err))
	}

	function handleMovieLikeRemove(savedMovieId) {
		const jwt = localStorage.getItem('token');
		mainApi.deleteMovie(jwt, savedMovieId, currentUser)
			.then(() => {
				const newMovieList = savedMovies.filter((savedMovie) => {
					return savedMovie._id !== savedMovieId
				});
				setSavedMovies(newMovieList);
				localStorage.setItem('savedMovies', JSON.stringify(newMovieList));
			})
			.catch(err => console.log(err))
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="App">
				<Routes>
					<Route path="/signup" element={
						!loggedIn ? <Register handleRegister={handleRegister}/> : <Navigate to='/movies' replace/>
					}/>,,
					<Route path="/signin" element={
						!loggedIn ? <Login handleLogin={handleLogin}/> : <Navigate to='/movies' replace/>
					}/>
					<Route path="/" element={
						<>
							<Header location={location.pathname}>
								<Link to="/signup" className="header__btn header__btn-registration">Регистрация</Link>
								<Link to="/signin" className="header__btn header__btn-login">Войти</Link>
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
								onMovieDelete={handleMovieLikeRemove}
								filteredMovies={filteredMovies}
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
