import { FlatList, Text, View } from "react-native";
import TransactionItem from "../../components/finance/TransactionItem";
import { useFinance } from "../../src/context/FinanceContext";

export default function HistoryScreen() {
  const { transactions } = useFinance();

  if (transactions.length === 0) {
    return (
      <View>
        <Text>No hay movimientos aún</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TransactionItem transaction={item} />
      )}
    />
  );
}
