export interface tHTTP {
    req: Express.Request,
    res: Express.Response
}

export interface tUSER {
    username: string,
    password: string,
    id?:string,
    roles?:string[]
}

export interface CreateTicketDTO extends Request {
    name: string
}

export interface DateRequestDTO extends Request {
    date: Date
}

export interface CreateUserDTO extends Request {
    username: string,
    password: string,
    roles: string[]
}
