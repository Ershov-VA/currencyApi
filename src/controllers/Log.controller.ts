import { Request, Response } from "express";
import { HTTP } from "../interfaces/enum/http";
import { LogDTO  } from "../interfaces";
import { LogModel } from "../model";

const LogController = () => ({
   
    async get(req:Request, res:Response) {
        try {
            const item = await LogModel.find()
            return res.status(HTTP.SUCCESS)
                    .json(item)
        } catch(error) {
            return res.status(HTTP.BAD_REQUEST)
                    .send(error)
        }
    },
    async logging(connection:any, type:string) {
        try {
            const logItem = { 
                ip: connection.remoteAddress,
                queryType: type,
                date: new Date
            } as LogDTO
            const item = new LogModel(logItem)
            await item.save()
            return true        
        } catch(error) {
            return false
        }
    }
})

export default LogController