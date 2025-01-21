import { ShoppingCart, SquarePlus } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = ({ isAdmin, setIsAddOpen, setIsCartOpen }) => {
	return (
		<div className="max-w-screen-xl mx-auto">
			<div className="flex h-16 items-center justify-between">
				<h1 className="text-2xl sm:text-3xl font-bold uppercase text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
					<Link to={"/"}>Beverage Store</Link>
				</h1>
				{isAdmin ? (
					<button
						className="dark:text-white text-black bg-gray-800 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
						onClick={() => setIsAddOpen(true)}
					>
						<SquarePlus />
					</button>
				) : (
					<button
						className="dark:text-white text-black bg-gray-800 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
						onClick={() => setIsCartOpen(true)}
					>
						<ShoppingCart />
					</button>
				)}
			</div>
		</div>
	)
}

export default Navbar
