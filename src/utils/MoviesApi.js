
const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
}

export const getMovies = () => {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(res => checkResponse(res));
}
