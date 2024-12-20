export const environment = {
  production: false,
  apiUrl: "https://mss.vinidotruan.live/api",
  authSpa: "https://mss.vinidotruan.live/sanctum/csrf-cookie",
  pusher: {
    broadcaster: 'pusher',
    key: 'app-key',
    wsHost: 'vinidotruan.live',
    wsPort: '6001',
    wssPort: '6002',
    forceTLS: false,
    enabledTransports: ['ws'],
    cluster: 'mt1',
    authEndpoint: 'https://mss.vinidotruan.live/broadcasting/auth',
  },
};
