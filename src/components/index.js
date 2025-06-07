import '../pages/index.css';
import { openModal, closeModal, openCardModal, closeModalOnOverlayClick } from './modal.js';
import { validateProfileForm, validateCardForm, validateAvatarForm } from './validate.js';
import { getUserInfo, getCards, editProfile, newCard, deleteCard, likeCard, unlikeCard, updateAvatar } from './api.js';

const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const closeButton = document.querySelector('.popup__close');
const cardFormElement = cardPopup.querySelector('.popup__form');
const profileButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarFormElement = avatarPopup.querySelector('.popup__form');
const avatarLinkInput = avatarFormElement.querySelector('.popup__input_type_avatar-link');
const avatarCloseButton = avatarPopup.querySelector('.popup__close');
const profileImageContainer = document.querySelector('.profile__image-container');
const profileImage = document.querySelector('.profile__image');

let currentUserId;

getUserInfo()
   .then(userInfo => {
        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
        currentUserId = userInfo._id;
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });

function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDescription = cardElement.querySelector('.card__description');
    const cardTitle = cardDescription.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardDescription.querySelector('.card__like-button');
    const likesCounter = cardDescription.querySelector('.card__likes-counter');
    const imagePopup = document.querySelector('.popup_type_image');
    const imageElement = imagePopup.querySelector('.popup__image');
    const imageCaption = imagePopup.querySelector('.popup__caption');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    
    const likesCount = cardData.likes ? cardData.likes.length : 0;
    likesCounter.textContent = likesCount;

    if (cardData.owner && cardData.owner._id !== currentUserId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => handleDeleteCard(cardData._id, cardElement));
    }

    cardImage.addEventListener('click', function () {
        imageElement.src = cardImage.src;
        imageElement.alt = cardImage.alt;
        imageCaption.textContent = cardTitle.textContent;
        openModal(imagePopup);
    });

    const isLiked = cardData.likes.some(like => like._id === currentUserId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', function () {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            unlikeCard(cardData._id)
                .then(updatedCard => {
                    likeButton.classList.remove('card__like-button_is-active');
                    likesCounter.textContent = updatedCard.likes.length;
                })
                .catch(error => console.error('Error unliking card:', error));
        } else {
            likeCard(cardData._id)
                .then(updatedCard => {
                    likeButton.classList.add('card__like-button_is-active');
                    likesCounter.textContent = updatedCard.likes.length;
                })
                .catch(error => console.error('Error liking card:', error));
        }
    });
    return cardElement;
}
    
function handleDeleteCard(cardId, cardElement) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(error => {
            console.error('Error deleting card:', error);
        });
}



function renderCards(cards) {
    cards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        placesList.appendChild(cardElement);
    });
}

getCards()
    .then(cards => {
        renderCards(cards);
    })
    .catch(error => {
        console.error('Error fetching cards:', error);
    });


function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const submitButton = profileFormElement.querySelector('.popup__button');
    toggleButtonText(submitButton, true);

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    editProfile(nameValue, jobValue)
        .then(() => {
            closeModal(profilePopup);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        })
        .finally(() => {
            toggleButtonText(submitButton, false);
        });
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const submitButton = cardFormElement.querySelector('.popup__button');
    toggleButtonText(submitButton, true);

    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    newCard(cardData)
        .then(response => response.json())
        .then(newCardData => {
            const newCardElement = createCard(newCardData);
            const placesList = document.querySelector('.places__list');
            placesList.prepend(newCardElement);
            closeModal(cardPopup);
        })
        .catch(error => {
            console.error('Error creating new card:', error);
        })
        .finally(() => {
            toggleButtonText(submitButton, false);
        });
}
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

imageCloseButton.addEventListener('click', function () {
    closeModal(imagePopup);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

editButton.addEventListener('click', () => openModal(profilePopup));
closeButton.addEventListener('click', () => closeModal(profilePopup));
profileButton.addEventListener('click', () => openModal(cardPopup));
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
profileButton.addEventListener('click', () => openCardModal);

nameInput.addEventListener('input', validateProfileForm);
jobInput.addEventListener('input', validateProfileForm);


editButton.addEventListener('click', () => {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    validateProfileForm(); 
    openModal(profilePopup);
});


cardNameInput.addEventListener('input', validateCardForm);
cardLinkInput.addEventListener('input', validateCardForm);

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', closeModalOnOverlayClick);
});

profileImageContainer.addEventListener('click', () => openModal(avatarPopup));
avatarCloseButton.addEventListener('click', () => closeModal(avatarPopup));

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);
avatarLinkInput.addEventListener('input', validateAvatarForm);

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const submitButton = avatarFormElement.querySelector('.popup__button');
    toggleButtonText(submitButton, true);

    const avatarLink = avatarLinkInput.value;
    
    updateAvatar(avatarLink)
        .then(userData => {
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
        })
        .catch(error => {
            console.error('Error updating avatar:', error);
        })
        .finally(() => {
            toggleButtonText(submitButton, false);
        });
}

function toggleButtonText(button, isLoading) {
    if (isLoading) {
      button.textContent = 'Сохранение...';
      button.disabled = true;
    } else {
      button.textContent = 'Сохранить';
      button.disabled = false;
    }
  }
  