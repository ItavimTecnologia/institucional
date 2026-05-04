module.exports = {
  apps: [
    {
      name: 'itavim',
      script: 'serve',
      args: '-s . -l 3002',
      env: {
        PM2_SERVE_PATH: '.',
        PM2_SERVE_PORT: 3002,
      },
    },
  ],
};
