import { useState } from "react"
import { useBeverageStore } from "../store/beverage"
import toast from "react-hot-toast"

const AddModal = ({ setIsAddOpen }) => {
	const [newBeverage, setNewBeverage] = useState({
		name: "",
		price: "",
		category: "",
		image: "",
		description: "",
	})

	const { addBeverage } = useBeverageStore()

	const handleAddBeverage = async () => {
		const { success, message } = await addBeverage(newBeverage)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
			setIsAddOpen(false)
		}
		setNewBeverage({
			name: "",
			price: "",
			category: "",
			image: "",
			description: "",
		})
	}

	const handleClose = (e) => {
		if (e.target === e.currentTarget) {
			setIsAddOpen(false)
		}
	}

	return (
		<div
			className="flex items-center bg-black justify-center inset-0 fixed bg-opacity-50"
			onClick={handleClose}
		>
			<div className="max-w-sm w-full flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md">
				<h1 className="text-2xl text-center text-white font-bold">
					Add New Beverage
				</h1>
				<input
					type="text"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:bg-gray-800 focus:outline-none border-2 rounded-md text-white"
					placeholder="Beverage Name"
					name="name"
					value={newBeverage.name}
					onChange={(e) =>
						setNewBeverage({
							...newBeverage,
							name: e.target.value,
						})
					}
				/>
				<input
					type="number"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white "
					name="price"
					placeholder="Price"
					value={newBeverage.price}
					onChange={(e) =>
						setNewBeverage({
							...newBeverage,
							price: e.target.value,
						})
					}
				/>
				<select
					name="category"
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white"
					value={ newBeverage.category }
					onChange={(e) =>
						setNewBeverage({
							...newBeverage,
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
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white "
					name="image"
					placeholder="Image URL"
					value={newBeverage.image}
					onChange={(e) =>
						setNewBeverage({
							...newBeverage,
							image: e.target.value,
						})
					}
				/>
				<textarea
					name="description"
					placeholder="Description"
					value={newBeverage.description}
					onChange={(e) =>
						setNewBeverage({
							...newBeverage,
							description: e.target.value,
						})
					}
					rows={4}
					className="bg-gray-800 border-gray-500 p-2 focus:border-blue-400 focus:outline-none border-2 rounded-md text-white resize-none"
				/>
				<button
					className="w-full bg-blue-400 p-2 rounded-md font-bold text-gray-900"
					onClick={handleAddBeverage}
				>
					Add Beverage
				</button>
			</div>
		</div>
	)
}

export default AddModal
