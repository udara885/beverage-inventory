import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import { Toaster } from "react-hot-toast"
import AddModal from "./components/AddModal"
import UpdateModal from "./components/UpdateModal"

function App() {
	const location = useLocation()
	const [isAdmin, setIsAdmin] = useState(false)
	const [isAddOpen, setIsAddOpen] = useState(false)
	const [ isUpdateOpen, setIsUpdateOpen ] = useState( false )
	const [id, setId] = useState( "" )

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
			/>
			{isAddOpen && <AddModal setIsAddOpen={setIsAddOpen} />}
			{isUpdateOpen && <UpdateModal setIsUpdateOpen={setIsUpdateOpen} id={id} />}
			<Routes>
				<Route
					path="/"
					element={<HomePage setIsAddOpen={setIsAddOpen} />}
				/>
				<Route
					path="/admin"
					element={
						<AdminPage
							isAdmin={isAdmin}
							setIsUpdateOpen={ setIsUpdateOpen }
							setId={ setId }
						/>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
