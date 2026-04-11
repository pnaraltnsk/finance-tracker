import NavBar from './NavBar'
import TransactionList from './transactionList'
const Home = ({ fetchTransactions, transactions }) => {
    return (
        <div>
            <NavBar />
             <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
        </div>
    )
}
 
export default Home;