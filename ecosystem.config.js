module.exports = {
  apps: [
    {
      name: "seka-portfolio-api",
      cwd: "./server",
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "512M",
      env: { NODE_ENV: "production", PORT: 5000 },
    },
  ],
};
