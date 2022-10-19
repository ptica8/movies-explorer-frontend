import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={
                <>
                    <Header>
                        <Link to="/" className="header__btn header__btn-registration">Регистрация</Link>
                        <Link to="/" className="header__btn header__btn-login">Войти</Link>
                    </Header>
                    <Main />
                    <Footer />
                </>
            }/>
        </Routes>
    </div>
  );
}

export default App;
