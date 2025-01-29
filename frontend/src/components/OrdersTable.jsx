import { Info, Pencil, Trash } from "lucide-react"
import { format } from "date-fns"
import { useOrderStore } from "../store/order"
import toast from "react-hot-toast"

const OrdersTable = ({
	orders,
	setOrderId,
	setIsOrderDetailOpen,
	setIsOrderUpdateOpen,
}) => {
	const { deleteOrder } = useOrderStore()

	const handleDelete = async (id) => {
		const { success, message } = await deleteOrder(id)
		if (!success) {
			toast.error(message)
		} else {
			toast.success(message)
		}
	}

	return (
		<div className="overflow-x-auto rounded-xl">
			<table className="min-w-full bg-gray-800">
				<thead className="bg-gray-800 whitespace-nowrap text-lg">
					<tr>
						<th className="p-4 text-left font-semibold text-white">
							Order ID
						</th>
						<th className="p-4 text-left font-semibold text-white">
							Total
						</th>
						<th className="p-4 text-left font-semibold text-white">
							Status
						</th>
						<th className="p-4 text-left font-semibold text-white">
							Created At
						</th>
						<th className="p-4 text-left font-semibold text-white">
							Actions
						</th>
					</tr>
				</thead>

				<tbody className="whitespace-nowrap">
					{orders.map((order) => (
						<tr
							className="hover:bg-gray-600 bg-gray-700 cursor-pointer"
							key={order._id}
						>
							<td className="p-4 text-white">{order._id}</td>
							<td className="p-4 text-white">
								LKR {order.total}.00
							</td>
							<td className="p-4">
								<span
									className={`font-semibold ${
										order.status === "pending"
											? "text-yellow-500"
											: "text-green-500"
									}`}
								>
									{order.status}
								</span>
							</td>
							<td className="p-4 text-white">
								{format(
									new Date(order.createdAt),
									"yyyy-MM-dd HH:mm:ss"
								)}
							</td>
							<td className="p-4">
								<button
									className="mr-4 text-gray-500"
									onClick={() => {
										setOrderId(order._id)
										setIsOrderDetailOpen(true)
									}}
								>
									<Info />
								</button>
								<button
									className="mr-4 text-blue-500"
									onClick={() => {
										setOrderId( order._id )
										setIsOrderUpdateOpen( true )
									}}
								>
									<Pencil />
								</button>
								<button
									className="mr-4 text-red-500"
									onClick={() => {
										handleDelete(order._id)
									}}
								>
									<Trash />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default OrdersTable
