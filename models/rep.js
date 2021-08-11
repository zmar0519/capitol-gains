import mongoose from "mongoose"

const repSchema = new mongoose.Schema(
	{
		name: String,
		party: String,
		state: String,
		image: String,
	},
	{
		timestamps: true,
	}
)

const Rep = mongoose.model("Rep", repSchema)

export { Rep }
