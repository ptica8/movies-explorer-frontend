import React from "react";
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy; 2022</p>
                <div className="footer__navigation">
                    <a className="social__link social__link_footer"
                       href="https://practicum.yandex.ru"
                       target="_blank"
                       rel="noreferrer"
                    >
                        Яндекс.Практикум
                    </a>
                    <a className="social__link social__link_footer"
                       href="https://github.com/ptica8"
                       target="_blank"
                       rel="noreferrer">
                        Github
                    </a>
                </div>
            </div>
        </footer>
    )
}