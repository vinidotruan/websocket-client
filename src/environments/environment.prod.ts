export const environment = {
  production: false,
  apiUrl: "http://rpgdoscria.online/api",
  authSpa: "http://rpgdoscria.online/sanctum/csrf-cookie",
  pusher: {
    broadcaster: 'pusher',
    key: 'app-key',
    wsHost: 'rpgdoscria.online',
    wsPort: '6001',
    wssPort: '6001',
    forceTLS: false,
    enabledTransports: ['ws'],
    cluster: 'mt1',
    authEndpoint: 'http://rpgdoscria.online/broadcasting/auth',
  },
};
