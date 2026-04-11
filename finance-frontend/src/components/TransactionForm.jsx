import { useEffect, useState } from "react";
import { createTransaction, getCategories } from "../api";
import { useNavigate } from "react-router-dom";
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
import { set } from "date-fns";


const TransactionForm = ({ fetchTransactions }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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
      navigate("/")

    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center ">
    <h1 className="text-2xl font-bold mb-4">Add New Transaction</h1>
    <form className="w-full max-w-md" onSubmit={handleSubmit}>
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
          <FieldLabel>Amount:</FieldLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </Field>
        
        <Field>
          <FieldLabel>Date:</FieldLabel>
           <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {date ? date.toLocaleDateString() : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
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
        <Select value={String(category)} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category">
              {category ? categories.find(cat => cat.id === category)?.name : "Select a category"}
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
        <Button type="submit">Add Transaction</Button>
      </div>
    </FieldGroup>
  </form>
  </div>
  );
};

export default TransactionForm;