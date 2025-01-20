import express from "express"
import {
	addBeverage,
	deleteBeverage,
	getBeverages,
	updateBeverage,
} from "../controller/beverage.controller.js"

const router = express.Router()

router.get( "/beverages", getBeverages )
router.post("/add-beverage", addBeverage)
router.put("/update-beverage/:id", updateBeverage)
router.delete("/delete-beverage/:id", deleteBeverage)

export default router
