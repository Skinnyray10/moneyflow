import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import MonthSelector from "@/components/finance/MonthSelector";
import ExpenseChart from "../../components/finance/ExpenseChart";
import { useFinance } from "../../src/context/FinanceContext";

/* 👇 ESTILOS */
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  balance: {
    fontSize: 32,
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f3f3f3",
  },
});

/* 👇 COMPONENTE */
export default function HomeScreen() {
  const { transactions } = useFinance();

  // 🗓️ estado del mes
  const [month, setMonth] = useState(
    new Date().getMonth()
  );
  const [year] = useState(
    new Date().getFullYear()
  );

  // 📆 transacciones del mes
  const monthlyTransactions = transactions.filter(
    (t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === month &&
        d.getFullYear() === year
      );
    }
  );

  // 💰 cálculos
  const income = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const balance = income - expenses;

  return (
    <View style={styles.container}>
      {/* Selector de mes */}
      <MonthSelector
        month={month}
        year={year}
        onPrev={() =>
          setMonth((m) => (m === 0 ? 11 : m - 1))
        }
        onNext={() =>
          setMonth((m) => (m === 11 ? 0 : m + 1))
        }
      />

      <Text style={styles.title}>Balance</Text>

      <Text
        style={[
          styles.balance,
          { color: balance >= 0 ? "green" : "red" },
        ]}
      >
        ${balance}
      </Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text>Ingresos</Text>
          <Text style={{ color: "green" }}>
            ${income}
          </Text>
        </View>

        <View style={styles.card}>
          <Text>Gastos</Text>
          <Text style={{ color: "red" }}>
            ${expenses}
          </Text>
        </View>
      </View>

      <ExpenseChart
        transactions={monthlyTransactions}
      />
    </View>
  );
}
