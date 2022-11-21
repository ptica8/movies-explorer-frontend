import {Link} from "react-router-dom";
import React, {useState} from "react";
import './Profile.css'

export default function Profile(props) {
    const [data, setData] = useState({
        name: 'Виталий',
        email: 'pochta@yandex.ru',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        let { name, email, password } = data;

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((oldData) => ({
            ...oldData,
            [name]: value
        }))
    }

    return (
        <section className="profile">
            <form
                name="form-profile"
                className="profile__form"
                onSubmit={handleSubmit}
            >
                <h2 className="profile__title">{props.title}, {props.userName}!</h2>
                <fieldset className="profile__form-set">
                    <div className="profile__form-set_input">
                        <label className="profile__input-label">
                            Имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="profile__form_input form__input_type_profile form__input-name"
                            minLength={2}
                            required=""
                            placeholder="Имя"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile__form-set_input">
                        <label className="profile__input-label">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="profile__form_input form__input_type_profile form__input-email"
                            minLength={2}
                            required
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                </fieldset>
                <div className="profile__edit">
                    <button type="button" onSubmit={handleSubmit} className="profile__edit_button">
                        {props.buttonText}
                    </button>
                    <Link to="/signin" className="profile__edit_exit">Выйти из аккаунта</Link>
                </div>
            </form>
        </section>
    )
}