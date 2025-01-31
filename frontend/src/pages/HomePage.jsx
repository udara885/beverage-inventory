import { useEffect, useState } from "react"
import { useBeverageStore } from "../store/beverage"
import BeverageCard from "../components/BeverageCard"
import OrdersTable from "../components/OrdersTable"
import { useOrderStore } from "../store/order"

const HomePage = ({
	isAdmin,
	setIsAddOpen,
	setIsUpdateOpen,
	setId,
	cartItems,
	setCartItems,
	setIsDetailOpen,
	setOrderId,
	setIsOrderDetailOpen,
	setIsOrderUpdateOpen,
	view,
}) => {
	const { getBeverages, beverages } = useBeverageStore()
	const { getOrders, orders } = useOrderStore()
	const [menuCategory, setMenuCategory] = useState("All")
	const [orderCategory, setOrderCategory] = useState("All")

	const menuCategories = ["All", "Coffee", "Shakes", "Tea", "Bubble Tea"]
	const orderCategories = ["All", "Pending", "Completed", "Cancelled"]

	const categoryOrders = orders.filter((order) =>
		orderCategory === "All"
			? order
			: order.status === orderCategory.toLowerCase()
	)

	useEffect(() => {
		getBeverages()
		getOrders()
	}, [getBeverages, getOrders])

	return (
		<div className="max-w-screen-xl mx-auto">
			<div className="flex flex-col gap-8">
				<div className="grid grid-cols-2 gap-x-5 sm:grid-cols-5 sm:gap-x-10">
					{view === "menu"
						? menuCategories.map((category, index) => (
								<h1
									className="text-xl sm:text-2xl font-bold cursor-pointer mt-5 bg-blue-400 rounded-full py-1 w-full text-center hover:bg-blue-600 focus:bg-blue-500"
									onClick={() => setMenuCategory(category)}
									key={index}
								>
									{category}
								</h1>
						  ))
						: isAdmin && view === "orders" &&
						  orderCategories.map((category, index) => (
								<h1
									className="text-xl sm:text-2xl font-bold cursor-pointer mt-5 bg-blue-400 rounded-full py-1 w-full text-center hover:bg-blue-600 focus:bg-blue-500"
									onClick={() => setOrderCategory(category)}
									key={index}
								>
									{category}
								</h1>
						  ))}
				</div>
				{view === "menu" && menuCategory && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
						{beverages
							.filter(
								(beverage) => menuCategory === "All" ? beverage : beverage.category === menuCategory
							)
							.map((beverage) => (
								<BeverageCard
									key={beverage._id}
									beverage={beverage}
									isAdmin={isAdmin}
									setIsUpdateOpen={setIsUpdateOpen}
									setId={setId}
									cartItems={cartItems}
									setCartItems={setCartItems}
									setIsDetailOpen={setIsDetailOpen}
								/>
							))}
					</div>
				)}
				{view === "menu" && beverages.length === 0 && (
					<p className="text-xl text-center font-bold text-gray-500">
						No beverages found 😥.{" "}
						{isAdmin && (
							<span
								className="text-blue-500 hover:underline cursor-pointer"
								onClick={() => setIsAddOpen(true)}
							>
								Add a Beverage
							</span>
						)}
					</p>
				)}
				{isAdmin && view === "orders" && (
					<OrdersTable
						orders={categoryOrders}
						setOrderId={setOrderId}
						setIsOrderDetailOpen={setIsOrderDetailOpen}
						setIsOrderUpdateOpen={setIsOrderUpdateOpen}
					/>
				)}
				{isAdmin && view === "orders" && orders.length === 0 && (
					<p className="text-xl text-center font-bold text-gray-500">
						No orders found 😥.{" "}
					</p>
				)}
			</div>
		</div>
	)
}

export default HomePage
