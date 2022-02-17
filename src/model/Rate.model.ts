import { model, Schema } from 'mongoose'

const schema = new Schema({
    date: {type: Date},
    rates: [{
        ticker: { type: String },
        cost: { type: Number}
    }]
})

export default model('Rate', schema)