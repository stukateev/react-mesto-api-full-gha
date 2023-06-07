import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {currentUser} = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            buttonText="Сохранить"
            title="Редактировать профиль"
            name="edit-profile"
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_name"
                name="nameX"
                type="text"
                placeholder="Имя"
                autoComplete="off"
                id="name-input"
                minLength="2"
                maxLength="40"
                value={name || ""}
                onChange={(event) => setName(event.target.value)}
                required
            />
            <span className="name-input-error popup__input-error"></span>
            <input
                className="popup__input popup__input_type_info"
                name="info"
                type="text"
                placeholder="О себе"
                autoComplete="off"
                id="info-input"
                minLength="2"
                maxLength="200"
                value={description || ""}
                onChange={(event) => setDescription(event.target.value)}
                required
            />
            <span className="info-input-error popup__input-error"></span>
        </PopupWithForm>
    );
}