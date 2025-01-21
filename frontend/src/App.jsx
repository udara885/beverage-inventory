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

function App() {
	const location = useLocation()
	const [isAdmin, setIsAdmin] = useState(false)
	const [isAddOpen, setIsAddOpen] = useState(false)
	const [isUpdateOpen, setIsUpdateOpen] = useState(false)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [isDetailOpen, setIsDetailOpen] = useState(false)
	const [id, setId] = useState("")
	const [cartItems, setCartItems] = useState([])

	useEffect(() => {
		if (location.pathname === "/admin") {
			setIsAdmin(true)
		} else {
			setIsAdmin(false)
		}
	}, [location.pathname])

	return (
		<div className="min-h-screen px-5 py-5 dark:bg-gray-900 bg-gray-100">
			<Toaster />
			<Navbar
				isAdmin={isAdmin}
				setIsAddOpen={setIsAddOpen}
				setIsCartOpen={setIsCartOpen}
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
			{isDetailOpen && <DetailModal setIsDetailOpen={setIsDetailOpen} id={id} />}
			<Routes>
				<Route
					path="/"
					element={
						<HomePage
							cartItems={cartItems}
							setCartItems={ setCartItems }
							setIsDetailOpen={ setIsDetailOpen }
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
							setIsUpdateOpen={ setIsUpdateOpen }
							setIsDetailOpen={ setIsDetailOpen }
							setId={setId}
						/>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
