import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header({location, children}) {
    return (
        <header className={`header ${location === '/' ? 'header__theme_color' : 'header__theme_dark'}`}>
            <Link className="header__logo" to="/" />
            <div className="header__navigation">{children}</div>
        </header>
    )
}




