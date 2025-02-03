import { Menu, ShoppingCart, SquarePlus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = ({
	isAdmin,
	setIsAddOpen,
	setIsCartOpen,
	cartItems,
	setView,
} ) =>
{
	const [isNavOpen, setIsNavOpen] = useState(false)

	return (
		<div className="max-w-screen-xl mx-auto border-b-2 border-gray-800 pb-5">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl sm:text-3xl font-bold uppercase text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
					<Link to={`${isAdmin ? "/admin" : "/"}`}>
						Beverage Store
					</Link>
				</h1>
				{isAdmin && (
					<div className="items-center gap-10 hidden md:flex">
						<h1
							className="text-xl sm:text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center cursor-pointer border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500"
							onClick={() => setView("menu")}
						>
							Menu
						</h1>
						<h1
							className="text-xl sm:text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center cursor-pointer border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500"
							onClick={() => setView("orders")}
						>
							Orders
						</h1>
					</div>
				)}
				<div className="flex items-center gap-3">
					{isAdmin ? (
						<button
							className="text-white bg-gray-800 p-2 rounded-md hover:bg-gray-700"
							onClick={() => setIsAddOpen(true)}
						>
							<SquarePlus />
						</button>
					) : (
						<div className="relative">
							<button
								className="text-white bg-gray-800 p-2 rounded-md hover:bg-gray-700"
								onClick={() => setIsCartOpen(true)}
							>
								<ShoppingCart />
							</button>
							<div className="bg-blue-400 w-6 rounded-full flex items-center justify-center text-gray-900 font-semibold absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
								{cartItems.length}
							</div>
						</div>
					)}
					{isAdmin && (
						<button className="text-white bg-gray-800 p-2 rounded-md hover:bg-gray-700 md:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
							<Menu />
						</button>
					)}
				</div>
			</div>
			{isNavOpen && <div className="flex flex-col justify-center gap-3 mt-4 md:hidden">
				<h1
					className="text-xl sm:text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center cursor-pointer border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 mx-w-xs mx-auto"
					onClick={() => setView("menu")}
				>
					Menu
				</h1>
				<h1
					className="text-xl sm:text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center cursor-pointer border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 max-w-xs mx-auto"
					onClick={() => setView("orders")}
				>
					Orders
				</h1>
			</div>}
		</div>
	)
}

export default Navbar
