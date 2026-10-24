
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>

      <Text style={styles.name}>Zharkynbek Akmaral Tolenbekkyzy</Text>

      <Pressable
        style={styles.button}
        onPress={() => setLikes((currentLikes) => currentLikes + 1)}
      >
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      <Text style={styles.likes}>Likes: {likes}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2450D8',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  likes: {
    fontSize: 18,
  },
});
