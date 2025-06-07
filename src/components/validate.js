export function validateProfileForm() {
  const profilePopup = document.querySelector('.popup_type_edit');
  const profileFormElement = profilePopup.querySelector('.popup__form');
  const saveButton = profileFormElement.querySelector('.popup__button'); 
  const nameInput = profileFormElement.querySelector('.popup__input_type_name');
  const jobInput = profileFormElement.querySelector('.popup__input_type_description');
  const nameErrorMessage = nameInput.nextElementSibling;
  const jobErrorMessage = jobInput.nextElementSibling;

  if (nameInput.validity.valueMissing) {
      nameErrorMessage.textContent = 'Поле "Имя" должно быть заполнено.';
  } else if (nameInput.validity.tooShort) {
      nameErrorMessage.textContent = 'Имя должно быть не менее 2 символов.';
  } else if (nameInput.validity.tooLong) {
      nameErrorMessage.textContent = 'Имя должно быть не более 50 символов.';
  } else {
      nameErrorMessage.textContent = '';
  }

  if (jobInput.validity.valueMissing) {
      jobErrorMessage.textContent = 'Поле "Занятие" должно быть заполнено.';
  } else if (jobInput.validity.tooShort) {
      jobErrorMessage.textContent = 'Занятие должно быть не менее 2 символов.';
  } else if (jobInput.validity.tooLong) {
      jobErrorMessage.textContent = 'Занятие должно быть не более 200 символов.';
  } else {
      jobErrorMessage.textContent = '';
  }

  const isNameValid = nameInput.validity.valid;
  const isJobValid = jobInput.validity.valid;

  if (isNameValid && isJobValid) {
      saveButton.removeAttribute('disabled');
      saveButton.classList.remove('popup__button_disabled');
      nameInput.classList.remove('popup__input_wrong_value');
      jobInput.classList.remove('popup__input_wrong_value');
  } else if (isNameValid) {
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add('popup__button_disabled');
      nameInput.classList.remove('popup__input_wrong_value');
      jobInput.classList.add('popup__input_wrong_value');
  } else if (isJobValid) {
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add('popup__button_disabled');
      nameInput.classList.add('popup__input_wrong_value');
      jobInput.classList.remove('popup__input_wrong_value');
  } else {
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add('popup__button_disabled');
      nameInput.classList.add('popup__input_wrong_value');
      jobInput.classList.add('popup__input_wrong_value');
  }
}

export function validateCardForm() {
  const cardPopup = document.querySelector('.popup_type_new-card');
  const cardFormElement = cardPopup.querySelector('.popup__form');
  const saveButton = cardFormElement.querySelector('.popup__button');
  const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
  const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');
  const nameErrorMessage = cardNameInput.nextElementSibling;
  const linkErrorMessage = cardLinkInput.nextElementSibling;

  const isNameValid = cardNameInput.validity.valid;
  const isLinkValid = cardLinkInput.validity.valid;

  if (cardNameInput.validity.valueMissing) {
    nameErrorMessage.textContent = 'Поле "Название" должно быть заполнено.';
  } else if (cardNameInput.validity.tooShort) {
    nameErrorMessage.textContent = 'Название должно быть не менее 2 символов.';
  } else if (cardNameInput.validity.tooLong) {
    nameErrorMessage.textContent = 'Название должно быть не более 30 символов.';
  } else {
    nameErrorMessage.textContent = '';
  }

  if (cardLinkInput.validity.valueMissing) {
    linkErrorMessage.textContent = 'Поле "Ссылка на картинку" должно быть заполнено.';
  } else if (cardLinkInput.validity.typeMismatch) {
    linkErrorMessage.textContent = 'Введите корректный URL.';
  } else {
    linkErrorMessage.textContent = '';
  }

  if (isNameValid && isLinkValid) {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove('popup__button_disabled');
  } else {
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add('popup__button_disabled');
  }

  cardNameInput.classList.toggle('popup__input_wrong_value', !isNameValid);
  cardLinkInput.classList.toggle('popup__input_wrong_value', !isLinkValid);
}

export function validateAvatarForm() {
  const avatarPopup = document.querySelector('.popup_type_avatar');
  const avatarFormElement = avatarPopup.querySelector('.popup__form');
  const avatarLinkInput = avatarFormElement.querySelector('.popup__input_type_avatar-link');
  const submitButton = avatarFormElement.querySelector('.popup__button');
  const linkErrorMessage = avatarLinkInput.nextElementSibling;
  const isValid = avatarLinkInput.validity.valid;

  if (isValid) {
    linkErrorMessage.textContent = ''
    submitButton.classList.remove('popup__button_disabled');
    submitButton.disabled = false;
  } else {
    if (avatarLinkInput.validity.valueMissing) {
      linkErrorMessage.textContent = 'Поле "Ссылка на картинку" должно быть заполнено.';
    } else if (avatarLinkInput.validity.typeMismatch) {
      linkErrorMessage.textContent = 'Введите корректный URL.';
    } else {
      linkErrorMessage.textContent = '';
    }
    submitButton.classList.add('popup__button_disabled');
    submitButton.disabled = true;
  }
}
