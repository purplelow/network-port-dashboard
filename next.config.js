const { config } = require('dotenv');

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    // Mqtt WS Subscribe
    MQTT_TOPIC: process.env.MQTT_TOPIC,
    MQTT_TOPIC_CPU: process.env.MQTT_TOPIC_CPU,
    MQTT_TOPIC_MEMORY: process.env.MQTT_TOPIC_MEMORY,
    MQTT_TOPIC_NETWORK: process.env.MQTT_TOPIC_NETWORK,
    MQTT_TOPIC_UPPORT: process.env.MQTT_TOPIC_UPPORT,
    MQTT_PUBLISH_TOPIC_UPPORT: process.env.MQTT_PUBLISH_TOPIC_UPPORT,
  },
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };
  //   return config;
  // },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.node = {
  //       fs: 'empty'
  //     }
  //   }
  //   return config;
  // }
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
