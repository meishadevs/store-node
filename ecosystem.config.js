module.exports = {
  apps: [{
    name: 'store-node',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    output: 'logs/out.log',
    error: 'logs/error.log',
    log: 'logs/combined.outerr.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: 8001
    }
  }],
  deploy: {
    production: {
      user: 'root',
      host: ['139.224.234.213'],
      port: '22',
      ref: 'origin/master',
      repo: 'git@github.com:meishadevs/store-node.git',
      path: '/root/mygit/store-node',
      'ssh_options': 'StrictHostKeyChecking=no',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
