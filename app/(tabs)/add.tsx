import { Button, View } from "react-native";
import { useFinance } from "../../src/context/FinanceContext";
import { Transaction } from "../../src/models/Transaction";

export default function AddScreen() {
  const { addTransaction } = useFinance();

  const addTest = () => {
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: "expense",
      amount: 100,
      category: "Comida",
      date: new Date().toISOString(),
    };

    addTransaction(transaction);
  };

  return (
    <View>
      <Button title="Agregar gasto de prueba" onPress={addTest} />
    </View>
  );
}
