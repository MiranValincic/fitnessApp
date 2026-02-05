import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function GoalsSection() {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#333",
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Goals
      </Text>

      <Card style={{ marginBottom: 12, backgroundColor: "#fff", elevation: 1 }}>
        <Card.Content style={{ paddingVertical: 14, paddingHorizontal: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <MaterialCommunityIcons name="sleep" size={24} color="#8B6B5F" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: "#999", fontWeight: "600" }}>Sleep goal</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 2 }}>Normal (6-7 hours)</Text>
              <Text style={{ fontSize: 11, color: "#ccc", marginTop: 2 }}>
                Let&apos;s aim for 7 hours to feel your best. You almost there!
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 12, backgroundColor: "#fff", elevation: 1 }}>
        <Card.Content style={{ paddingVertical: 14, paddingHorizontal: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <MaterialCommunityIcons name="water" size={24} color="#7BA3B5" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: "#999", fontWeight: "600" }}>Hydration goal</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 2 }}>2.5L</Text>
              <Text style={{ fontSize: 11, color: "#ccc", marginTop: 2 }}>Aim to drink daily!</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={{ backgroundColor: "#fff", elevation: 1 }}>
        <Card.Content style={{ paddingVertical: 14, paddingHorizontal: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <MaterialCommunityIcons name="heart" size={24} color="#FF6B6B" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: "#999", fontWeight: "600" }}>Your goal</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 2 }}>Stay fit</Text>
              <Text style={{ fontSize: 11, color: "#ccc", marginTop: 2 }}>
                Keep your body active, balanced, and full of energy. Stay fit!
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
