import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../models/Transaction";

const TRANSACTIONS_KEY = "transactions";

export async function saveTransactions(transactions: Transaction[]) {
  try {
    await AsyncStorage.setItem(
      TRANSACTIONS_KEY,
      JSON.stringify(transactions)
    );
  } catch (error) {
    console.error("Error guardando transacciones", error);
  }
}

export async function loadTransactions(): Promise<Transaction[]> {
  try {
    const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error cargando transacciones", error);
    return [];
  }
}
