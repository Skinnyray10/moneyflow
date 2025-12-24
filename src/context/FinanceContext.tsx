import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Transaction } from "../models/Transaction";
import {
  loadTransactions,
  saveTransactions,
} from "../storage/financeStorage";

interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  balance: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(
  undefined
);

export function FinanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await loadTransactions();
      setTransactions(stored);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveTransactions(transactions);
    }
  }, [transactions, loading]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const balance = transactions.reduce((total, t) => {
    return t.type === "income"
      ? total + t.amount
      : total - t.amount;
  }, 0);

  if (loading) return null;

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction, balance }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error(
      "useFinance debe usarse dentro de FinanceProvider"
    );
  }
  return context;
}
