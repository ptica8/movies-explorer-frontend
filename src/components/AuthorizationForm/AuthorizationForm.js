import './AuthorizationForm.css';
import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {useFormWithValidation} from '../../useFormWithValidation';

export default function AuthorizationForm({handleRegister, handleLogin, message, ...props}) {
	const {values, handleChange, errors, isValid, setIsValid, resetForm} = useFormWithValidation();
	const location = useLocation();
	const [activeMessage, setActiveMessage] = useState('');

	const handleValueChange = (e) => {
		handleChange(e);
	}

	const handleSubmitRegister = (e) => {
		e.preventDefault();
		const {name, email, password} = values;
		handleRegister(name, email, password);
	}

	const handleSubmitLogin = (e) => {
		e.preventDefault();
		const {email, password} = values;
		handleLogin(email, password);
	}

	useEffect(() => {
		if (message) {
			setActiveMessage(message)
		}
	}, [message])

	useEffect(() => {
		setActiveMessage('');
	}, [location]);

	return (
		<div className="form">
			<div className="form__container">
				<Link className="header__logo" to="/"/>
				<h2 className="form__title">{props.title}</h2>
				<form
					name={`form-${props.nameForm}`}
					className={`general__form ${props.nameForm}__form`}
					onSubmit={props.nameForm === 'register' ? handleSubmitRegister : handleSubmitLogin}
					action="#"
				>
					<div className="form__form-set">
						{location.pathname === '/signup' ? (
							<>
								<label className="form__input-label">
									Имя
								</label>
								<input
									id="name"
									name="name"
									type="text"
									className={`form__input form__input_type_${props.nameForm} form__input-name`}
									minLength={2}
									maxLength={30}
									pattern="[а-яА-ЯёЁa-zA-Z0-9\- ]{1,}"
									required
									placeholder="Имя"
									value={values.name}
									onChange={handleValueChange}
									autoComplete="name"
								/>
								<span className="form__input-error input-name-error">{errors.name || ''}</span>
							</>
						) : ''
						}
						<label className="form__input-label">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className={`form__input form__input_type_${props.nameForm} form__input-email`}
							pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
							required
							placeholder="Email"
							value={values.email}
							onChange={handleValueChange}
							autoComplete="email"
						/>
						<span className="form__input-error input-email-error">{errors.email || ''}</span>
						<label className="form__input-label">
							Пароль
						</label>
						<input
							id="password"
							name="password"
							type="password"
							className={`form__input form__input_type_${props.nameForm}`}
							required
							placeholder="Пароль"
							minLength={8}
							value={values.password}
							onChange={handleValueChange}
							autoComplete="current-password"
						/>
						<span className={`form__input-error input-password-error`}>
							{errors.password || activeMessage || ''}
						</span>
					</div>
					<div>
						<button type="submit" className={`form__button form__button_type_${props.nameForm}`}
								disabled={!isValid}>
							{props.buttonText}
						</button>
						<div className={`general__signin ${props.nameForm}__signin`}>
							<p className={`general__signin_text ${props.nameForm}__signin_text`}>{props.linkText}</p>
							<Link to={props.link}
								  className={`general__signin_link ${props.nameForm}__signin_link`}>{props.linkName}</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}