import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header({children}) {
    return (
        <header className="header">
            <Link className="header__logo" to="/" />
            <div className="header__navigation">{children}</div>
        </header>
    )
}




