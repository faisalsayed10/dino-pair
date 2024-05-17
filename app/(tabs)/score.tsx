import { SafeAreaView, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const getScores = async () => {
  try {
    const score1 = await AsyncStorage.getItem("score-1");
    const score2 = await AsyncStorage.getItem("score-2");
    const score3 = await AsyncStorage.getItem("score-3");

    return [
      { game: "1", score: parseInt(score1 || "0") },
      { game: "2", score: parseInt(score2 || "0") },
      { game: "3", score: parseInt(score3 || "0") },
    ];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default function ScoreScreen() {
  const [scores, setScores] = useState<{ game: string; score: number }[]>([]);

  useEffect(() => {
    getScores().then(setScores);
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedText type="title" style={{ textAlign: "center", paddingTop: 20 }}>
          Your High Scores
        </ThemedText>
        <View>
          {scores.map(({ game, score }) => (
            <ThemedText key={game} type="subtitle" style={{ textAlign: "center", marginTop: 10 }}>
              Level {game}: {score}
            </ThemedText>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
