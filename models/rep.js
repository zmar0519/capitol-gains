import mongoose from 'mongoose'

const repSchema = new mongoose.Schema({
  name: String,
  purchases: {type: mongoose.Schema.Types.ObjectId, ref: "Transactions", required: true},
  avatar: String,
}, {
  timestamps: true
})

const Rep = mongoose.model('Rep', repSchema)

export {
  Rep
}