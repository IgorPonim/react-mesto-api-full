
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom'
import mesto from '../images/mesto.svg'


const Header = ({ email, onLoggout }) => {
    


    return (
        <header className='header'>
            <div className='header__line'></div>
            <img className='header__logo' src={mesto} alt='Лого' />
            <div className='header__menu'>
                <Switch>
                    <Route path={'/sign-in'}>
                        <Link className='header__link' to='sign-up'>Регистрация</Link>
                    </Route>
                    <Route path={'/sign-up'}>
                        <Link className='header__link' to='sign-in'>Войти</Link>
                    </Route>
                    <Route path={'/'}>
                        <p className='header__email'>{email}</p>
                        <Link className='header__link header__link_logout' to='sign-in' onClick={onLoggout}>Выйти</Link>
                    </Route>
                </Switch>

            </div>
        </header>
    )
}


export default Header