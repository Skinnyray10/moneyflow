import { Stack } from "expo-router";
import { FinanceProvider } from "../src/context/FinanceContext";

export default function RootLayout() {
  return (
    <FinanceProvider>
      <Stack />
    </FinanceProvider>
  );
}
