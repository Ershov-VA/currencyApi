import { Request, Response } from "express";
import { CURRENCY_TICKETS } from "../config";
import { HTTP } from "../interfaces/enum/http";
import { RateDTO } from "../interfaces";
import { fetchLatest, getCurrentDate, isDateValid } from "../helpers";

import RateModel from "../model/Rate.model";
import { LogController } from ".";
import { TYPES } from "../interfaces/enum/http";



const RateController = () => ({
    async getRateByPair( req:Request, res: Response ) {
        try {
            const { pairOne, pairTwo } = req.params
            if ( ! CURRENCY_TICKETS.includes(pairOne.toUpperCase()) || ! CURRENCY_TICKETS.includes(pairTwo.toUpperCase()) ) return res.status(HTTP.BAD_REQUEST).send({status: 'Неправильно указаны пары валют. Возможные варианты '+CURRENCY_TICKETS})
            const rateToday = await this.getTodayRateLoc()

            const ratePairOne:RateDTO[] = rateToday.rates.filter( (item:RateDTO) => item.ticker === pairOne.toUpperCase() )
            const ratePairTwo:RateDTO[] = rateToday.rates.filter( (item:RateDTO) => item.ticker === pairTwo.toUpperCase() )
            
            const rate = ratePairTwo[0].cost / ratePairOne[0].cost

            LogController().logging(req.connection,  TYPES.GET)
            
            return res.status(HTTP.SUCCESS).send({ rate })

        } catch(error) {
            return res.status(HTTP.SERVER_ERROR).send(error)
        }
    },
    async getRateByDate(req: Request, res: Response) {
        try {
            const {date} = req.params
            if (!isDateValid(date)) return res.status(HTTP.BAD_REQUEST).send({status:"Date is wrong"})
            const ratesByDate = await RateModel.findOne({date})
            LogController().logging(req.connection,  TYPES.GET)
            if (ratesByDate) return  res.status(HTTP.SUCCESS).json(ratesByDate)
            return res.status(HTTP.SUCCESS).json({status:"not found"})
        } catch(error) {
            res.status(HTTP.SERVER_ERROR).send(error)
        }
    },
    async getRatePerRange(req: Request, res: Response) {
        try {
            const {range} = req.params
            let rangeData = []
            let date = new Date()
            if (range.toLowerCase() === 'week') {
                date.setDate(date.getDate() - 7)
                rangeData = await RateModel.find({ created_on: {    
                    $gte: new Date(date.getFullYear(), date.getMonth()+1, date.getDate()),
                    $lt: new Date()
                }}) 
            }
            if (range.toLocaleLowerCase() === 'month') {
                date.setDate(date.getDate() - 31)
                rangeData = await RateModel.find({ created_on: {    
                    $gte: new Date(date.getFullYear(), date.getMonth()+1, date.getDate()),
                    $lt: new Date()
                }}) 
            }
            LogController().logging(req.connection, TYPES.GET)

            if (rangeData.length > 0) return  res.status(HTTP.SUCCESS).json(rangeData)
            return res.status(HTTP.SUCCESS).json({status:"not found"})

        } catch(error) {
            res.status(HTTP.SERVER_ERROR).send(error)
        }
    },
    async getTodayRateLoc() {  // Если сегодня нет котировок, то получает их и записывает в базу
        try {
            const currentDate = getCurrentDate();
            const currentCurrency = await RateModel.findOne({date: currentDate})
            if (!currentCurrency) {  
                const newItem = this.createLatestCurrency(currentDate)
                return newItem
            }
            return currentCurrency
        } catch(error) {
            console.log(error)            
            return []
        }
    },
    async getTodayRate(req:Request, res:Response) {    // 
        try {
            const currentCurrency = await this.getTodayRateLoc()
            LogController().logging(req.connection, TYPES.GET)
            return res.status(HTTP.SUCCESS).send(currentCurrency)
        } catch(error) {
            if (res) return res.status(HTTP.SERVER_ERROR).send(error)
            return []
        }
    },
    async createLatestCurrency(currentDate:string) {  // Получаю текущие котировки в момент выполнения. Данная функция работает в назначенном задании
        // Проверяю, были ли сегодня котировки. Если да, то заменяю их. Если нет, то создаю
        try {
            const fetchData = await fetchLatest();    // Запрос на API поставщика и получение данных
            let rates:RateDTO[] = []
            Object.keys(fetchData.rates).forEach( key => {
                const cost = fetchData.rates as any
                rates.push({ticker: key, cost:cost[key] })
            })
            const item = RateModel.findOneAndReplace({ date: {$eq: currentDate}}, {date: currentDate, rates}, {upsert: true})                        
            return item
        } catch(error) {
            console.log(error);            
            return []
        }
    },
    async get (req:Request, res:Response) {
        try {
            LogController().logging(req.connection, TYPES.GET)
            const item = await RateModel.find()
            return res.status(HTTP.SUCCESS).json(item)
        } catch(error) {
            return res.status(HTTP.BAD_REQUEST).send(error)
        }
    },
    async remove( req:Request, res:Response) {
        const { id } = req.params
        try {
            LogController().logging(req.connection , TYPES.DELETE)
            await RateModel.findByIdAndDelete(id)
            return res.status(HTTP.SUCCESS)
                .json({
                    status: 'ok'
                })
        } catch(error) {
            res.status(HTTP.BAD_REQUEST).send(error)
        }
    },
    async create( req: Response, res:Response ) {
        try {
            const { body }:any = req
            LogController().logging(req.connection, TYPES.POST)
            const item = new RateModel(body)
            const newItem = await item.save()
            return res.status(HTTP.CREATED).json(newItem)
        } catch(error) {
            return res.status(HTTP.BAD_REQUEST).send(error)
        }
    }
})

export default RateController