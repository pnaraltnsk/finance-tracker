import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

export const getCategories = () => api.get('/categories')
export const createCategory = (category) => api.post('/categories', category)
export const updateCategory = (id, category) => api.put(`/categories/${id}`, category)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

export const getTransactions = () => api.get('/transactions')
export const createTransaction = (transaction) => api.post('/transactions', transaction)
export const updateTransaction = (id, transaction) => api.put(`/transactions/${id}`, transaction)
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`)