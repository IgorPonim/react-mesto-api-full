import { useState } from "react";
import { Link } from "react-router-dom"
import '../styles/spinner.css'

const Login = ({ loggedIn, isloading }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    function handleChange(ev) {
        if (ev.target.name === 'email') {
            setEmail(ev.target.value)
        }
        else if (ev.target.name === 'password') {
            setPassword(ev.target.value)
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        loggedIn(email, password)
    }


    return (
        <form className='register__form' onSubmit={handleSubmit}>
            <h2 className="register__title">Вход</h2>
            <input onChange={handleChange} value={email || ''} id='input-email' name='email' type='email' placeholder='Введите Email'
                className='register__input' />
            <input onChange={handleChange} value={password || ''} id='input-password' name='password' type='password' placeholder='Введите Пароль'
                className='register__input' />
            <button type='submit' className='register__button'>
                {isloading === true && (
                    <> <>Идет загрузка...</>
                        <div className="loader">
                            <div className="ball one"><div className="inner"></div></div>
                            <div className="ball two"><div className="inner"></div></div>
                            <div className="ball three"><div className="inner"></div></div>
                            <div className="ball four"><div className="inner"></div></div>
                            <div className="ball five"><div className="inner"></div></div>
                            <div className="ball six"><div className="inner"></div></div>
                            <div className="ball center"><div className="inner"></div></div>
                            
                        </div>
                    </>

                )}
                {isloading === false && (
                     <>
                     Войти 
                     </>
                )}


            </button>
            <Link className="register__link" to=""></Link>
        </form>
    )
}
export default Login