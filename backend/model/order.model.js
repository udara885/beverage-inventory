import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
	{
		items: [],
		total: Number,
		status: {
			type: String,
			default: "pending",
		},
	},
	{ timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

export default Order
