import './Navigation.css';
import {NavLink} from "react-router-dom";
import React from "react";
import icon from "../../images/icon-profile.svg";

export default function Navigation(props) {
    return (
        <section className={`navigation ${props.isOpen ? 'popup__opened' : ''}`}>
            <div className="navigation__popup">
                <button className="navigation__popup_close-btn" type="button" onClick={props.onClose}></button>
                <div className="navigation__popup-container">
                    <nav className="navigation__popup-container_links">
                        <NavLink
                            to="/"
                            className={'navigation__btn navigation__btn-main'}
                            end
                            onClick={props.onClose}
                        >
                            Главная
                        </NavLink>
                        <NavLink
                            to="/movies"
                            className={({isActive}) => isActive ? 'navigation__btn navigation__btn-films navigation__btn_active' : 'navigation__btn navigation__btn-films'}
                            onClick={props.onClose}
                        >
                            Фильмы
                        </NavLink>
                        <NavLink
                            to="/saved-movies"
                            className={({isActive}) => isActive ? 'navigation__btn navigation__btn-saved navigation__btn_active' : 'navigation__btn navigation__btn-saved'}
                            onClick={props.onClose}
                        >
                            Сохраненные фильмы
                        </NavLink>
                    </nav>
                    <NavLink
                        to="/profile"
                        className={({isActive}) => isActive ? 'navigation__btn navigation__btn-profile navigation__btn_active' : 'navigation__btn navigation__btn-profile'}
                        onClick={props.onClose}
                    >
                        Аккаунт
                        <img src={icon} className="header__icon-profile" alt="Icon"/>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}