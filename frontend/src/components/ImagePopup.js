import React from "react";

export default function ImagePopup({ card, onClose }) {
    let className = "popup popup-image"
    if(card) {
        className+=" popup_opened"
    }
    return (
        <>
                <div className={className}>
                    <div className="popup-image__content">
                        <button
                            onClick={onClose}
                            type="button"
                            className="button popup__close"
                            aria-label="Закрытие popup"
                        ></button>
                        <img className="popup-image__img" src={card?.link} alt={card?.name} />
                        <h2 className="popup-image__name">{card?.name}</h2>

                    </div>
                </div>
        </>
    );
}