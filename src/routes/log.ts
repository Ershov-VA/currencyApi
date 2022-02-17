const express = require('express')
import { Response, Request } from 'express';
import auth from '../auth'
const router = express.Router();
import { viewer } from '../auth/roles';
import {LogController} from '../controllers';
import { IMiddleware } from '../interfaces';


router.get('/', [auth, viewer], <IMiddleware>function(req, res) {
    LogController().get(req, res)
})


export default router