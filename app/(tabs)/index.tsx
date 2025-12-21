import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
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
  const summary = categories.map((cat) => {
  const total = expenses
    .filter((e) => e.category === cat)
    .reduce((sum, e) => sum + Number(e.amount), 0);

  return { category: cat, total };
});


  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const addExpense = () => {
    if (!amount) return;

    setExpenses((prev) => [
      ...prev,
      { amount, category },
    ]);

    setAmount("");
  };

  useEffect(() => {
    AsyncStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    const loadExpenses = async () => {
      const data = await AsyncStorage.getItem("expenses");
      if (data) setExpenses(JSON.parse(data));
    };

    loadExpenses();
  }, []);

  return (
    <ThemedView style={{ padding: 20, flex: 1 }}>
      <ThemedText type="title" style={{ marginBottom: 10 }}>
        MoneyFlow 💸
      </ThemedText>

      <TextInput
        placeholder="Cantidad"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          borderWidth: 1,
          borderColor: textColor,
          backgroundColor: backgroundColor,
          color: textColor,
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
        placeholderTextColor={textColor}
      />

      <ThemedText style={{ marginBottom: 5 }}>Categoría</ThemedText>

      <ThemedView style={{ flexDirection: "row", marginBottom: 10 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={{
              padding: 10,
              marginRight: 5,
              borderRadius: 6,
              backgroundColor: category === cat ? tintColor : backgroundColor,
              borderWidth: 1,
              borderColor: textColor,
            }}
          >
            <ThemedText 
  style={{
    fontWeight: category === cat ? "600" : "400",
    color: category === cat ? backgroundColor : textColor,
  }}
>
  {cat}
            </ThemedText>

          </TouchableOpacity>
        ))}
      </ThemedView>

      <TouchableOpacity
        onPress={addExpense}
        style={{
          backgroundColor: tintColor,
          padding: 10,
          borderRadius: 6,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <ThemedText style={{ color: backgroundColor, fontWeight: '600' }}>
          Agregar gasto
        </ThemedText>
      </TouchableOpacity>
<ThemedText type="subtitle" style={{ marginTop: 20 }}>
  Resumen
</ThemedText>

{summary.map((item) => (
  <ThemedView key={item.category} style={{ marginTop: 8 }}>
    <ThemedText>{item.category}</ThemedText>

    <ThemedView
      style={{
        height: 10,
        width: item.total,
        backgroundColor: tintColor,
        borderRadius: 4,
        marginTop: 4,
      }}
    />
  </ThemedView>
))}
      <FlatList
        data={expenses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setExpenses((prev) => prev.filter((_, i) => i !== index));
            }}
          >
            <ThemedText style={{ marginTop: 10, fontSize: 18 }}>
              ${item.amount} - {item.category}
            </ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}
