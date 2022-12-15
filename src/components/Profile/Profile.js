import React, {useContext, useState, useEffect} from "react";
import './Profile.css'
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {UPDATE_USER_SUCCESS_MESSAGE} from "../../constants/constants";

export default function Profile(props) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const isButtonDisabled = currentUser.name === name && currentUser.email === email;
	const messageClassName = props.message === UPDATE_USER_SUCCESS_MESSAGE ? "profile__edit_success-message" : "form__input-error";

	useEffect(() => {
		setName(currentUser.name);
		setEmail(currentUser.email);
	}, [currentUser]);

	const handleSubmit = (e) => {
		e.preventDefault();
		props.onUpdateUser({
			name, email
		});
	}

	const handleNameChange = (e) => {
		setName(e.target.value);
		if (props.message) props.setMessage('');
	}

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		if (props.message) props.setMessage('');
	}

	return (
		<section className="profile">
			<form
				name="form-profile"
				className="profile__form"
				onSubmit={handleSubmit}
			>
				<h2 className="profile__title">{props.title}, {currentUser.name || ''}!</h2>
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
					<span className={messageClassName}>
						{props.message}
					</span>
					<button type="submit" className="profile__edit_button" onSubmit={handleSubmit}
							disabled={isButtonDisabled}>
						Редактировать
					</button>
					<button type="button" className="profile__edit_exit" onClick={props.onLogOut}>
						Выйти из аккаунта
					</button>
				</div>
			</form>
		</section>
	)
}