module.exports = {
  apps : [{
    name: "techAlchemy-api",
    script: "./app.js",
    exec_mode: "cluster",
    instances: "8",
    max_memory_restart: "1G",
    log_date_format: "DD-MM HH:mm:ss.SSS",
    log: "",
    env: {
      NODE_ENV: "development",
      TIER: "development"
    },
    env_production: {
      NODE_ENV: "production",
      TIER: "production"
    },
    env_debug: {
      NODE_ENV: "production",
      TIER: "production",
      DEBUG: "*"
    }
  }]
};
