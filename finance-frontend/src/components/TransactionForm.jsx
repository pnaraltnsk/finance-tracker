import { useEffect, useState } from "react";
import { getTransactionById, updateTransaction, createTransaction, getCategories } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover,
  PopoverContent,
  PopoverTrigger } from "@/components/ui/popover"



const TransactionForm = ({ fetchTransactions }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const { id } = useParams()
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
    if(id){
      const fetchTransaction = async () => {
        try {
          const res = await getTransactionById(id);
          const transaction = res.data;
          setAmount(transaction.amount);
          setDescription(transaction.description);
          setType(transaction.type);
          setCategory(String(transaction.category.id));
          setDate(new Date (transaction.date));
        } catch (error) {
          console.error("Error fetching transaction:", error);
        }
      }
      fetchTransaction(id);
    }

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(id){
        await updateTransaction(id, { amount, description, date, type, category: { id: Number(category) } });
        fetchTransactions();
        navigate("/")
      }
      else{
        await createTransaction({ amount, description, date, type, category: { id: Number(category) } });
        fetchTransactions();
        navigate("/")
      }

    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  return (
    <div className=" flex flex-col min-h-screen items-center justify-center px-4">
    <h1 className="text-2xl font-bold mb-6"> { id ? "Update Transaction" : "Add New Transaction"}</h1>
    <form className="w-full max-w-lg p-6 rounded-lg border shadow-sm bg-card" onSubmit={handleSubmit}>
    <FieldGroup>
      <Field>
        <FieldLabel>Description:</FieldLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Amount: *</FieldLabel>
          <Input
            type="number"
            value={amount}
            required
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </Field>
        
        <Field>
          <FieldLabel>Date:</FieldLabel>
           <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className= "w-full justify-center" >
                {date ? date.toLocaleDateString() : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={
                  (selected) => {
                    setDate(selected)
                    setOpen(false)
                  }
                }
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
      <Field>
        <FieldLabel>Type:</FieldLabel>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel>Category</FieldLabel>
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category">
              {category 
                ? categories.find(cat => String(cat.id) === category)?.name 
                : "Select a category"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      </div>
      <div className="grid grid-cols-2 gap-4" >
        <Button variant="outline" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit">{id ? "Update Transaction" : "Add Transaction"}</Button>
      </div>
    </FieldGroup>
  </form>
  </div>
  );
};

export default TransactionForm;