export const environment = {
  production: false,
  apiUrl: "https://rpgdoscria.online/api",
  authSpa: "https://rpgdoscria.online/sanctum/csrf-cookie",
  pusher: {
    broadcaster: 'pusher',
    key: 'rpgdoscriachave',
    wsHost: 'rpgdoscria.online',
    wsPort: '6001',
    wssPort: '',
    forceTLS: true,
    enabledTransports: ['wss'],
    cluster: 'mt1',
    authEndpoint: 'https://rpgdoscria.online/broadcasting/auth',
  },
};
