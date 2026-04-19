import { useState, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider as Router, RouterProvider } from "react-router-dom";
import TransactionList from './components/transactionList'
import TransactionForm from './components/TransactionForm'
import Home from './components/Home'
import { getTransactions } from './api'
import { ThemeProvider } from './components/ThemeProvider';


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

  const router = createBrowserRouter([
    {path: "/", element: <Home transactions={transactions} fetchTransactions={fetchTransactions} />},
    {path: "/create", element: <TransactionForm fetchTransactions={fetchTransactions}/>},
    //{path: "/summary", element: <Summary />},
    {path: "/edit/:id", element: <TransactionForm fetchTransactions={fetchTransactions} />}
  ]);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App