import { useEffect } from "react"
import { useBeverageStore } from "../store/beverage"
import BeverageCard from "../components/BeverageCard"

const HomePage = ({
	isAdmin,
	setIsAddOpen,
	setIsUpdateOpen,
	setId,
	cartItems,
	setCartItems,
	setIsDetailOpen
}) => {
	const { getBeverages, beverages } = useBeverageStore()

	useEffect(() => {
		getBeverages()
	}, [getBeverages])

	return (
		<div className="max-w-screen-xl mx-auto">
			<div className="flex flex-col gap-8">
				<h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center">
					Menu
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
					{beverages.map((beverage) => (
						<BeverageCard
							key={beverage._id}
							beverage={beverage}
							isAdmin={isAdmin}
							setIsUpdateOpen={setIsUpdateOpen}
							setId={setId}
							cartItems={cartItems}
							setCartItems={ setCartItems }
							setIsDetailOpen={setIsDetailOpen}
						/>
					))}
				</div>
				{beverages.length === 0 && (
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
			</div>
		</div>
	)
}

export default HomePage
