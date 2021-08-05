import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  ticker: String,
  amount: Number,
  date: Date,
  transactionType: String,
}, {
  timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

export {
  Transaction
}