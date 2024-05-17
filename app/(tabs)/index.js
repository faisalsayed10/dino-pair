import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import { HelloWave } from "../../components/HelloWave";
import { ThemedText } from "../../components/ThemedText";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Welcome, Dino!</ThemedText>
          <HelloWave />
        </View>
        <FlatList
          data={[
            { key: "Level 1", value: "1" },
            { key: "Level 2", value: "2" },
            { key: "Level 3", value: "3" },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/levels/${item.value}`)}>
              <View style={styles.listItem}>
                <ThemedText type="default">{item.key}</ThemedText>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 8,
  },
  listItem: {
    gap: 8,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
