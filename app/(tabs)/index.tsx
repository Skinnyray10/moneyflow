import { Text, View } from "react-native";
import { useFinance } from "../../src/context/FinanceContext";

export default function HomeScreen() {
  const { balance } = useFinance();

  return (
    <View>
      <Text>Balance actual:</Text>
      <Text>${balance}</Text>
    </View>
  );
}
