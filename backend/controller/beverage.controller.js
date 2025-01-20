import Beverage from "../model/beverage.model.js"
import mongoose from "mongoose"

export const getBeverages = async (req, res) => {
	try {
		const beverages = await Beverage.find({})
		res.status(200).json({ success: true, data: beverages })
	} catch (error) {
		console.error(`Error in getBeverages: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const addBeverage = async (req, res) => {
	const beverage = req.body

	if (!beverage.name || !beverage.price || !beverage.image) {
		return res
			.status(400)
			.json({ success: false, message: "Please fill in all fields" })
	}

	const newBeverage = new Beverage(beverage)

	try {
		await newBeverage.save()
		res.status(201).json({ success: true, data: newBeverage })
	} catch (error) {
		console.error(`Error in addBeverage: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const deleteBeverage = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid Beverage ID" })
	}

	try {
		await Beverage.findByIdAndDelete(id)
		res.status(200).json({ success: true, message: "Beverage Deleted" })
	} catch (error) {
		console.error(`Error in deleteBeverage: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}

export const updateBeverage = async (req, res) => {
	const { id } = req.params
	const beverage = req.body

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "Invalid Beverage ID" })
	}

	try {
		const updatedBeverage = await Beverage.findByIdAndUpdate(id, beverage, {
			new: true,
		})
		res.status(200).json({ success: true, data: updatedBeverage })
	} catch (error) {
		console.error(`Error in updateBeverage: ${error.message}`)
		res.status(500).json({ success: false, message: "Server Error" })
	}
}
