import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Card from "./Card";

export default function Main({
                                 onEditProfile,
                                 onEditAvatar,
                                 onCardClick,
                                 onAddPlace,
                                 cards,
                                 onCardLike,
                                 onCardDelete,
                             }) {


    const { currentUser } = useContext(CurrentUserContext);
    let avatarBackground = {backgroundImage: "url(" + currentUser.avatar + ")"}
    return (
        <main className="main">
            <section className="profile">
                <div className="user-info">
                    <div
                        style={avatarBackground}
                        className="user-info__photo"
                        onClick={onEditAvatar}
                    >
                        <button className="user-info__photo-button"></button>
                    </div>
                    <div className="user-info__data">
                        <h1 className="user-info__name">{currentUser.name}</h1>
                        <button
                            type="button"
                            className="button user-info__edit"
                            onClick={onEditProfile}
                        ></button>
                        <p className="user-info__job">{currentUser.about}</p>
                    </div>
                    <button
                        type="button"
                        className="button user-info__button"
                        onClick={onAddPlace}
                    ></button>
                </div>
            </section>
            <section className="places-list" aria-label="Карточки">
                    {cards.map((obj) => (
                        <Card
                            key={obj._id}
                            obj={obj}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
            </section>
        </main>
    );
}