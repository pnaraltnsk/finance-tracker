import NavBar from './NavBar'
import TransactionList from './transactionList'
import Summary from './Summary'

const Home = ({ fetchTransactions, transactions }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-col items-center px-4 pt-4 pb-8 gap-4 w-full max-w-7xl mx-auto">
                {/* Summary cards on top */}
                <Summary showChartsOnly={false} />

                {/* Table and charts side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full items-stretch">
                    <div className="lg:col-span-2 h-full">
                        <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
                    </div>
                    <div className="lg:col-span-1 h-full">
                        <Summary showChartsOnly={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default Home;