import { v4 as uuidv4 } from 'uuid';
var mongoose = require('mongoose')
var Schema = mongoose.Schema

export const UqTokenGen = () => {
  const token = Date.now().toString(36)
  
  return `${token}`
}

export const SerialGen = () => {
  const uuid = uuidv4();
  const serial = uuid.substring(0, 7)
  return serial;
}

export const getDate = () => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  
  return `${day}/${month}/${year}`
}

export const Signs = [
  'Aries',
  'Tauro',
  'Geminis',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Escorpio',
  'Sagitario',
  'Capricornio',
  'Acuario',
  'Piscis'
]

// make a function that returns lenght of collection

const CounterSchema = new Schema(
  {
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
  }
)

const counterModel = mongoose.model('Counter', CounterSchema);

export const autoIncrement = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    modelName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error)
      doc.serie = counter.seq
      next()
    }
  )
}