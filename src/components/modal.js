export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeModalOnOverlayClick);
    document.addEventListener('keydown', closeModalOnEscape);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeModalOnOverlayClick);
    document.removeEventListener('keydown', closeModalOnEscape);
}

export function openCardModal() {
    const cardFormElement = cardPopup.querySelector('.popup__form');
    const saveButton = cardFormElement.querySelector('.popup__button');
    cardNameInput.value = '';
    cardLinkInput.value = '';
    cardNameInput.classList.remove('popup__input_wrong_value');
    cardLinkInput.classList.remove('popup__input_wrong_value');
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add('popup__button_disabled');
    const errorMessages = cardFormElement.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.textContent = '');
    openModal(cardPopup);
  }

export function closeModalOnOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closeModal(event.target);
    }
  }

export function closeModalOnEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}