import { Trash2 } from "lucide-react"
import toast from "react-hot-toast"

const CartModal = ({ setIsCartOpen, cartItems, setCartItems }) => {
	const removeItem = (index) => {
		const newCartItems = cartItems.filter((_, i) => i !== index)
		setCartItems(newCartItems)
		toast.success(`Item removed from cart`)
	}

	const updateQuantity = (index, quantity) => {
		const newCartItems = cartItems.map((item, i) =>
			i === index ? { ...item, quantity: quantity } : item
		)
		setCartItems(newCartItems)
	}

	return (
		<div className="flex items-center bg-black justify-center inset-0 fixed bg-opacity-50">
			<div className="max-w-lg max-h-full w-full flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
				<h1 className="text-2xl text-center dark:text-white text-black font-bold">
					Cart
				</h1>
				<hr className="bg-gray-400 border-0 h-px" />
				<div className="flex flex-col gap-4 overflow-x-auto">
					{cartItems.map((item, index) => (
						<div
							className="flex items-center justify-around mb-3"
							key={index}
						>
							<img
								src={item.image}
								alt={item.name}
								className="w-16 h-16 rounded-md mr-2"
							/>
							<h2 className="font-semibold text-lg text-gray-200 !w-28 mr-2">
								{item.name}
							</h2>
							<div className="flex items-center gap-2 mr-6">
								<button
									className={`text-gray-100 text-lg font-medium bg-gray-700 h-6 w-6 p-2 rounded-md hover:bg-gray-600 flex items-center justify-center ${
										item.quantity <= 1 &&
										"cursor-not-allowed"
									}`}
									onClick={() => {
										updateQuantity(index, item.quantity - 1)
									}}
									disabled={item.quantity <= 1}
								>
									-
								</button>
								<span className="text-gray-200 font-semibold">
									{item.quantity}
								</span>
								<button
									className="text-gray-100 text-lg font-medium bg-gray-700 h-6 w-6 p-2 rounded-md hover:bg-gray-600 flex items-center justify-center"
									onClick={() => {
										updateQuantity(index, item.quantity + 1)
									}}
								>
									+
								</button>
							</div>
							<h2 className="font-bold text-lg text-gray-200 !w-24 mr-6">
								LKR {item.price}.00
							</h2>
							<button
								className="text-red-400"
								onClick={() => {
									removeItem(index)
								}}
							>
								<Trash2 />
							</button>
						</div>
					))}
				</div>
				<hr className="bg-gray-400 border-0 h-px" />
				<div className="bg-gray-700 w-full rounded-md p-2">
					<h2 className="text-xl text-gray-200 font-bold mb-3">
						Order Summary
					</h2>
					<div className="flex justify-between items-center">
						<h3 className="text-lg text-gray-300">Total</h3>
						<h3 className="text-lg text-gray-200 font-bold">
							LKR{" "}
							{cartItems.reduce(
								(acc, item) => acc + item.price * item.quantity,
								0
							)}
							.00
						</h3>
					</div>
				</div>
				<button
					className="w-full bg-blue-400 p-2 rounded-md font-bold text-gray-900"
					onClick={() => {
						setCartItems([])
						setIsCartOpen(false)
						toast.success(`Checkout successful`)
					}}
				>
					Checkout
				</button>
				<button
					className="w-full bg-gray-900 p-2 rounded-md font-bold text-blue-400 border-2 border-blue-400"
					onClick={() => setIsCartOpen(false)}
				>
					Cancel
				</button>
			</div>
		</div>
	)
}

export default CartModal
