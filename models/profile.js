import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  reps: {type: mongoose.Schema.Types.ObjectId, ref: "Reps"},
  senators: {type: mongoose.Schema.Types.ObjectId, ref: "Senator"}
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}