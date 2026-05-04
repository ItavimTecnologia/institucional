module.exports = {
  apps: [
    {
      name: 'itavim',
      script: 'serve',
      args: '-s .',
      env: {
        PORT: 3002,
      },
    },
  ],
};
