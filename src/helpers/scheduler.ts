import { getCurrentDate } from ".";
import { RateController } from "../controllers";

const schedule = require('node-schedule')

export const job = schedule.scheduleJob({hour: 12, minute:'00'}, function():void{
    RateController().createLatestCurrency(getCurrentDate())
    console.log('Получены новые котировки');    
});