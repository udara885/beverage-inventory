import { useBeverageStore } from "../store/beverage"

const DetailModal = ( { setIsDetailOpen, id } ) =>
{
  const beverage = useBeverageStore((state) =>
      state.beverages.find((beverage) => beverage._id === id)
  )	

	return (
		<div className="flex items-center bg-black justify-center inset-0 fixed bg-opacity-50">
			<div className="max-w-sm w-full flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
				<img
					src={beverage.image}
					alt={beverage.name}
					className="rounded-md"
				/>
				<div className="flex items-center justify-between">
					<h1 className="text-2xl text-white font-bold">
						{beverage.name}
          </h1>
          <h2 className="text-lg text-gray-200 font-bold">
            LKR { beverage.price }.00
          </h2>
        </div>
        <p className="text-gray-300 text-justify mb-2">{beverage.description}</p>
				<button
					className="w-full bg-gray-900 p-2 rounded-md font-bold text-blue-400 border-2 border-blue-400"
					onClick={() => setIsDetailOpen(false)}
				>
					Close
				</button>
			</div>
		</div>
	)
}

export default DetailModal
