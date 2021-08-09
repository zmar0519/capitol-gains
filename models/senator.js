import mongoose from 'mongoose'

const senatorSchema = new mongoose.Schema({
  name: String,
  party: String,
  state: String,
  image: String,
}, {
  timestamps: true
})

const Senator = mongoose.model('Senator', senatorSchema)

export {
  Senator
}