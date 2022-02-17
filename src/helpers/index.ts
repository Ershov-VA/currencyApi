import axios from "axios"
import { CURRENCY_TICKETS, SOURCE_API } from "../config";
import { FetchSourceDTO } from "../interfaces";

export const fetchLatest = async ():Promise<FetchSourceDTO> => {
    try {
        const response = await axios.get(SOURCE_API+`&symbols=${CURRENCY_TICKETS.toString()}`)        
        return response.data    
    } catch(error) {
        throw new Error("Can't fetch data");        
    }
}    

export const getCurrentDate = (offset:any = null):string => {
    const date = new Date()    
    if (offset) {
        date.setDate(date.getDate() + offset)
    }
   
    return `${date.getFullYear()}-${valideValue(date.getMonth() + 1)}-${valideValue(date.getDate())}`;
}

export const valideValue = (item:number):string|number => {
    if (item < 10) return `0${item}`
    return item
}

export const isDateValid = (date:string):boolean => {
  
    const date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        if (!(date_regex.test(date))) {
        return false
    }

    if (date > getCurrentDate()) return false
    
    const parts = date.split("-");
    const day = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[0], 10);

    if (year < 2022 || month == 0 || month > 12) return false;
    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

    return day > 0 && day <= monthLength[month - 1];

}