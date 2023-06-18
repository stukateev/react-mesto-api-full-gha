class Api {
    constructor({ baseUrl}) {
        this._url = baseUrl;
        this._headers = { 'Content-Type': 'application/json; charset=UTF-8' };
        this._credentials = 'include';
    }

    _getRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            credentials: this._credentials,
            headers: this._headers,
        })
            .then(res => this._getRes(res));
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            credentials: this._credentials,
            headers: this._headers,
        })
            .then(res => this._getRes(res));
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            credentials: this._credentials,
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),

        }).then(res => this._getRes(res));
    }

    createCard(item) {
        return fetch(`${this._url}/cards`, {
            credentials: this._credentials,
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(item)
        })
            .then(res => this._getRes(res));
    }
    changeLikeCardStatus(cardId, isLiked) {
     if(isLiked){
         return fetch(`${this._url}/cards/${cardId}/likes`, {
             credentials: this._credentials,
             method: "PUT",
             headers: this._headers,
         }).then(res => this._getRes(res));
     } else {
         return fetch(`${this._url}/cards/${cardId}/likes`, {
             credentials: this._credentials,
             method: "DELETE",
             headers: this._headers,
         }).then(res => this._getRes(res));
     }
    };
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            credentials: this._credentials,
            headers: this._headers,
            method: 'DELETE'
        })
            .then(res => this._getRes(res));
    }
    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            credentials: this._credentials,
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(res => this._getRes(res));
    }
}

export  const api = new Api({
    baseUrl: 'https://api.idler.studio.nomoredomains.rocks',
});
