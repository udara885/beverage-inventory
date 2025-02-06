import { useEffect, useMemo, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import toast, { Toaster } from "react-hot-toast"
import AddModal from "./components/AddModal"
import UpdateModal from "./components/UpdateModal"
import CartModal from "./components/CartModal"
import DetailModal from "./components/DetailModal"
import OrderDetailModal from "./components/OrderDetailModal"
import OrderUpdateModal from "./components/OrderUpdateModal"
import PaymentModal from "./components/PaymentModal"
import { io } from "socket.io-client"

function App() {
	const location = useLocation()
	const [isAdmin, setIsAdmin] = useState(false)
	const [isAddOpen, setIsAddOpen] = useState(false)
	const [isUpdateOpen, setIsUpdateOpen] = useState(false)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [isDetailOpen, setIsDetailOpen] = useState(false)
	const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false)
	const [isOrderUpdateOpen, setIsOrderUpdateOpen] = useState(false)
	const [isPaymentOpen, setIsPaymentOpen] = useState(false)
	const [newOrder, setNewOrder] = useState({
		items: [],
		total: 0,
	})
	const [id, setId] = useState("")
	const [orderId, setOrderId] = useState("")
	const [cartItems, setCartItems] = useState([])
	const [ view, setView ] = useState( "menu" )
	
	const audio = new Audio( "../winner-bell-game-show-91932.mp3" )
	
	const socket = io("http://localhost:3000")

	useEffect(() => {
		if (location.pathname === "/admin") {
			setIsAdmin(true)
		}
	}, [location.pathname])

	useEffect(() => {
		if (isAdmin) {
			socket.on("received-order", (message) => {
				toast.success( message )
				audio.play()
			})
		}
	}, [socket])

	const memoizedNavbarProps = useMemo(
		() => ({
			isAdmin,
			setIsAddOpen,
			setIsCartOpen,
			cartItems,
			setView,
		}),
		[isAdmin, cartItems]
	)

	const memoizedHomePageProps = useMemo(
		() => ({
			cartItems,
			setCartItems,
			setIsDetailOpen,
			setId,
			view,
			isAdmin,
		}),
		[cartItems, view, isAdmin]
	)

	const memoizedAdminPageProps = useMemo(
		() => ({
			isAdmin,
			setIsAddOpen,
			setIsUpdateOpen,
			setIsDetailOpen,
			setId,
			setOrderId,
			setIsOrderDetailOpen,
			setIsOrderUpdateOpen,
			view,
		}),
		[isAdmin, view]
	)

	return (
		<div className="min-h-screen px-5 py-5 bg-gray-900">
			<Toaster />
			<Navbar {...memoizedNavbarProps} />
			{isAddOpen && <AddModal setIsAddOpen={setIsAddOpen} />}
			{isUpdateOpen && (
				<UpdateModal
					setIsUpdateOpen={setIsUpdateOpen}
					id={id}
				/>
			)}
			{isCartOpen && (
				<CartModal
					setIsCartOpen={setIsCartOpen}
					cartItems={cartItems}
					setCartItems={setCartItems}
					newOrder={newOrder}
					setNewOrder={setNewOrder}
					setIsPaymentOpen={setIsPaymentOpen}
				/>
			)}
			{isDetailOpen && (
				<DetailModal
					setIsDetailOpen={setIsDetailOpen}
					id={id}
					cartItems={cartItems}
					setCartItems={setCartItems}
					isAdmin={isAdmin}
				/>
			)}
			{isOrderDetailOpen && (
				<OrderDetailModal
					setIsOrderDetailOpen={setIsOrderDetailOpen}
					orderId={orderId}
				/>
			)}
			{isOrderUpdateOpen && (
				<OrderUpdateModal
					setIsOrderUpdateOpen={setIsOrderUpdateOpen}
					orderId={orderId}
				/>
			)}
			{isPaymentOpen && (
				<PaymentModal
					setIsPaymentOpen={setIsPaymentOpen}
					newOrder={newOrder}
					setCartItems={setCartItems}
					setNewOrder={setNewOrder}
					socket={socket}
				/>
			)}
			<Routes>
				<Route
					path="/"
					element={<HomePage {...memoizedHomePageProps} />}
				/>
				<Route
					path="/admin"
					element={<AdminPage {...memoizedAdminPageProps} />}
				/>
			</Routes>
		</div>
	)
}

export default App
