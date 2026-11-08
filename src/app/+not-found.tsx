import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page not found</Text>
      <Text style={styles.info}>
        This page does not exist.
      </Text>
      <Link href="/" style={styles.link}>
        Go to Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#252B38',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  info: {
    color: '#626B7A',
    fontSize: 16,
  },
  link: {
    color: '#2450D8',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
  },
});
