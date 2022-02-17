import { model, Schema } from 'mongoose'


const schema = new Schema({
    date: { type: Date},
    queryType: { type: String},
    ip: { type: String}
})

export default model('Log', schema)