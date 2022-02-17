import * as bcrypt from 'bcrypt'
import { getCurrentDate } from '../helpers'
import axios from 'axios'

import { FetchSourceDTO, UserType } from "../interfaces"
import { RateModel, UserModel } from "../model"
import { CURRENCY_TICKETS, HISTORY_OFFSET, SOURCE_API } from '../config'

type TickerRate = {
    ticker: string,
    cost: number
}

type DateRates = {
    base: string,
    date: string,
    rates: TickerRate[] 
}

const isUserPresent = async () =>  {

    const testUser:UserType = {username: 'admin'}

    const userInDb = await UserModel.findOne({username: testUser.username})

    if (userInDb) return userInDb
    return false
    
}

const createAdmin = async () => {
    const adminUser:UserType = { username: 'admin', password: bcrypt.hashSync('admin', 7), roles: [ 'viewer' ] }
    const item = new UserModel(adminUser)
    return await item.save()    
}

const getHistoricalRates = async () => {

     const generateValue = ():number => {
        return 70 + (Math.random() * 12)
    }

    let historyRates = []

    for (let count = 0; count <= HISTORY_OFFSET; count ++) {
        let dateRate:DateRates = {base:'USD', date:  getCurrentDate( 0 - count), rates: []}
        for (let ticker of CURRENCY_TICKETS) {
            let cost = 1;
            if (ticker !== 'USD') {
                cost = generateValue()
            }
            dateRate.rates.push({ticker, cost})             
        }
        historyRates.push(dateRate)
    }
    return historyRates    
}

const postRatesToDB = async (rates:DateRates[]) => {
    await RateModel.insertMany(rates)
}

export const installFuncs = {
    isUserPresent, createAdmin, postRatesToDB, getHistoricalRates
}