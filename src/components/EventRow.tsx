
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';

type Props = {
  title: string;
  date: string;
  place: string;
  seats: number;
  saved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export function EventRow({
  title,
  date,
  place,
  seats,
  saved,
  onPress,
  onToggleSaved,
}: Props) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>
              {saved ? 'Unsave' : 'Save'}
            </Text>
          </Pressable>
        )}
      >
        <Pressable
          style={({ pressed }) => [
            styles.eventCard,
            pressed && styles.pressedCard,
          ]}
          onPress={onPress}
          onLongPress={onToggleSaved}
          delayLongPress={500}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.eventTitle}>{title}</Text>

            {saved && (
              <Animated.Text
                entering={ZoomIn}
                style={styles.saved}
              >
                ★ Saved
              </Animated.Text>
            )}
          </View>

          <Text style={styles.eventInfo}>Date: {date}</Text>
          <Text style={styles.eventInfo}>Place: {place}</Text>
          <Text style={styles.eventInfo}>Seats: {seats}</Text>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
  action: {
    minHeight: 44,
    minWidth: 88,
    backgroundColor: '#2450D8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
