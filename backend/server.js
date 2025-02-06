import express from "express"
import dotenv from "dotenv"
import path from "path"
import { connectDB } from "./config/db.js"
import beverageRoutes from "./routes/beverage.routes.js"
import orderRoutes from "./routes/order.routes.js"
import { createServer } from "http"
import { Server } from "socket.io"

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: ["http://localhost:5173"],
	},
})
const PORT = process.env.PORT || 3000

const __dirname = path.resolve()

io.on("connection", (socket) => {
	socket.on("place-order", (data) => {
		socket.broadcast.emit("received-order", data.message)
	})
})

app.use(express.json())

app.use("/api", beverageRoutes, orderRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
	})
}

httpServer.listen(PORT, () => {
	connectDB()
	console.log(`Server is running on http://localhost:${PORT}`)
})
