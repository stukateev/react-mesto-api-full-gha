import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card({ obj, onCardClick, onCardLike, onCardDelete }) {
    const { currentUser } = useContext(CurrentUserContext);
    const isOwn = obj.owner._id === currentUser._id;
    const isLiked = obj.likes.some(i =>  i._id === currentUser._id);
    const cardLikesBtnClassname = `place-card__like-icon ${
        isLiked && "place-card__like-icon_activated"} `;
    function handleLikeClick() {
        onCardLike(obj);
    }
    function handleDeleteClick() {
        onCardDelete(obj)
    }

    return (
                <div className="place-card">
                    <img
                        className="place-card__image"
                        alt={obj.name}
                        src={obj.link}
                        onClick={() => onCardClick(obj)}
                    />
                    {isOwn && (
                        <button type="button" className="button place-card__delete-icon"
                                onClick={handleDeleteClick}></button>
                    )}
                    <div className="place-card__description">
                        <p className="place-card__name">{obj.name}</p>
                        <div className="place-card__like-box">
                            <button
                                type="button"
                                className={cardLikesBtnClassname}
                                aria-label="Like"
                                onClick={handleLikeClick}
                            ></button>
                            <p className="place-card__like-counter">{obj.likes.length}</p>
                        </div>
                    </div>
                </div>
    );
}