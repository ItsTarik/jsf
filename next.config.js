/* eslint-disable no-console */
const nextTranslate = require('next-translate');

const isTest = process.env.NODE_ENV === 'test';
const isProd = process.env.NODE_ENV === 'production';
const [white, red, yellow] = ['\x1b[37m', '\x1b[31m', '\x1b[33m'];

function checkConfig(key) {
  const NOT_SET = ['', 'null', 'undefined', 'false'];
  const value = process.env[key];

  if (!value || NOT_SET.includes(value)) {
    console.warn(`${isProd ? yellow : red}${key}${white} is not set`);
    if (!isProd) {
      process.exit(2);
    }
  }
}

if (!isTest) {
  console.log('> checking env variables ...');
}

['NEXT_PUBLIC_FIRST_ENV_VAR'].forEach(checkConfig);

module.exports = {
  publicRuntimeConfig: {
    NEXT_PUBLIC_FIRST_ENV_VAR: process.env.NEXT_PUBLIC_FIRST_ENV_VAR,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*', // Proxy to Backend
      },
    ];
  },
  ...nextTranslate(),
};
