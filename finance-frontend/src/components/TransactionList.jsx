import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction, updateTransaction } from "../api";

const TransactionList = ({ transactions, fetchTransactions }) => {

  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category.name}</td>
              <td>
                <button onClick={() => deleteTransaction(transaction.id).then(() => fetchTransactions())}>Delete</button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );

};
export default TransactionList;

