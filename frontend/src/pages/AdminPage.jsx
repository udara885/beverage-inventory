import HomePage from "./HomePage"

const AdminPage = ({ isAdmin, setIsAddOpen, setIsUpdateOpen, setIsDetailOpen, setId }) => {
	return (
		<HomePage
			isAdmin={isAdmin}
			setIsAddOpen={setIsAddOpen}
      setIsUpdateOpen={ setIsUpdateOpen }
      setIsDetailOpen={ setIsDetailOpen }
			setId={setId}
		/>
	)
}

export default AdminPage
