import { useState, useEffect } from "react";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main";
import Header from "./Header";
import InfoTooltip from './InfoTooltip'
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/Auth';
import ProtectedRoute from './ProtectedRoute'
import { api } from "../utils/Api";
import { Route, Routes, useNavigate} from 'react-router-dom'

export default function App() {
    const navigate = useNavigate()
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [email, setEmail] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

    useEffect(() => {checkAuthorization()});
    useEffect(() => {
        if (loggedIn) {
            navigate("/", { replace: true });
        }
    }, [loggedIn]);
    useEffect(() => {
        if(loggedIn){
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((error) => {
                console.log(error);
            });}
    }, [loggedIn])

    function handleAuth(data) {
        auth
            .authorization(data.email, data.password)
            .then((res) => {
                if(res){
                    localStorage.setItem('Authorized', 'true')
                    setLoggedIn(true);
                    navigate('/');
                }

            })
            .catch((err) => {
                setIsSuccess(false);
                handleIsInfoPopupOpen();
                console.log(err);
            });
    }

    function handleRegisterUser(data) {
        auth
            .registration(data.email, data.password)
            .then(() => {
                navigate('/sign-in');
                setIsSuccess(true);
                handleIsInfoPopupOpen();
            })
            .catch((err) => {
                setIsSuccess(false);
                handleIsInfoPopupOpen();
                console.log(err);
            })
    }

    function checkAuthorization() {
        const token = localStorage.getItem('Authorized')

        if (token) {
            auth.checkToken()
                .then((res) => {
                    navigate('/', { replace: true })
                    setEmail(res.data.email);
                    setLoggedIn(true);
                })
                .catch((err) => console.log(err))
        }
    }

    function signOut() {
        localStorage.removeItem('Authorized')
        setLoggedIn(false)
        setEmail('')
        navigate('/sign-in',)
    }

    function handleCardClick(data) {
        setSelectedCard(data);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    function handleIsInfoPopupOpen() {
        setIsInfoPopupOpen(!isInfoPopupOpen);
    }
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsInfoPopupOpen(false)
        setSelectedCard(null);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

            api.changeLikeCardStatus(card._id, !isLiked)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((prevState) => prevState.filter((c) => c._id !== card._id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleUpdateUser(user) {
        api.editProfile(user)
            .then(() => {
                setCurrentUser({ ...currentUser, name: user.name, about: user.about });
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleUpdateAvatar(avatar) {
        api.changeAvatar(avatar)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleAddPlaceSubmit(card) {
        api.createCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <CurrentUserContext.Provider value={{currentUser} }>
                <Header  signOut={signOut} email={email} />
                <Routes>
                    <Route path="/sign-in"
                           element={<Login handleLogin={handleAuth}></Login>}/>
                    <Route path="/sign-up"
                           element={<Register handleRegister={ handleRegisterUser}></Register>}/>
                    <Route path={'/'}
                           element={
                        <ProtectedRoute
                            loggedIn={loggedIn}
                            component={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                             />
                        }
                    />
                    <Route path={'/'}
                           element={
                               <ProtectedRoute
                                   loggedIn={loggedIn}
                                   component={Footer}
                               />
                           }
                           />
                </Routes>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}  />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit} />

                <PopupWithForm
                    title="Вы уверены?"
                    name="del-confirm"
                    buttonText="Да"
                ></PopupWithForm>

                <EditAvatarPopup
                    onUpdateAvatar={handleUpdateAvatar}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                />
                <InfoTooltip isOpen={isInfoPopupOpen} onClose={closeAllPopups} isSuccess={isSuccess}/>
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </>
    );
}
