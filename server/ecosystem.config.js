module.exports = {
  apps: [
    {
      name: 'quilnox-server',
      script: 'dist/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      error_file: '/home/ubuntu/logs/quilnox-error.log',
      out_file: '/home/ubuntu/logs/quilnox-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
