import React, { useRef, useEffect }from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const link = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: link.current.value,
        });
    }
    useEffect(() => {
        if (!isOpen) {
            link.current.value = "";
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            title="Обновить аватар"
            name="avatar"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
            onClose={onClose}
        >
            <input
                ref={link}
                className="popup__input popup__input_type_avatar"
                id="avatar-input"
                name="avatar"
                type="url"
                placeholder="Ссылка на картинку"
                autoComplete="off"
                onChange={(e) => (link.current.value = e.target.value)}
                required
            />
            <span className="popup__input-error avatar-input-error"></span>
        </PopupWithForm>
    );
}