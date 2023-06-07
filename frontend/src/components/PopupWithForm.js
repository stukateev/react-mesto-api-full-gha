export default function PopupWithForm({
                                          title,
                                          name,
                                          buttonText,
                                          children,
                                          isOpen,
                                          onClose,
                                          onSubmit,
                                      }) {
    return (
        <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__content">
                <button
                    onClick={onClose}
                    type="button"
                    className="button popup__close"
                    aria-label="Закрытие"
                ></button>
                <h2 className="popup__title">{title}</h2>
                <form
                    className="form form_type_new-card"
                    name={name}
                    onSubmit={onSubmit}

                >
                    {children}
                    <button className="button popup__button" type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}