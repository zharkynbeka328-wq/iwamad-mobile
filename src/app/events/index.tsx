
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useEvents } from '../../hooks/useEvents';
import { useSavedIds } from '../../hooks/useSavedIds';
import { EventRow } from '../../components/EventRow';

export default function EventsScreen() {
  const [search, setSearch] = useState('');
  const { savedIds, toggleSaved } = useSavedIds();

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = useEvents();

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return (data ?? []).filter((event) =>
      `${event.title} ${event.place} ${event.date}`
        .toLowerCase()
        .includes(query),
    );
  }, [search, data]);

  if (isPending) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.stateText}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.stateText}>{error.message}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={() => refetch()}
        >
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Campus Events</Text>

      <Text style={styles.subtitle}>
        Find an event and tap to see details.
      </Text>

      <Text style={styles.hint}>
        Swipe or long-press an event to save it. Saved: {savedIds.length}
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
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        ListEmptyComponent={
          <Text style={styles.empty}>No events found.</Text>
        }
        renderItem={({ item }) => (
          <EventRow
            title={item.title}
            date={item.date}
            place={item.place}
            seats={item.seats}
            saved={savedIds.includes(item.id)}
            onPress={() =>
              router.push({
                pathname: '/events/[id]',
                params: { id: String(item.id) },
              })
            }
            onToggleSaved={() => toggleSaved(item.id)}
          />
        )}
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
  stateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  stateText: {
    color: '#626B7A',
    fontSize: 14,
  },
  errorTitle: {
    color: '#252B38',
    fontSize: 20,
    fontWeight: 'bold',
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
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#252B38',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#626B7A',
    marginBottom: 10,
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
  hint: {
    color: '#2450D8',
    fontSize: 12,
    marginBottom: 12,
  },
  empty: {
    color: '#626B7A',
    textAlign: 'center',
    marginTop: 30,
  },
});
