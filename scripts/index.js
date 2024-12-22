// Модалки
const allPopups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Профиль
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

const profileInfoName = document.querySelector('.profile__title');
const profileInfoAbout = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');

const profilePopupForm = profilePopup.querySelector('.popup__form')

// Добавление карточки
const cardTemplate = document.querySelector('#card-template').content;

const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputUrl = document.querySelector('.popup__input_type_url');

const cardAddButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.places__list');

const cardPopupForm = cardPopup.querySelector('.popup__form')

// Просмотр карточки
const imagePopupImage = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');


// Функции для карточек
function cardLikeAction(event) {
    const likeButton = event.target.closest(".card__like-button")
    likeButton.classList.toggle("card__like-button_is-active")
}

function deleteCard(event) {
    const cardToDelete = event.target.closest(".card")
    cardToDelete.remove()
}


// Основная функция для создания карточек
function createCard(title, url) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardsImg = newCard.querySelector('.card__image');
    const cardsTitle = newCard.querySelector('.card__title')
    const cardsBtnRemove = newCard.querySelector('.card__delete-button');
    const cardsLike = newCard.querySelector('.card__like-button');

    cardsImg.src = url;
    cardsImg.alt = title;
    cardsTitle.textContent = title;

    // Обработчик нажатия кнопки лайка
    cardsLike.addEventListener('click', (evt) => {cardLikeAction(evt)})

    // Обработчик удаления карточки
    cardsBtnRemove.addEventListener('click', (evt) => {deleteCard(evt)})

    // Открытие карточки
    cardsImg.addEventListener('click', () => {openImageModal(title, url)});

    return newCard;
}


// Функции открытия/закрытия модалок
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}


// Функции для модалки профиля
function openProfileForm() {
    inputName.value = profileInfoName.textContent;
    inputDescription.value = profileInfoAbout.textContent;
    openModal(profilePopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileInfoName.textContent = inputName.value;
    profileInfoAbout.textContent = inputDescription.value;
    closeModal(profilePopup);
}


// Функции для модалки добавления карточки
function openCardForm() {
    inputCardName.value = "";
    inputUrl.value = "";
    openModal(cardPopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const createdCard = createCard(inputCardName.value, inputUrl.value)
    cardsContainer.prepend(createdCard)
    closeModal(cardPopup);
}


// Функции для модалки просмотра карточки
function openImageModal(title, url) {
    imagePopupImage.src = url;
    imagePopupImage.alt = title;
    imagePopupCaption.textContent = title;
    openModal(imagePopup);
}


// Рендерит все карточки из cards.js
function renderExistingCards() {
    initialCards.forEach(card => {
        let newCard = createCard(card.name, card.link)
        cardsContainer.append(newCard)
    })
}


// Открытие и сохранение профиля
profileEditButton.addEventListener('click', openProfileForm)
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

// Открытие и добавление карточки
cardAddButton.addEventListener('click', openCardForm);
cardPopupForm.addEventListener('submit', handleCardFormSubmit);


// Закрытие модалки
allPopups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));
});

// Добавляем анимацию открытия/закрытия
allPopups.forEach(popup => popup.classList.add('popup_is-animated'));

renderExistingCards();