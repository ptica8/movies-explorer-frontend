import React, {useContext, useState, useEffect} from "react";
import './Profile.css'
import {CurrentUserContext} from '../../context/CurrentUserContext';

export default function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    },[currentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateUser({
            name, email
        })
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value === currentUser.name) {
            setOnEdit(false);
        } else {
            setOnEdit(true)
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value === currentUser.email) {
            setOnEdit(false);
        } else {
            setOnEdit(true)
        }
    }

    return (
        <section className="profile">
            <form
                name="form-profile"
                className="profile__form"
                onSubmit={handleSubmit}
            >
                <h2 className="profile__title">{props.title}, {currentUser.name}!</h2>
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
                            value={name}
                            onChange={handleNameChange}
                            autoComplete="name"
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
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="email"
                        />
                    </div>
                </fieldset>
                <div className="profile__edit">
                    <button type="submit" className="profile__edit_button" onSubmit={handleSubmit} disabled={!onEdit}>
                        Редактировать
                    </button>
                    <button type="button" className="profile__edit_exit" onClick={props.onLogOut}>Выйти из аккаунта</button>
                </div>
            </form>
        </section>
    )
}