import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "../../components/ThemedText";
import { getRandomImages, images } from "../../lib/cards";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeScore = async (game, value) => {
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

  const [cards, setCards] = useState(getRandomImages(8 * parseInt(level)));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(matchedCards.length / 2);
    storeScore(level, matchedCards.length / 2);
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

  const handleCardClick = (index) => {
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
      <ScrollView style={{ backgroundColor: "#FFB340", height: "100%" }}>
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
                  <Image contentFit="cover" source={images[image]} style={styles.image} />
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
