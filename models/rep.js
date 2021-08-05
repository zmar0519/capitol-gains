import mongoose from 'mongoose'

const repSchema = new mongoose.Schema({
  name: String,
  purchases: {type: mongoose.Schema.Types.ObjectId, ref: "Transactions"},
  avatar: String,
}, {
  timestamps: true
})

const Rep = mongoose.model('Rep', repSchema)

export {
  Rep
}