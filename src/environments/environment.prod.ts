export const environment = {
  production: false,
  apiUrl: "https://rpgdoscria.online/api",
  authSpa: "https://rpgdoscria.online/sanctum/csrf-cookie",
  pusher: {
    broadcaster: 'pusher',
    key: 'app-key',
    wsHost: 'rpgdoscria.online',
    wsPort: '6001',
    wssPort: '6001',
    forceTLS: false,
    enabledTransports: ['ws'],
    cluster: 'mt1',
    authEndpoint: 'https://rpgdoscria.online/broadcasting/auth',
  },
};
