export const BASE_URL = 'https://moviefront.nomoreparties.sbs/api'

const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

export const register = (name, email, password) => {
    return fetch('https://moviefront.nomoreparties.sbs/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, password: password })
    })
        .then(checkResponse)
}

export const login = (email, password) => {
    console.log(email, password)
    return fetch('https://moviefront.nomoreparties.sbs/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
        .then(checkResponse)
};

export const getUser = (token) => {
    return fetch('https://moviefront.nomoreparties.sbs/api/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(checkResponse)
};

export const getMovie = (token) => {
    return fetch('https://moviefront.nomoreparties.sbs/api/movies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(checkResponse)
};

export const saveMovie = (data, token) => {
    return fetch('https://moviefront.nomoreparties.sbs/api/movies', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(checkResponse)
};

export const deleteMovie = (id, token) => {
    return fetch(`https://moviefront.nomoreparties.sbs/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(checkResponse)
};

export const updateUser = (data, token) => {
    return fetch('https://moviefront.nomoreparties.sbs/api/users/me', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
        }),
    })
        .then(checkResponse)
}
