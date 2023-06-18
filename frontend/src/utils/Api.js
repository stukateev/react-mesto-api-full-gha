class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    _getRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }


    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this._getRes);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._getRes);
    }

    editProfile(data) {

        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),

        }).then(this._getRes)
    }

    createCard(item) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(item)
        })
            .then(this._getRes);
    }
    changeLikeCardStatus(cardId, isLiked) {
     if(isLiked){
         return fetch(`${this._url}/cards/${cardId}/likes`, {
             method: "PUT",
             headers: this._headers,
         }).then(this._getRes);
     } else {
         return fetch(`${this._url}/cards/${cardId}/likes`, {
             method: "DELETE",
             headers: this._headers,
         }).then(this._getRes);
     }
    };
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(this._getRes);
    }
    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(this._getRes);
    }
}

export  const api = new Api({
    baseUrl: 'https://api.idler.studio.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials : 'include',
});
