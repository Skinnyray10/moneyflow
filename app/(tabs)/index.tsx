import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState<string[]>([]);

  const addExpense = () => {
    if (!amount) return;
    setExpenses([...expenses, `$${amount}`]);
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

      <Button title="Agregar gasto" onPress={addExpense} />

      <FlatList
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 10, fontSize: 18 }}>
            {item}
          </Text>
        )}
      />
    </View>
  );
}
