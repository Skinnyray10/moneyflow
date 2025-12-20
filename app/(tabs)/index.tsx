import { useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Expense = {
  amount: string;
  category: string;
};

export default function HomeScreen() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Comida");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const categories = ["Comida", "Transporte", "Ocio", "Otros"];

  const addExpense = () => {
    if (!amount) return;

    setExpenses([
      ...expenses,
      { amount, category },
    ]);

    setAmount("");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        MoneyFlow 💸
      </Text>

      <TextInput
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
      />

      <Text style={{ marginBottom: 5 }}>Categoría</Text>

      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={{
              padding: 10,
              marginRight: 5,
              borderRadius: 6,
              backgroundColor:
                category === cat ? "#4CAF50" : "#ddd",
            }}
          >
            <Text style={{ color: "#000" }}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Agregar gasto" onPress={addExpense} />

      <FlatList
        data={expenses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 10, fontSize: 18 }}>
            ${item.amount} - {item.category}
          </Text>
        )}
      />
    </View>
  );
}
