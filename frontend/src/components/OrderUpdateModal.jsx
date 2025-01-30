import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useOrderStore } from "../store/order"

const OrderUpdateModal = ({ setIsOrderUpdateOpen, orderId }) => {
	const { getOrder, updateOrder } = useOrderStore()

	const order = getOrder(orderId)

	const [updatedOrder, setUpdatedOrder] = useState(order)

	const orderItems = updatedOrder.items

	const total = orderItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)

	useEffect(() => {
		setUpdatedOrder({
			items: orderItems,
			total: total,
		})
	}, [orderItems, total])

	const removeItem = (index) => {
		const newCartItems = orderItems.filter((_, i) => i !== index)
		setUpdatedOrder({ ...updatedOrder, items: newCartItems })
		toast.success(`Item removed from order`)
	}

	const updateQuantity = (index, quantity) => {
		const newCartItems = orderItems.map((item, i) =>
			i === index ? { ...item, quantity: quantity } : item
		)
		setUpdatedOrder({ ...updatedOrder, items: newCartItems })
	}

	const handleUpdateOrder = async (id, updatedOrder) => {
		const { success, message } = await updateOrder(id, updatedOrder)
		if (!success) {
			toast.error(message)
		}
		if (success) {
			toast.success(message)
			setIsOrderUpdateOpen(false)
			setUpdatedOrder({})
		}
	}

	const handleClose = (e) => {
		if (e.target === e.currentTarget) {
			setIsOrderUpdateOpen(false)
		}
	}

	return (
		<div
			className="flex items-center bg-black justify-center inset-0 fixed bg-opacity-50"
			onClick={handleClose}
		>
			<div className="max-w-lg max-h-full w-full flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md">
				<h1 className="text-2xl text-center text-white font-bold">
					Update Order #{orderId}
				</h1>
				<hr className="bg-gray-400 border-0 h-px" />
				<div className="flex flex-col gap-4 overflow-x-auto">
					{orderItems.map((item, index) => (
						<div
							className="flex items-center justify-around mb-3"
							key={item._id}
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
							LKR {total}.00
						</h3>
					</div>
				</div>
				<button
					className="w-full bg-blue-400 p-2 rounded-md font-bold text-gray-900"
					onClick={() => handleUpdateOrder(order._id, updatedOrder)}
				>
					Update Order
				</button>
			</div>
		</div>
	)
}

export default OrderUpdateModal
