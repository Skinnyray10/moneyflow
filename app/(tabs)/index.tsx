import { StyleSheet, Text, View } from "react-native";
import ExpenseChart from "../../components/finance/ExpenseChart";
import { useFinance } from "../../src/context/FinanceContext";

/* 👇 ESTILOS PRIMERO */
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

/* 👇 COMPONENTE DESPUÉS */
export default function HomeScreen() {
  const { balance, transactions } = useFinance();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <View style={styles.container}>
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

      <ExpenseChart transactions={transactions} />
    </View>
  );
}
