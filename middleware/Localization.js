// localization.js
const path = require("path");
const { I18n } = require('i18n');

const i18n = new I18n({
    locales: ['en', 'hi', 'san'],
    directory: path.join(__dirname, '../translation'),
    defaultLocale: 'hi',
    objectNotation: true
});

module.exports = {i18n};
