const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

import {job} from './helpers/scheduler'
import routes from './routes'
import {PORT} from './config'
import { install } from './install'

const app = express()

app.use(cors())
app.use(express.json())
app.options('*', cors())  // разрешение кросс-доменных запросов

app.use('/', routes.Rate)
app.use('/auth', routes.Auth)
app.use('/user', routes.User)
app.use('/rate', routes.Rate)
app.use('/log', routes.Log)


mongoose.connect( 'mongodb://mongo:27017/api' );

install()   // Если первоначальный запуск, то добавится пользователь admin - admin и создадутся случайные котировки по тикерам за 7 дней



app.listen(PORT, (err?:any) => {
    if (err) return console.log(`error start port`);       
    console.log(`server start on ${PORT}`);    
    job  // запуск назначенного задания получения котировок в 12:00
})


