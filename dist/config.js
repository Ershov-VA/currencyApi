"use strict";
exports.__esModule = true;
exports.HISTORY_OFFSET = exports.CURRENCY_TICKETS = exports.SOURCE_API = exports.SOURCE_API_KEY = exports.PORT = void 0;
// Общие настройки
exports.PORT = '3001'; // Порт сервера
// API
exports.SOURCE_API_KEY = '332ab638b9074eefbbee03865a373b2e'; //  API-ключ, получается у поставщика данных
exports.SOURCE_API = "https://api.currencyfreaks.com/latest?apikey=".concat(exports.SOURCE_API_KEY);
exports.CURRENCY_TICKETS = ['RUB', 'EUR', 'USD', 'JPY']; // Тикеры, по которым ведется сбор данных
// Настройка первоначального запуска
exports.HISTORY_OFFSET = 7; // Количество дней, за которые подгрузятся данные при первоначальном запуске
