import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";

// ============================================
// TIPOS DE DATOS
// ============================================

// Define la estructura de un gasto
type Expense = {
  id: string;      // Identificador único del gasto
  amount: string;  // Cantidad gastada (como string para el input)
  category: string; // Categoría del gasto
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function HomeScreen() {
  // ============================================
  // ESTADOS
  // ============================================
  
  // Estado para la cantidad que el usuario está escribiendo
  const [amount, setAmount] = useState("");
  
  // Estado para la categoría seleccionada (por defecto "Comida")
  const [category, setCategory] = useState("Comida");
  
  // Estado que almacena todos los gastos registrados
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // ============================================
  // CONSTANTES
  // ============================================
  
  // Lista de categorías disponibles para clasificar los gastos
  const categories = ["Comida", "Transporte", "Ocio", "Otros"];

  // ============================================
  // COLORES DEL TEMA
  // ============================================
  
  // Obtiene los colores del tema actual (claro/oscuro)
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  // ============================================
  // CÁLCULOS Y DATOS DERIVADOS
  // ============================================
  
  // Calcula el TOTAL GENERAL de todos los gastos
  // Suma todos los amounts de todos los expenses
  const grandTotal = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  // Genera un resumen por categoría con totales y porcentajes
  const summary = categories.map((cat) => {
    // Filtra los gastos de esta categoría y suma sus montos
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);

    // Calcula el porcentaje que representa esta categoría del total
    // Si grandTotal es 0, el porcentaje también es 0 (evita división por cero)
    const percentage = grandTotal > 0 ? (total / grandTotal) * 100 : 0;

    // Retorna un objeto con los datos calculados
    return {
      category: cat,
      total: total,
      percentageString: percentage.toFixed(1) // Con un decimal (ej: "33.5")
    };
  });

  // ============================================
  // FUNCIONES
  // ============================================
  
  /**
   * Agrega un nuevo gasto a la lista
   * Solo se ejecuta si hay una cantidad ingresada
   */
  const addExpense = () => {
    // Validación: si no hay cantidad, no hace nada
    if (!amount) return;

    // Agrega el nuevo gasto al array de expenses
    setExpenses((prev) => [
      ...prev, // Mantiene los gastos anteriores
      { 
        id: Date.now().toString(), // ID único basado en timestamp
        amount, 
        category 
      },
    ]);

    // Limpia el campo de cantidad después de agregar
    setAmount("");
  };

  /**
   * Elimina un gasto de la lista por su índice
   */
  const removeExpense = (index: number) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  // ============================================
  // EFECTOS (PERSISTENCIA DE DATOS)
  // ============================================
  
  /**
   * EFECTO 1: Guarda los gastos en AsyncStorage cada vez que cambian
   * Esto permite que los datos persistan aunque se cierre la app
   */
  useEffect(() => {
    AsyncStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]); // Se ejecuta cada vez que expenses cambia

  /**
   * EFECTO 2: Carga los gastos guardados cuando se monta el componente
   * Solo se ejecuta una vez al inicio (array de dependencias vacío)
   */
  useEffect(() => {
    const loadExpenses = async () => {
      const data = await AsyncStorage.getItem("expenses");
      if (data) setExpenses(JSON.parse(data));
    };

    loadExpenses();
  }, []); // Array vacío = solo se ejecuta al montar el componente

  // ============================================
  // RENDERIZADO
  // ============================================
  
  return (
    <ThemedView style={{ padding: 20, flex: 1 }}>
      {/* ============================================ */}
      {/* TÍTULO DE LA APP */}
      {/* ============================================ */}
      <ThemedText type="title" style={{ marginBottom: 10 }}>
        MoneyFlow 💸
      </ThemedText>

      {/* ============================================ */}
      {/* FORMULARIO: CAMPO DE CANTIDAD */}
      {/* ============================================ */}
      <TextInput
        placeholder="Cantidad"
        keyboardType="numeric" // Muestra teclado numérico
        value={amount}
        onChangeText={setAmount} // Actualiza el estado al escribir
        style={{
          borderWidth: 1,
          borderColor: textColor,
          backgroundColor: backgroundColor,
          color: textColor,
          padding: 10,
          marginBottom: 10,
          borderRadius: 6,
        }}
        placeholderTextColor={textColor}
      />

      {/* ============================================ */}
      {/* FORMULARIO: SELECTOR DE CATEGORÍAS */}
      {/* ============================================ */}
      <ThemedText style={{ marginBottom: 5 }}>Categoría</ThemedText>

      {/* Contenedor de botones de categorías */}
      <ThemedView style={{ flexDirection: "row", marginBottom: 10 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)} // Cambia la categoría seleccionada
            style={{
              padding: 10,
              marginRight: 5,
              borderRadius: 6,
              // Si es la categoría seleccionada, usa tintColor, sino backgroundColor
              backgroundColor: category === cat ? tintColor : backgroundColor,
              borderWidth: 1,
              borderColor: textColor,
            }}
          >
            <ThemedText 
              style={{
                fontWeight: category === cat ? "600" : "400",
                // Invierte los colores si está seleccionado para mejor contraste
                color: category === cat ? backgroundColor : textColor,
              }}
            >
              {cat}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* ============================================ */}
      {/* BOTÓN PARA AGREGAR GASTO */}
      {/* ============================================ */}
      <TouchableOpacity
        onPress={addExpense}
        style={{
          backgroundColor: tintColor,
          padding: 10,
          borderRadius: 6,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <ThemedText style={{ color: backgroundColor, fontWeight: '600' }}>
          Agregar gasto
        </ThemedText>
      </TouchableOpacity>

      {/* ============================================ */}
      {/* RESUMEN POR CATEGORÍAS */}
      {/* ============================================ */}
      <ThemedText type="subtitle" style={{ marginTop: 20, marginBottom: 10 }}>
        Resumen (Total: ${grandTotal})
      </ThemedText>

      {/* Mapea cada categoría del resumen */}
      {summary.map((item) => (
        <ThemedView key={item.category} style={{ marginBottom: 15 }}>
          {/* Fila con nombre de categoría, porcentaje y total */}
          <ThemedView 
            style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              marginBottom: 5 
            }}
          >
            {/* Nombre de la categoría */}
            <ThemedText style={{ fontWeight: '500' }}>
              {item.category}
            </ThemedText>
            
            {/* Porcentaje y monto total de la categoría */}
            <ThemedText style={{ color: tintColor, fontWeight: '600' }}>
              {item.percentageString}% (${item.total})
            </ThemedText>
          </ThemedView>

          {/* Barra de progreso visual */}
          <ThemedView
            style={{
              height: 14,
              width: '100%',
              backgroundColor: backgroundColor,
              borderColor: textColor,
              borderWidth: 0.5,
              borderRadius: 7,
              overflow: 'hidden', // Evita que la barra interna se salga
            }}
          >
            {/* Barra de progreso rellena según el porcentaje */}
            <ThemedView           
              style={{
                height: '100%',
                width: `${item.percentageString}%` as any,
                backgroundColor: tintColor,
              }}
            />
          </ThemedView>
        </ThemedView>
      ))}

      {/* ============================================ */}
      {/* LISTA DE GASTOS REGISTRADOS */}
      {/* ============================================ */}
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id} // Usa el ID único como key
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => removeExpense(index)} // Elimina el gasto al tocarlo
          >
            <ThemedText style={{ marginTop: 10, fontSize: 18 }}>
              ${item.amount} - {item.category}
            </ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}