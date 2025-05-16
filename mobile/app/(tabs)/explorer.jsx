import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import COLORS from "../../constants/colors";

const Explorer = () => {
  const handlePress = (label: string) => {
    Alert.alert(`${label}`, `You selected ${label}`);
  };

  const AnimatedTouchable = Animatable.createAnimatableComponent(TouchableOpacity);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Animatable.Text animation="fadeInDown" duration={800} style={styles.title}>
        Explore
      </Animatable.Text>

      {/* Row 1 */}
      <View style={styles.row}>
        <AnimatedTouchable
          animation="zoomIn"
          delay={100}
          duration={600}
          style={[styles.box, styles.large, styles.blue]}
          onPress={() => handlePress("Top Rated")}
        >
          <Ionicons name="star" size={28} color="#fff" />
          <Text style={styles.label}>Top Rated</Text>
        </AnimatedTouchable>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <AnimatedTouchable
          animation="fadeInUp"
          delay={200}
          duration={600}
          style={[styles.box, styles.medium, styles.orange]}
          onPress={() => handlePress("Genres")}
        >
          <FontAwesome5 name="th-list" size={22} color="#fff" />
          <Text style={styles.label}>Genres</Text>
        </AnimatedTouchable>

        <AnimatedTouchable
          animation="fadeInUp"
          delay={300}
          duration={600}
          style={[styles.box, styles.medium, styles.dark]}
          onPress={() => handlePress("For You")}
        >
          <Ionicons name="sparkles" size={22} color="#fff" />
          <Text style={styles.label}>For You</Text>
        </AnimatedTouchable>
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <View style={styles.column}>
          <AnimatedTouchable
            animation="fadeInLeft"
            delay={400}
            duration={600}
            style={[styles.box, styles.small, styles.dark]}
            onPress={() => handlePress("Bookmarks")}
          >
            <Ionicons name="bookmark" size={20} color="#fff" />
            <Text style={styles.label}>Bookmarks</Text>
          </AnimatedTouchable>

          <AnimatedTouchable
            animation="fadeInLeft"
            delay={500}
            duration={600}
            style={[styles.box, styles.small, styles.orange]}
            onPress={() => handlePress("Recently Added")}
          >
            <Ionicons name="time" size={20} color="#fff" />
            <Text style={styles.label}>Recent</Text>
          </AnimatedTouchable>
        </View>

        <AnimatedTouchable
          animation="fadeInRight"
          delay={600}
          duration={600}
          style={[styles.box, styles.large, styles.blue]}
          onPress={() => handlePress("Popular Authors")}
        >
          <Ionicons name="person" size={28} color="#fff" />
          <Text style={styles.label}>Authors</Text>
        </AnimatedTouchable>
      </View>

      {/* Row 4 */}
      <View style={styles.row}>
        <AnimatedTouchable
          animation="fadeInUp"
          delay={700}
          duration={600}
          style={[styles.box, styles.medium, styles.dark]}
          onPress={() => handlePress("Book Clubs")}
        >
          <Ionicons name="people-outline" size={22} color="#fff" />
          <Text style={styles.label}>Book Clubs</Text>
        </AnimatedTouchable>

        <AnimatedTouchable
          animation="fadeInUp"
          delay={800}
          duration={600}
          style={[styles.box, styles.medium, styles.blue]}
          onPress={() => handlePress("Reading Stats")}
        >
          <Ionicons name="bar-chart-outline" size={22} color="#fff" />
          <Text style={styles.label}>Stats</Text>
        </AnimatedTouchable>
      </View>

      {/* Row 5 */}
      <View style={styles.row}>
        <AnimatedTouchable
          animation="fadeInLeft"
          delay={900}
          duration={600}
          style={[styles.box, styles.medium, styles.orange]}
          onPress={() => handlePress("Daily Quote")}
        >
          <FontAwesome5 name="quote-right" size={20} color="#fff" />
          <Text style={styles.label}>Quote</Text>
        </AnimatedTouchable>

        <AnimatedTouchable
          animation="fadeInRight"
          delay={1000}
          duration={600}
          style={[styles.box, styles.medium, styles.dark]}
          onPress={() => handlePress("Discover New")}
        >
          <Ionicons name="earth-outline" size={22} color="#fff" />
          <Text style={styles.label}>Discover</Text>
        </AnimatedTouchable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  column: {
    flex: 1,
    justifyContent: "space-between",
  },
  box: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  small: {
    height: 80,
  },
  medium: {
    height: 120,
  },
  large: {
    height: 160,
    flex: 2,
  },
  blue: {
    backgroundColor: "#1E90FF",
  },
  orange: {
    backgroundColor: "#FF8C00",
  },
  dark: {
    backgroundColor: "#333",
  },
  label: {
    marginTop: 10,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Explorer;
