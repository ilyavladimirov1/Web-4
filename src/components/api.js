const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: '4d0240ed-c777-4871-b34f-6c2246990198',
        'Content-Type': 'application/json'
    }
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
      })
      .then(res => res.json())
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
      })
      .then(res => res.json());
}

export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        'name': name,
        'about': about
      })
    })
}


export function newCard(cardData) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        'name': cardData.name,
        'link': cardData.link
      })
    })
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
  })
  .then(res => {
      if (!res.ok) {
          return res.json().then(err => Promise.reject(err));
      }
      return res.json();
  });
}


export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => res.json());
}

export function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => res.json());
}

export function updateAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: avatarLink
      })
  })
  .then(res => {
      if (!res.ok) {
          return res.json().then(err => Promise.reject(err));
      }
      return res.json();
  });
}
