import { useState } from "react"
import { useBeverageStore } from "../store/beverage"
import toast from "react-hot-toast"

const UpdateModal = ({ setIsUpdateOpen, id }) => {
	const { updateBeverage } = useBeverageStore()
	const beverage = useBeverageStore((state) =>
		state.beverages.find((beverage) => beverage._id === id)
	)
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

	return (
		<div className="flex items-center bg-black justify-center inset-0 fixed bg-opacity-50">
			<div className="max-w-sm w-full flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
				<h1 className="text-2xl text-center dark:text-white text-black font-bold">
					Update Beverage
				</h1>
				<input
					type="text"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:bg-gray-800 focus:outline-none border-2 rounded-md dark:text-white text-black"
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
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md dark:text-white text-black"
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
				<input
					type="text"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md dark:text-white text-black"
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
				<button
					className="w-full bg-gray-900 p-2 rounded-md font-bold text-blue-400 border-2 border-blue-400"
					onClick={() => setIsUpdateOpen(false)}
				>
					Cancel
				</button>
			</div>
		</div>
	)
}

export default UpdateModal
