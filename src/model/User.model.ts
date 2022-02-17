import { model, Schema } from 'mongoose'


const schema = new Schema({
    username: { type: String },
    password: { type: String },
    roles: [{type: String}]
})

export default model('User', schema)