import HomePage from './HomePage'

const AdminPage = ( { isAdmin, setIsUpdateOpen, setId } ) =>
{  
  return (
    <HomePage isAdmin={ isAdmin } setIsUpdateOpen={setIsUpdateOpen} setId={setId} />
  )
}

export default AdminPage