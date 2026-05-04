module.exports = {
  apps: [
    {
      name: 'itavim',
      script: 'serve',
      args: '-s . -l 3000',
      env: {
        PM2_SERVE_PATH: '.',
        PM2_SERVE_PORT: 3000,
      },
    },
  ],
};
