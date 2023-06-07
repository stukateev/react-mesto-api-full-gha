import {useState} from 'react'

export default function Login({ handleLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault()
        handleLogin({password, email}, 'login')
    }
    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__form_input" placeholder="Email" value={email || ""} type="email" onChange={handleChangeEmail}></input>
                <input className="auth__form_input" placeholder="Пароль" type="password" value={password || ""} autoComplete="current-password" onChange={handleChangePassword}></input>
                <button className="auth__form_submit-button" type="submit">Войти</button>
            </form>
        </div>
    )
}