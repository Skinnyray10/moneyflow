import { Pressable, StyleSheet, Text, View } from "react-native";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

type Props = {
  month: number; // 0 - 11
  year: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function MonthSelector({
  month,
  year,
  onPrev,
  onNext,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPrev} style={styles.button}>
        <Text style={styles.arrow}>◀</Text>
      </Pressable>

      <Text style={styles.text}>
        {MONTHS[month]} {year}
      </Text>

      <Pressable onPress={onNext} style={styles.button}>
        <Text style={styles.arrow}>▶</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    padding: 8,
  },
  arrow: {
    fontSize: 18,
  },
});
