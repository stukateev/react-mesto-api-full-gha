import logoSvg from "../images/logo.svg";
import { Routes, Route, Link } from 'react-router-dom';
export default  function Header({signOut,  email}){
    return (
        <header className="header">
            <img className="header__logo" src={logoSvg} alt="Место логотип" />
            <Routes>
                <Route path='/sign-in'
                       element={
                           <Link className="header__link" to='/sign-up'>Регистрация</Link>
                       }
                />
                <Route path='/sign-up'
                       element={ <Link className="header__link" to='/sign-in'>Войти</Link>
                        }
                />
                <Route path='/'
                       element={
                           <>
                               <div className="header__container">
                                   <h2 className="header__email">{email}</h2>
                                   <a className="header__link header__link_sign-out" onClick={signOut}>
                                       Выйти
                                   </a>
                               </div>
                           </>
                       }/>
            </Routes>
        </header>
    );
}