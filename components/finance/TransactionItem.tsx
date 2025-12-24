import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../../src/models/Transaction";

export default function TransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const isIncome = transaction.type === "income";

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.category}>
          {transaction.category}
        </Text>
        {transaction.note ? (
          <Text style={styles.note}>
            {transaction.note}
          </Text>
        ) : null}
      </View>

      <Text
        style={[
          styles.amount,
          { color: isIncome ? "green" : "red" },
        ]}
      >
        {isIncome ? "+" : "-"}${transaction.amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
  },
  note: {
    color: "#666",
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
