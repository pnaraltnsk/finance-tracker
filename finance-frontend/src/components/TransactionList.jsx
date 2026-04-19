import {Link } from "react-router-dom";
import { getTransactions, deleteTransaction, updateTransaction } from "../api";
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

const TransactionList = ({ transactions, fetchTransactions }) => {

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4">
      <h2 className="text-2xl font-bold mb-6">Transactions</h2>
      <div className="rounded-lg border shadow-sm bg-card p-4 w-full max-w-4xl">
      <div className="w-full overflow-x-auto">
      <Table >
        <TableCaption>A list of your transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.description}</TableCell>
              <TableCell>€{transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category.name}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to={`/edit/${transaction.id}`}>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => deleteTransaction(transaction.id).then(() => fetchTransactions())}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">€{transactions.reduce((sum, transaction) => transaction.type === "income" ? sum - transaction.amount : sum + transaction.amount, 0).toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </div>
      </div>
    </div>
  );

};
export default TransactionList;

