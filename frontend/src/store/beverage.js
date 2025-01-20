import { create } from "zustand"

export const useBeverageStore = create( ( set ) => ( {
  beverages: [],
  setBeverages: ( beverages ) => set( { beverages } ),
  addBeverage: async ( newBeverage ) =>
  {
    if(!newBeverage.name || !newBeverage.price || !newBeverage.image)
    {
      return {success: false, message: "Please fill out all fields"}
    }
    const res = await fetch( "/api/add-beverage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( newBeverage ),
    } )
    const data = await res.json()
    set( ( state ) => ( { beverages: [ ...state.beverages, data.data ] } ) )
    return {success: true, message: "Beverage added"}
  },
  getBeverages: async () =>
  {
    const res = await fetch( "/api/beverages" )
    const data = await res.json()
    set( { beverages: data.data } )
  },
  deleteBeverage: async ( id ) =>
  {
    const res = await fetch( `/api/delete-beverage/${id}`, {
      method: "DELETE",
    } )
    const data = await res.json()
    if ( !data.success ) return { success: false, message: data.message }
    set( ( state ) => ( { beverages: state.beverages.filter( ( beverage ) => beverage._id !== id ) } ) )
    return { success: true, message: data.message }
  },
  updateBeverage: async ( id, updatedBeverage ) =>
  {
    const res = await fetch( `/api/update-beverage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( updatedBeverage ),
    } )
    const data = await res.json()
    if ( !data.success ) return { success: false, message: data.message }
    set( ( state ) => ( {
      beverages: state.beverages.map( ( beverage ) =>
        beverage._id === id ? data.data : beverage
      ),
    } ) )
    return { success: true, message: "Beverage updated" }
  }
}))