import { ScrollView, Text } from "react-native";

export default function Terms() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#faf8f3", padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Terms and Conditions</Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        Welcome to our fitness app! By using our app, you agree to the following terms and conditions:
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        1. Use of the App: You agree to use the app for its intended purpose of tracking your fitness progress and accessing
        workout videos. You will not use the app for any illegal or unauthorized purpose.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        2. User Data: We collect and store your personal information and fitness data to provide you with a personalized
        experience. We will not share your data with third parties without your consent, except as required by law.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        3. Intellectual Property: All content in the app, including workout videos and written materials, is owned by us or
        our licensors and is protected by copyright laws. You may not reproduce or distribute any content without our
        permission.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        4. Limitation of Liability: We are not liable for any damages arising from the use of the app, including but not
        limited to injury from workouts or loss of data.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        5. Changes to Terms: We reserve the right to update these terms and conditions at any time. Your continued use of the
        app after changes indicates your acceptance of the new terms.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        If you have any questions about these terms, please contact us at{" "}
      </Text>
    </ScrollView>
  );
}
