import { Text, View } from "react-native";
import { Card } from "react-native-paper";

type SummaryMetricsProps = {
  age: number | null;
  bmi: string | null;
  tdee: number | null;
  bmr: number | null;
};

export default function SummaryMetrics({ age, bmi, tdee, bmr }: SummaryMetricsProps) {
  const bmiValue = bmi ? parseFloat(bmi) : null;

  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <Card
          style={{
            flex: 1,
            backgroundColor: "#fff",
            elevation: 1,
          }}
        >
          <Card.Content style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
            <Text
              style={{
                fontSize: 10,
                color: "#999",
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Age
            </Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>{age ?? "-"}</Text>
            <Text style={{ fontSize: 9, color: "#ccc", marginTop: 4 }}>years</Text>
          </Card.Content>
        </Card>

        <Card
          style={{
            flex: 1,
            backgroundColor: "#fff",
            elevation: 1,
          }}
        >
          <Card.Content style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
            <Text
              style={{
                fontSize: 10,
                color: "#999",
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              BMI
            </Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>{bmi ?? "-"}</Text>
            <Text style={{ fontSize: 9, color: "#ccc", marginTop: 4 }}>
              {bmiValue !== null ? (bmiValue < 25 ? "Healthy" : "Monitor") : ""}
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
        }}
      >
        <Card
          style={{
            flex: 1,
            backgroundColor: "#fff",
            elevation: 1,
          }}
        >
          <Card.Content style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
            <Text
              style={{
                fontSize: 10,
                color: "#999",
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Kcal/day
            </Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>{tdee !== null ? Math.round(tdee) : "-"}</Text>
            <Text style={{ fontSize: 9, color: "#ccc", marginTop: 4 }}> calories</Text>
          </Card.Content>
        </Card>

        <Card
          style={{
            flex: 1,
            backgroundColor: "#fff",
            elevation: 1,
          }}
        >
          <Card.Content style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
            <Text
              style={{
                fontSize: 10,
                color: "#999",
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              BMR
            </Text>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>{bmr !== null ? Math.round(bmr) : "-"}</Text>
            <Text style={{ fontSize: 9, color: "#ccc", marginTop: 4 }}>daily</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
