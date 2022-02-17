// Модуль первоначальной подготовки базы
// создания администраторского пользователя
// и наполнения значениями котировок

import { HISTORY_OFFSET } from "../config";

import {installFuncs} from "./func"

export const install = async () => {
    console.log('Проверка на первоначальный запуск');
    
    const checkUser = await installFuncs.isUserPresent()    
    if ( checkUser) return true

    console.log('Установка пользователя admin - admin');

    const admin = await installFuncs.createAdmin()

    console.log(`Наполнение первоначальными данными за ${HISTORY_OFFSET} дн.`);

    const rates = await installFuncs.getHistoricalRates()

    installFuncs.postRatesToDB(rates)

    console.log('Установка завершена. Удачного использования');
    

    return true
       
}