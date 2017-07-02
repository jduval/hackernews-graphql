'use strict';

const he = require('he');

exports.getURLTitle = (url) =>
  new Promise((resolve) => {
    const httpModule = /^https/i.test(url) ? require('https') : require('http');

    const regEx = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;

    httpModule.get(url, response => {
      response.on('data', (chunk) => {
        const str = chunk.toString();
        const match = regEx.exec(str);
        if (match && match[2]) {
          response.pause();
          resolve(he.decode(match[2]));
        }
      });
    });
  });
