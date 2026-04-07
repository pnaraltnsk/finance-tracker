import { useState, useEffect } from 'react'
import './App.css'
import TransactionList from './components/TransactionList'
import TransactionForm from './components/TransactionForm'
import { getTransactions } from './api'

function App() {
  const [transactions, setTransactions] = useState([]); 

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <TransactionForm fetchTransactions={fetchTransactions} />
      <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
    </div>
  )
}

export default App