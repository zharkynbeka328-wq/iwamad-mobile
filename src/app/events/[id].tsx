
import { Link, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEvents } from '../../hooks/useEvents';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.info}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Could not load events</Text>
        <Text style={styles.info}>{error.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data?.find((item) => item.id === Number(id));

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
    gap: 12,
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
  retryButton: {
    backgroundColor: '#2450D8',
    minHeight: 44,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
