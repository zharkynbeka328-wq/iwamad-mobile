import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { events } from '../../data/events';

export default function EventsScreen() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return events.filter((event) =>
      `${event.title} ${event.place} ${event.date}`
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  function saveEvent(id: number) {
    setSavedIds((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Campus Events</Text>
      <Text style={styles.subtitle}>
        Find an event and tap to see details.
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search events..."
        value={search}
        onChangeText={setSearch}
        clearButtonMode="while-editing"
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No events found.</Text>
        }
        renderItem={({ item }) => {
          const isSaved = savedIds.includes(item.id);

          return (
            <Pressable
              style={({ pressed }) => [
                styles.eventCard,
                pressed && styles.pressedCard,
              ]}
              onPress={() =>
                router.push({
                  pathname: '/events/[id]',
                  params: { id: String(item.id) },
                })
              }
              onLongPress={() => saveEvent(item.id)}
              delayLongPress={500}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                {isSaved && <Text style={styles.saved}>★ Saved</Text>}
              </View>

              <Text style={styles.eventInfo}>Date: {item.date}</Text>
              <Text style={styles.eventInfo}>Place: {item.place}</Text>
              <Text style={styles.eventInfo}>Seats: {item.seats}</Text>

              <Text style={styles.hint}>
                Tap for details · Hold to save
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#252B38',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#626B7A',
    marginBottom: 16,
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9DCE2',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
    gap: 12,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9DCE2',
    padding: 16,
  },
  pressedCard: {
    backgroundColor: '#E8EDFF',
    borderColor: '#2450D8',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 10,
  },
  eventTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#252B38',
  },
  saved: {
    color: '#2450D8',
    fontWeight: 'bold',
  },
  eventInfo: {
    color: '#444C5A',
    fontSize: 14,
    marginBottom: 4,
  },
  hint: {
    color: '#2450D8',
    fontSize: 12,
    marginTop: 10,
  },
  empty: {
    color: '#626B7A',
    textAlign: 'center',
    marginTop: 30,
  },
});
