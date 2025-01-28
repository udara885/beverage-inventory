import express from "express"
import {
	addOrder,
	deleteOrder,
	getOrders,
	updateOrder,
} from "../controller/order.controller.js"

const router = express.Router()

router.get("/orders", getOrders)
router.post("/create-order", addOrder)
router.put("/update-order/:id", updateOrder)
router.delete( "/delete-order/:id", deleteOrder )

export default router