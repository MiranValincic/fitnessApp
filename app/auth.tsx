import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../lib/auth-context";

type Slide = {
  id: string;
  image: any;
  title: string;
  subtitle: string;
};

const SLIDES: Slide[] = [
  {
    id: "1",
    image: require("../assets/images/homeScreen.png"),
    title: "Welcome to Movelle!",
    subtitle:
      "A fitness app made for women like you, busy, bold, and ready to move. No pressure. Just fun, effective workouts designed to fit your life.",
  },
  {
    id: "2",
    image: require("../assets/images/homeScreen.png"),
    title: "Your Personal Trainer",
    subtitle: "Get customized workout plans tailored to your goals, schedule, and fitness level.",
  },
  {
    id: "3",
    image: require("../assets/images/homeScreen.png"),
    title: "Track Your Progress",
    subtitle: "Monitor your workouts, weight, and achievements all in one beautiful app.",
  },
  {
    id: "4",
    image: require("../assets/images/homeScreen.png"),
    title: "Join Our Community",
    subtitle: "Connect with women on their fitness journey and celebrate victories together.",
  },
  {
    id: "5",
    image: require("../assets/images/homeScreen.png"),
    title: "Ready to Start?",
    subtitle: "Let's get moving! Sign in or create your account to begin your transformation.",
  },
];

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const router = useRouter();
  const { singUp, logIn } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError(null);

    if (isSignUp) {
      const error = await singUp(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await logIn(email, password);
      if (error) {
        setError(error);
        return;
      }
      router.replace("/");
    }
  };
  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={["#FDFCFA", "#F4DAC9"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.background}>
        <View style={styles.content}>
          <Image source={require("../assets/images/homeScreen.png")} style={styles.heroImage} />

          <Text variant="headlineMedium" style={styles.title}>
            Welcome to Movelle!
          </Text>
          <Text style={styles.subtitle}>
            A fitness app made for women like you, busy, bold, and ready to move. No pressure. Just fun, effective workouts
            designed to fit your life.
          </Text>

          <View style={styles.dotsRow}>
            <View style={styles.dot} />
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <View style={styles.formCard}>
            <TextInput
              label="Email"
              placeholder="email@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              mode="outlined"
              style={styles.input}
              onChangeText={setEmail}
            />
            <TextInput
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              mode="outlined"
              style={styles.input}
              onChangeText={setPassword}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button mode="contained" onPress={handleAuth} style={styles.button} contentStyle={styles.buttonContent}>
              Continue
            </Button>

            <Text style={styles.switchText}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <Text style={styles.switchLink} onPress={handleSwitchMode}>
                {isSignUp ? "Sign in" : "Sign up"}
              </Text>
            </Text>
          </View>

          <Text style={styles.legalText}>Terms of use · Privacy policy</Text>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  heroImage: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "#6d625b",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 13,
    color: "#8a7f78",
    lineHeight: 18,
    marginBottom: 16,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 18,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d9c6b7",
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#9fb99f",
  },
  formCard: {
    width: "100%",
    backgroundColor: "#f7efe8",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ead9cc",
    marginBottom: 14,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 6,
    borderRadius: 22,
    backgroundColor: "#7da88a",
  },
  buttonContent: {
    paddingVertical: 6,
  },
  errorText: {
    color: "#c05252",
    marginBottom: 8,
    textAlign: "center",
  },
  switchText: {
    textAlign: "center",
    marginTop: 10,
    color: "#8a7f78",
    fontSize: 12,
  },
  switchLink: {
    color: "#7da88a",
    fontWeight: "600",
  },
  legalText: {
    fontSize: 11,
    color: "#b2a59c",
    marginTop: 6,
  },
});
