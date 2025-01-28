import { create } from "zustand"

export const useOrderStore = create((set) => ({
	orders: [],
	setOrders: (orders) => set({ orders }),
	getOrders: async () => {
		const res = await fetch("/api/orders")
		const data = await res.json()
		set({ orders: data.data })
	},
	createOrder: async (newOrder) => {
		if (newOrder.items.length === 0) {
			return { success: false, message: "Please add items to the order" }
		}
		const res = await fetch("/api/create-order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newOrder),
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({ orders: [...state.orders, data.data] }))
		return { success: true, message: "Order created" }
	},
	updateOrder: async (id, updatedOrder) => {
		const res = await fetch(`/api/update-order/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedOrder),
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({
			orders: state.orders.map((order) =>
				order._id === id ? data.data : order
			),
		}))
		return { success: true, message: "Order updated" }
	},
	deleteOrder: async (id) => {
		const res = await fetch(`/api/delete-order/${id}`, {
			method: "DELETE",
		})
		const data = await res.json()
		if (!data.success) return { success: false, message: data.message }
		set((state) => ({
			orders: state.orders.filter((order) => order._id !== id),
		}))
		return { success: true, message: data.message }
	},
}))
