import { useAuth } from "@/lib/auth-context";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();
  const [steps, setSteps] = useState(0);
  const [pedometerAvailable, setPedometerAvailable] = useState<boolean | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const formatTime = (date: Date | null) => {
    if (!date) {
      return "never";
    }

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;
    let isMounted = true;

    const startStepTracking = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        setPedometerAvailable(isAvailable);
        if (!isAvailable) {
          console.log("Pedometer is not available");
          return;
        }

        if (Platform.OS === "android") {
          subscription = Pedometer.watchStepCount((result) => {
            if (isMounted) {
              setSteps(result.steps);
              setLastUpdated(new Date());
            }
          });
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todaySteps = await Pedometer.getStepCountAsync(today, new Date());
        if (isMounted) {
          setSteps(todaySteps.steps);
          setLastUpdated(new Date());
        }

        subscription = Pedometer.watchStepCount((result) => {
          if (isMounted) {
            setSteps(result.steps);
            setLastUpdated(new Date());
          }
        });
      } catch (error) {
        setPedometerAvailable(false);
        console.error("Error getting step count:", error);
      }
    };

    startStepTracking();

    return () => {
      isMounted = false;
      subscription?.remove();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <LinearGradient colors={["#2d5f4f", "#1e3d33"]} style={styles.header}>
        <Button onPress={signOut} style={{ alignSelf: "flex-end", marginBottom: 40 }} compact>
          <MaterialIcons name="logout" size={24} color="white" />
        </Button>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>4-Week Fitness Program</Text>
            <Text style={styles.headerDay}>Day 1</Text>
            <Text style={styles.headerDate}>in progress</Text>
          </View>
          <Avatar.Image size={50} source={{ uri: "https://i.pravatar.cc/150?img=1" }} />
        </View>
      </LinearGradient>

      {/* Metrics Cards */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Today Activity Steps</Text>
            </View>
            <Text style={styles.metricValue}>
              {steps} <Ionicons name="walk" size={20} color="#666" />
            </Text>
            <Text style={styles.metricTarget}>Goal: 10000</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Distance</Text>
            </View>
            <Text style={styles.metricValue}>
              0 <Text style={styles.metricUnit}>mi</Text>
            </Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Heart Rate</Text>
            </View>
            <Text style={styles.metricValue}>
              0 <Text style={styles.metricUnit}>bpm</Text>
            </Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Calories</Text>
            </View>
            <Text style={styles.metricValue}>
              0 <Text style={styles.metricUnit}>kcal</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Workout Programs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workout Programs</Text>

        <Card style={styles.programCard}>
          <LinearGradient colors={["#2d5f4f", "#1e3d33"]} style={styles.programGradient}>
            <View style={styles.programContent}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400" }}
                style={styles.programImage}
              />
              <View style={styles.programInfo}>
                <Text style={styles.programDay}>DAY 1</Text>
                <Text style={styles.programTitle}>5 Day HIIT Program</Text>
                <View style={styles.programStats}>
                  <Text style={styles.programStat}>🔥 Intermediate</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Card>
      </View>

      {/* Exercise Cards Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cardio</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exerciseScroll}>
          <Card style={styles.exerciseCard}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300" }}
              style={styles.exerciseImage}
            />
            <View style={styles.exerciseBadge}>
              <Text style={styles.exerciseBadgeText}>Easy</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle}>Squat & Flexion</Text>
              <Text style={styles.exerciseDetails}>15 min • 180 kcal</Text>
            </View>
          </Card>

          <Card style={styles.exerciseCard}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300" }}
              style={styles.exerciseImage}
            />
            <View style={styles.exerciseBadge}>
              <Text style={styles.exerciseBadgeText}>Medium</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle}>Strength Full Body</Text>
              <Text style={styles.exerciseDetails}>20 min • 220 kcal</Text>
            </View>
          </Card>
        </ScrollView>
      </View>

      {/* Strength Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Strength</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exerciseScroll}>
          <Card style={styles.exerciseCard}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300" }}
              style={styles.exerciseImage}
            />
            <View style={styles.exerciseBadge}>
              <Text style={styles.exerciseBadgeText}>Hard</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle}>Upper Body Blast</Text>
              <Text style={styles.exerciseDetails}>25 min • 250 kcal</Text>
            </View>
          </Card>

          <Card style={styles.exerciseCard}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300" }}
              style={styles.exerciseImage}
            />
            <View style={styles.exerciseBadge}>
              <Text style={styles.exerciseBadgeText}>Medium</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle}>Core Crusher</Text>
              <Text style={styles.exerciseDetails}>15 min • 160 kcal</Text>
            </View>
          </Card>
        </ScrollView>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    paddingTop: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerDay: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerDate: {
    color: "#a8d5ba",
    fontSize: 14,
  },
  progressSection: {
    marginTop: 15,
  },
  progressLabel: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  statsRow: {
    marginTop: 15,
  },
  statItem: {
    marginBottom: 10,
  },
  statValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  statUnit: {
    fontSize: 16,
    fontWeight: "normal",
  },
  statLabel: {
    color: "#a8d5ba",
    fontSize: 12,
    marginTop: 2,
  },
  metricsContainer: {
    padding: 15,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metricHeader: {
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  metricUnit: {
    fontSize: 16,
    color: "#666",
  },
  metricTarget: {
    fontSize: 11,
    color: "#999",
  },
  metricStatus: {
    marginTop: 4,
    fontSize: 11,
    color: "#7a7a7a",
  },
  section: {
    padding: 15,
    paddingTop: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  seeAll: {
    color: "#2d5f4f",
    fontSize: 14,
    fontWeight: "600",
  },
  programCard: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3,
  },
  programGradient: {
    borderRadius: 20,
  },
  programContent: {
    flexDirection: "row",
    padding: 20,
  },
  programImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 15,
  },
  programInfo: {
    flex: 1,
    justifyContent: "center",
  },
  programDay: {
    color: "#a8d5ba",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5,
  },
  programTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  programStats: {
    flexDirection: "row",
  },
  programStat: {
    color: "#fff",
    fontSize: 12,
  },
  exerciseScroll: {
    marginHorizontal: -5,
  },
  exerciseCard: {
    width: 160,
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 5,
    backgroundColor: "#fff",
    elevation: 2,
  },
  exerciseImage: {
    width: "100%",
    height: 180,
  },
  exerciseBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#2d5f4f",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  exerciseBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  exerciseInfo: {
    padding: 12,
  },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 12,
    color: "#666",
  },
  bottomPadding: {
    height: 20,
  },
});
