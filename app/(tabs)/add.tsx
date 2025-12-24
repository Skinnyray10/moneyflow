import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFinance } from "../../src/context/FinanceContext";
import { TransactionType } from "../../src/models/Transaction";
import { categories } from "../../src/utils/categories";

export default function AddScreen() {
  const { addTransaction } = useFinance();

  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [note, setNote] = useState("");

  const save = () => {
    if (!amount) return;

    addTransaction({
      id: Date.now().toString(),
      type,
      amount: Number(amount),
      category,
      note,
      date: new Date().toISOString(),
    });

    setAmount("");
    setNote("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo</Text>
      <Picker selectedValue={type} onValueChange={setType}>
        <Picker.Item label="Gasto" value="expense" />
        <Picker.Item label="Ingreso" value="income" />
      </Picker>

      <Text style={styles.label}>Monto</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
      />

      <Text style={styles.label}>Categoría</Text>
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
      >
        {categories.map((c) => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>

      <Text style={styles.label}>Nota</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Opcional"
      />

      <Button title="Guardar" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
});
