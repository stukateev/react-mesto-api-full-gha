export const buttonUserInfo = document.querySelector(".user-info__edit");
export const popupUserInfo = document.querySelector(".popup-edit-profile");
export const namePage = document.querySelector(".user-info__name")
export const jobPage = document.querySelector(".user-info__job")
export const avatarPage = document.querySelector(".user-info__photo")
export const profileForm = document.forms["profile-form"];
export const avatarForm = document.forms["avatar-form"];
export const avatarInput = avatarForm.elements["avatar-input"];
export const nameInput = profileForm.elements["nameX"]
export const jobInput = profileForm.elements["info"]
export const placesList = document.querySelector('.places-list');
export const buttonAddCard = document.querySelector(".user-info__button");
export const addCardForm = document.forms["add-card-form"];
export const cardTemplate = document.querySelector('#place-card-template');
export const buttonChangePhoto = document.querySelector(".user-info__photo-button");




export const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}