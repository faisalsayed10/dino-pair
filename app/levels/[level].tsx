import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { getRandomImages, images } from "@/lib/cards";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (game: string, value: number) => {
  try {
    const prev = await AsyncStorage.getItem(`score-${game}`).then((value) =>
      parseInt(value || "0")
    );

    if (value > prev) {
      await AsyncStorage.setItem(`score-${game}`, value.toString());
    }
  } catch (e) {
    console.error(e);
  }
};

export default function GameScreen() {
  const { level } = useLocalSearchParams();

  const [cards, setCards] = useState<number[]>(
    getRandomImages((8 * parseInt(level as string)) as 8 | 16 | 24)
  );
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    setScore(matchedCards.length / 2);
    storeData(level as string, matchedCards.length / 2);
  }, [matchedCards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (cards[firstCard] === cards[secondCard]) {
        setMatchedCards([...matchedCards, firstCard, secondCard]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      alert("You win!");
    }
  }, [matchedCards]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  const resetGame = () => {
    setCards(getRandomImages(8));
    setFlippedCards([]);
    setMatchedCards([]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedText type="title" style={styles.title}>
          Score: {score}
        </ThemedText>
        <View style={styles.container}>
          {cards.map((image, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => handleCardClick(index)}
                activeOpacity={1}
              >
                {(flippedCards.includes(index) || matchedCards.includes(index)) && (
                  <Image
                    contentFit="cover"
                    source={images[image as keyof typeof images]}
                    style={styles.image}
                  />
                )}
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <ThemedText type="defaultSemiBold">Reset Game</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    paddingTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    paddingTop: 20,
  },
  card: {
    width: 75,
    height: 75,
    margin: 10,
    backgroundColor: "#beb",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
});
