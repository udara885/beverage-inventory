import { useState } from "react"
import { useOrderStore } from "../store/order"
import toast from "react-hot-toast"

const PaymentModal = ({
	setIsPaymentOpen,
	newOrder,
	setCartItems,
	setNewOrder,
	socket
}) => {
	const [cardNumber, setCardNumber] = useState("")
	const [expiration, setExpiration] = useState("")
	const [cvc, setCvc] = useState("")

	const handleClose = ((e) => {
		if (e.target === e.currentTarget) {
			setIsPaymentOpen(false)
		}
	})

	const { createOrder } = useOrderStore()

	const handleCreateOrder = async () => {
		const { success, message } = await createOrder(newOrder)

		if (!success) {
			toast.error(message)
		} else {
			toast.success( message )
			socket.emit("place-order", {message: "New order recieved"})
			setIsPaymentOpen(false)
		}
		setNewOrder({
			items: [],
			total: 0,
		})
		setCartItems([])
	}

	const handleSubmit = () => {
		if (cardNumber && expiration && cvc) {
			handleCreateOrder()
		} else {
			toast.error("Please fill all fields to place your order")
		}
	}

	return (
		<div
			className="flex items-center bg-black justify-center inset-0 fixed bg-opacity-50"
			onClick={handleClose}
		>
			<div className="max-w-sm w-full flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md">
				<div className="flex items-center justify-center gap-2">
					<h1 className="text-2xl text-center text-white font-bold">
						Pay ( LKR {newOrder.total}.00 )
					</h1>
				</div>
				<input
					type="text"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:bg-gray-800 focus:outline-none border-2 rounded-md text-white"
					placeholder="Card Number"
          value={ cardNumber }
          maxLength={12}
					onChange={(e) => setCardNumber(e.target.value)}
				/>
				<input
					type="month"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white "
					placeholder="Expiration"
					value={expiration}
					onChange={(e) => setExpiration(e.target.value)}
				/>
				<input
					type="text"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white "
					placeholder="CVC"
          value={ cvc }
          maxLength={3}
					onChange={(e) => setCvc(e.target.value)}
				/>
				<button
					className="w-full bg-blue-400 p-2 rounded-md font-bold text-gray-900"
					onClick={handleSubmit}
				>
					Place Order
				</button>
			</div>
		</div>
	)
}

export default PaymentModal
