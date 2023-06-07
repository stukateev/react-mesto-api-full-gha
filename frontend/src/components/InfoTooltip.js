import success from '../images/success.svg'
import error from '../images/error.svg'
export default function InfoTooltip ({isOpen, onClose, isSuccess}) {
    return(
        <div className={`popup popup_type_change-avatar ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className="popup__content">
                <button className="popup__close" type='button'></button>
                <img src={isSuccess ? success : error} alt="Результат" className="popup-auth__image"></img>
                <h2 className="popup-auth__title">{isSuccess ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
            </div>
        </div>
    )
}
