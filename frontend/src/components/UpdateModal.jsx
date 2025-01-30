import { useState } from "react"
import { useBeverageStore } from "../store/beverage"
import toast from "react-hot-toast"

const UpdateModal = ({ setIsUpdateOpen, id }) => {
	const { updateBeverage, getBeverage } = useBeverageStore()

	const beverage = getBeverage(id)

	const [updatedBeverage, setUpdatedBeverage] = useState(beverage)

	const handleUpdateBeverage = async (id, updatedBeverage) => {
		const { success, message } = await updateBeverage(id, updatedBeverage)
		if (!success) {
			toast.error(message)
		}
		if (success) {
			toast.success(message)
			setIsUpdateOpen(false)
		}
	}

	const handleClose = (e) => {
		if (e.target === e.currentTarget) {
			setIsUpdateOpen(false)
		}
	}

	return (
		<div
			className="flex items-center bg-black justify-center inset-0 fixed bg-opacity-50"
			onClick={handleClose}
		>
			<div className="max-w-sm w-full flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md">
				<h1 className="text-2xl text-center text-white font-bold">
					Update Beverage
				</h1>
				<input
					type="text"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:bg-gray-800 focus:outline-none border-2 rounded-md text-white"
					placeholder="Beverage Name"
					name="name"
					value={updatedBeverage.name}
					onChange={(e) =>
						setUpdatedBeverage({
							...updatedBeverage,
							name: e.target.value,
						})
					}
				/>
				<input
					type="number"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white"
					name="price"
					placeholder="Price"
					value={updatedBeverage.price}
					onChange={(e) =>
						setUpdatedBeverage({
							...updatedBeverage,
							price: e.target.value,
						})
					}
				/>
				<select
					name="category"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white"
					value={updatedBeverage.category}
					onChange={(e) =>
						setUpdatedBeverage({
							...updatedBeverage,
							category: e.target.value,
						})
					}
				>
					<option>Select the Category</option>
					<option value="Coffee">Coffee</option>
					<option value="Shakes">Shakes</option>
					<option value="Tea">Tea</option>
					<option value="Bubble Tea">Bubble Tea</option>
				</select>
				<input
					type="text"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white"
					name="image"
					placeholder="Image URL"
					value={updatedBeverage.image}
					onChange={(e) =>
						setUpdatedBeverage({
							...updatedBeverage,
							image: e.target.value,
						})
					}
				/>
				<textarea
					name="description"
					placeholder="Description"
					value={updatedBeverage.description}
					onChange={(e) =>
						setUpdatedBeverage({
							...updatedBeverage,
							description: e.target.value,
						})
					}
					rows={4}
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white resize-none"
				/>
				<button
					className="w-full bg-blue-400 p-2 rounded-md font-bold text-gray-900"
					onClick={() =>
						handleUpdateBeverage(beverage._id, updatedBeverage)
					}
				>
					Update Beverage
				</button>
			</div>
		</div>
	)
}

export default UpdateModal
