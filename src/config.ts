// Общие настройки
export const PORT:string = '3001' // Порт сервера

// API
export const SOURCE_API_KEY:string = '332ab638b9074eefbbee03865a373b2e' //  API-ключ, получается у поставщика данных
export const SOURCE_API:string = `https://api.currencyfreaks.com/latest?apikey=${SOURCE_API_KEY}`
export const CURRENCY_TICKETS = ['RUB', 'EUR', 'USD', 'JPY']  // Тикеры, по которым ведется сбор данных


// Настройка первоначального запуска
export const HISTORY_OFFSET = 7  // Количество дней, за которые подгрузятся данные при первоначальном запуске