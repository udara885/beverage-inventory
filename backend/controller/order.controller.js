import Order from "../model/order.model.js"
import mongoose from "mongoose"

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
    res.status(200).json({ success: true, data: orders })
  } catch (error) {
    console.error(`Error in getOrders: ${error.message}`)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

export const addOrder = async (req, res) => {
  const order = req.body

  if (!order.items || !order.total) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to place order" })
  }

  const newOrder = new Order(order)

  try {
    await newOrder.save()
    res.status(201).json({ success: true, data: newOrder })
  } catch (error) {
    console.error(`Error in addOrder: ${error.message}`)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

export const deleteOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Order ID" })
  }

  try {
    await Order.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: "Order Deleted" })
  } catch (error) {
    console.error(`Error in deleteOrder: ${error.message}`)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}

export const updateOrder = async (req, res) => {
  const { id } = req.params
  const order = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Order ID" })
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true })
    res.status(200).json({ success: true, data: updatedOrder })
  } catch (error) {
    console.error(`Error in updateOrder: ${error.message}`)
    res.status(500).json({ success: false, message: "Server Error" })
  }
}