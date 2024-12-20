export const environment = {
  production: false,
  apiUrl: "http://localhost:8000/api",
  authSpa: "http://localhost:8000/sanctum/csrf-cookie",
  pusher: {
    broadcaster: 'pusher',
    key: 'app-key',
    wsHost: 'vinidotruan.live',
    wsPort: '6001',
    wssPort: '6001',
    forceTLS: false,
    enabledTransports: ['ws'],
    cluster: 'mt1',
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
  },
};
