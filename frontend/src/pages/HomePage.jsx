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
}) => {
	const { getBeverages, beverages } = useBeverageStore()
	const { getOrders, orders } = useOrderStore()
	const [view, setView] = useState("menu")

	useEffect(() => {
		getBeverages()
		getOrders()
	}, [getBeverages, getOrders])

	return (
		<div className="max-w-screen-xl mx-auto">
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-center gap-10">
					<h1
						className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center ${
							isAdmin
								? "cursor-pointer border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500"
								: ""
						}`}
						onClick={() => setView("menu")}
					>
						Menu
					</h1>
					{isAdmin && (
						<h1
							className={` text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center ${
								isAdmin
									? "cursor-pointer border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500"
									: ""
							}`}
							onClick={() => setView("orders")}
						>
							Orders
						</h1>
					)}
				</div>
				{view === "menu" && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
						{beverages.map((beverage) => (
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
				{view === "orders" && (
					<OrdersTable
						orders={orders}
						setOrderId={setOrderId}
						setIsOrderDetailOpen={setIsOrderDetailOpen}
						setIsOrderUpdateOpen={setIsOrderUpdateOpen}
					/>
				)}
				{view === "orders" && orders.length === 0 && (
					<p className="text-xl text-center font-bold text-gray-500">
						No orders found 😥.{" "}
					</p>
				)}
			</div>
		</div>
	)
}

export default HomePage
