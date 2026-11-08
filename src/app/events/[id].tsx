import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { events } from '../../data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.info}>No event with id {id}.</Text>
        <Link href="/events" style={styles.link}>
          Back to events
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>Date: {event.date}</Text>
      <Text style={styles.info}>Place: {event.place}</Text>
      <Text style={styles.info}>Available seats: {event.seats}</Text>

      <Link href="/events" style={styles.link}>
        Back to events
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#252B38',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    color: '#444C5A',
    fontSize: 17,
    marginBottom: 12,
  },
  link: {
    color: '#2450D8',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
  },
});
