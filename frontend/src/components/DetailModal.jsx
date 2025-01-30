import toast from "react-hot-toast"
import { useBeverageStore } from "../store/beverage"

const DetailModal = ({ setIsDetailOpen, id, cartItems, setCartItems }) => {
	const beverage = useBeverageStore((state) =>
		state.beverages.find((beverage) => beverage._id === id)
	)

	const handleClose = (e) => {
		if (e.target === e.currentTarget) {
			setIsDetailOpen(false)
		}
	}

	return (
		<div
			className="flex items-center bg-black justify-center inset-0 fixed bg-opacity-50"
			onClick={handleClose}
		>
			<div className="max-w-sm w-full flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md">
				<img
					src={beverage.image}
					alt={beverage.name}
					className="rounded-md"
				/>
				<div className="flex items-center justify-between">
					<h1 className="text-2xl text-white font-bold">
						{beverage.name}
					</h1>
					<h2 className="text-lg text-gray-200 font-bold">
						LKR {beverage.price}.00
					</h2>
				</div>
				<p className="text-gray-300 text-justify mb-2">
					{beverage.description}
				</p>
				<button
					className="w-full p-2 bg-blue-400 hover:bg-blue-500 rounded-md font-bold text-gray-900"
					onClick={() => {
						if (
							cartItems.find((item) => item._id === beverage._id)
						) {
							toast.error(`Item already in cart`)
						} else {
							setCartItems([...cartItems, beverage])
							toast.success(`Item added to cart`)
						}
					}}
				>
					Add to Cart
				</button>
			</div>
		</div>
	)
}

export default DetailModal
