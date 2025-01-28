import HomePage from "./HomePage"

const AdminPage = ({
	isAdmin,
	setIsAddOpen,
	setIsUpdateOpen,
	setIsDetailOpen,
	setId,
	setOrderId,
	setIsOrderDetailOpen,
}) => {
	return (
		<HomePage
			isAdmin={isAdmin}
			setIsAddOpen={setIsAddOpen}
			setIsUpdateOpen={setIsUpdateOpen}
			setIsDetailOpen={setIsDetailOpen}
			setId={setId}
			setOrderId={setOrderId}
			setIsOrderDetailOpen={setIsOrderDetailOpen}
		/>
	)
}

export default AdminPage
