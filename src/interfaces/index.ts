import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken";

export interface Query {
    token?:string
}


export interface RemoveId {
    id:string
}

export interface UserRequest extends Request {
    user?:object|JwtPayload|string|any
}


export interface FetchSourceDTO {
    date: string,
    base: string,
    rates: object
}

export interface RateDTO {
    ticker: string,
    cost: number,
    _id?:string
}

export interface LogDTO {
    date: Date,
    queryType: string,
    ip: string,
}

export type IMiddleware =( req: Request, res: Response, next: NextFunction) => void

export type UserType = {
    username: string,
    password?: string,
    _id?: string,
    roles?: string[]
}