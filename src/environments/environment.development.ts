export const environment = {
  production: false,
  apiUrl: "http://localhost/api",
  authSpa: "http://localhost/sanctum/csrf-cookie",
  pusher: {
    broadcaster: 'pusher',
    key: 'app-key',
    wsHost: 'localhost',
    wsPort: '6001',
    wssPort: '6001',
    forceTLS: false,
    enabledTransports: ['ws'],
    cluster: 'mt1',
    authEndpoint: 'http://localhost/broadcasting/auth',
  },
};
