import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../../src/models/Transaction";
import { expensesByCategory } from "../../src/utils/stats";

export default function ExpenseChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const data = expensesByCategory(transactions);

  if (data.length === 0) {
    return <Text>No hay gastos aún</Text>;
  }

  const max = Math.max(...data.map(d => d.amount));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos por categoría</Text>

      {data.map(item => (
        <View key={item.category} style={styles.row}>
          <Text style={styles.label}>{item.category}</Text>

          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                { width: `${(item.amount / max) * 100}%` },
              ]}
            />
          </View>

          <Text style={styles.amount}>${item.amount}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
  },
  barContainer: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 4,
  },
  bar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  amount: {
    fontSize: 12,
    color: "#555",
  },
});
