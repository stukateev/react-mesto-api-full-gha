import React,  { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }
    useEffect(() => {
        if (!isOpen) {
            setName("");
            setLink("");
        }
    }, [isOpen]);
    return (
        <PopupWithForm
            isOpen={isOpen}
            title="Новое место"
            name="add-card"
            buttonText="Создать"
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_name"
                id="title-input"
                name="name"
                type="text"
                placeholder="Название"
                autoComplete="off"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <span className="title-input-error popup__input-error"></span>
            <input
                className="popup__input popup__input_type_url"
                id="link-input"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                autoComplete="off"
                required
            />
            <span className="link-input-error popup__input-error"></span>
        </PopupWithForm>
    );
}