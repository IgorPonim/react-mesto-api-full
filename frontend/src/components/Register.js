import { useState } from "react";
import { Link } from "react-router-dom"


const Register = ({ onRegister }) => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')


    function handleChange(ev) {
        if (ev.target.name === 'email') {
            setEmail(ev.target.value)
        }
        else if (ev.target.name === 'password') {
            setpassword(ev.target.value)
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onRegister(email, password)
    }

    return (
        <form className='register__form' onSubmit={handleSubmit}>
            <h2 className="register__title">Регистрация</h2>
            <input onChange={handleChange} value={email || ''} id='input-email' name='email' type='email' placeholder='Введите Email'
                className='register__input' />
            <input onChange={handleChange} value={password || ''} id='input-password' name='password' type='password' placeholder='Введите Пароль'
                className='register__input' />
            <button type='submit' className='register__button'>Зарегистрироваться</button>
            <Link className="register__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </form>
    )


}

export default Register