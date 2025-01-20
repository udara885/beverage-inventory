import express from "express"
import dotenv from "dotenv"
import path from "path"
import { connectDB } from "./config/db.js"
import beverageRoutes from "./routes/beverage.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const __dirname = path.resolve()

app.use(express.json())

app.use("/api", beverageRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
	})
}

app.listen(PORT, () => {
	connectDB()
	console.log(`Server is running on http://localhost:${PORT}`)
})
