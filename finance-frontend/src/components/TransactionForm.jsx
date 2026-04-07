import { useEffect, useState } from "react";
import { createTransaction, getCategories } from "../api";

const TransactionForm = ({ fetchTransactions }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction({ amount, description, date, type, category: { id: category } });
      fetchTransactions();
      setAmount(0);
      setDescription("");
      setDate("");
      setType("income");
      setCategory("");
      

    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (  
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </select>
      </label>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;