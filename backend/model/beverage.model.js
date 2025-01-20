import mongoose from "mongoose"

const beverageSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Beverage = mongoose.model("Beverage", beverageSchema)

export default Beverage
