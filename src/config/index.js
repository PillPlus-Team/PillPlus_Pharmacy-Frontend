if (process.env.NODE_ENV === 'production') {
    module.exports = {
        API_URL: 'https://api.pillplus-store.store/api/v1',
        SOCKET_URL: 'https://api.pillplus-store.store',
    };
} else {
    module.exports = {
        API_URL: 'http://localhost:5000/api/v1',
        SOCKET_URL: 'http://localhost:4000',
    };
}
