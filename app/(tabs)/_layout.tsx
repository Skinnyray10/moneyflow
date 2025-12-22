import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Inicio" }}
      />
      <Tabs.Screen
        name="add"
        options={{ title: "Agregar" }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: "Historial" }}
      />
    </Tabs>
  );
}
