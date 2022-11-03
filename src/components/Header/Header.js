import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header({location, children}) {
    return (
        <header className={`header ${location === '/' ? 'header__theme_color' : 'header__theme_dark'}`}>
            <Link className="header__logo" to="/" />
            <div className={`${location === '/' ? 'header__navigation' : 'header__navigation_movies'}`}>{children}</div>
            <button className={`${location === '/' ? 'header__navigation_hide' : 'header__burger'}`}></button>
        </header>
    )
}




