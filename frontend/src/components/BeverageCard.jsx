import { useBeverageStore } from "../store/beverage"
import { Pencil, Trash } from "lucide-react"
import toast from "react-hot-toast"

const BeverageCard = ({
	beverage,
	isAdmin,
	setIsUpdateOpen,
	setId,
	cartItems,
	setCartItems,
	setIsDetailOpen
}) => {
	const { deleteBeverage } = useBeverageStore()

	const handleDelete = async (id) => {
		const { success, message } = await deleteBeverage(id)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
		}
	}

	return (
		<div className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl bg-white dark:bg-gray-800">
			<img
				src={beverage.image}
				alt={beverage.name}
				className="h-44 w-full object-cover cursor-pointer"
				onClick={() => {
					setIsDetailOpen(true)
					setId(beverage._id)
				}}
			/>
			<div className="p-4">
				<div className="flex justify-between">
					<h3 className="mb-2 text-xl font-bold text-black dark:text-white">
						{beverage.name}
					</h3>
					<h4 className="font-bold text-lg text-gray-600 dark:text-gray-200 mb-4">
						LKR {beverage.price}.00
					</h4>
				</div>
				{isAdmin ? (
					<div className="flex gap-2">
						<button
							className="p-2 bg-blue-400 hover:bg-blue-500 rounded-md"
							onClick={() => {
								setIsUpdateOpen(true)
								setId(beverage._id)
							}}
						>
							<Pencil size={20} />
						</button>
						<button
							className="p-2 bg-red-400 hover:bg-red-500 rounded-md"
							onClick={() => handleDelete(beverage._id)}
						>
							<Trash size={20} />
						</button>
					</div>
				) : (
					<button
						className="p-2 bg-blue-400 hover:bg-blue-500 rounded-md font-bold text-gray-900"
						onClick={() => {
							if (
								cartItems.find(
									(item) => item._id === beverage._id
								)
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
				)}
			</div>
		</div>
	)
}

export default BeverageCard
