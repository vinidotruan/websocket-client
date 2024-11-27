export const environment = {
  production: false,
  apiUrl: "http://localhost:8000/api",
  pusher: {
    broadcaster: 'pusher',
    key: 'app-key',
    wsHost: '127.0.0.1',
    wsPort: '6001',
    wssPort: '6001',
    forceTLS: false,
    enabledTransports: ['ws'],
    cluster: 'mt1',
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
  },
};
