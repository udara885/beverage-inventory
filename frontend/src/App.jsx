import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import { Toaster } from "react-hot-toast"
import AddModal from "./components/AddModal"
import UpdateModal from "./components/UpdateModal"
import CartModal from "./components/CartModal"
import DetailModal from "./components/DetailModal"
import OrderDetailModal from "./components/OrderDetailModal"
import OrderUpdateModal from "./components/OrderUpdateModal"

function App() {
	const location = useLocation()
	const [isAdmin, setIsAdmin] = useState(false)
	const [isAddOpen, setIsAddOpen] = useState(false)
	const [isUpdateOpen, setIsUpdateOpen] = useState(false)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [isDetailOpen, setIsDetailOpen] = useState(false)
	const [ isOrderDetailOpen, setIsOrderDetailOpen ] = useState( false )
	const [isOrderUpdateOpen, setIsOrderUpdateOpen] = useState(false)
	const [id, setId] = useState("")
	const [orderId, setOrderId] = useState("")
	const [cartItems, setCartItems] = useState([])

	useEffect(() => {
		if (location.pathname === "/admin") {
			setIsAdmin(true)
		} else {
			setIsAdmin(false)
		}
	}, [location.pathname])

	return (
		<div className="min-h-screen px-5 py-5 bg-gray-900">
			<Toaster />
			<Navbar
				isAdmin={isAdmin}
				setIsAddOpen={setIsAddOpen}
				setIsCartOpen={setIsCartOpen}
				cartItems={cartItems}
			/>
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
				/>
			)}
			{isDetailOpen && (
				<DetailModal
					setIsDetailOpen={setIsDetailOpen}
					id={ id }
					cartItems={ cartItems }
					setCartItems={ setCartItems }
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
			<Routes>
				<Route
					path="/"
					element={
						<HomePage
							cartItems={cartItems}
							setCartItems={setCartItems}
							setIsDetailOpen={setIsDetailOpen}
							setId={setId}
						/>
					}
				/>
				<Route
					path="/admin"
					element={
						<AdminPage
							isAdmin={isAdmin}
							setIsAddOpen={setIsAddOpen}
							setIsUpdateOpen={setIsUpdateOpen}
							setIsDetailOpen={setIsDetailOpen}
							setId={setId}
							setOrderId={setOrderId}
							setIsOrderDetailOpen={setIsOrderDetailOpen}
							setIsOrderUpdateOpen={setIsOrderUpdateOpen}
						/>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
