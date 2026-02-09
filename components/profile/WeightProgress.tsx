import { ScrollView, Text, View } from "react-native";
import { Card, TextInput } from "react-native-paper";

export type WeightEntry = {
  weight: number;
  date: string;
};

type ChartData = {
  entries: WeightEntry[];
  min: number;
  range: number;
};

type WeightProgressProps = {
  weightHistory: WeightEntry[];
  chartData: ChartData;
  editingStartWeight: boolean;
  startWeightInput: string;
  onStartWeightInputChange: (value: string) => void;
  onEditStartWeight: () => void;
  onSaveStartWeight: () => void;
  onCancelEdit: () => void;
};

export default function WeightProgress({
  weightHistory,
  chartData,
  editingStartWeight,
  startWeightInput,
  onStartWeightInputChange,
  onEditStartWeight,
  onSaveStartWeight,
  onCancelEdit,
}: WeightProgressProps) {
  if (weightHistory.length === 0) {
    return null;
  }

  const currentWeight = weightHistory[weightHistory.length - 1].weight;
  const startingWeight = weightHistory[0].weight;
  const progress = currentWeight - startingWeight;

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
        Weight Progress
      </Text>

      <Card style={{ backgroundColor: "#fff", elevation: 1 }}>
        <Card.Content style={{ paddingVertical: 14, paddingHorizontal: 12 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 12, color: "#999", fontWeight: "600", marginBottom: 8 }}>Weight Trend</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={70}
              decelerationRate="fast"
              contentContainerStyle={{ paddingRight: 12 }}
            >
              <View style={{ flexDirection: "row", gap: 10, paddingVertical: 4 }}>
                {chartData.entries.map((entry, index) => {
                  const barHeight = 40 + ((entry.weight - chartData.min) / chartData.range) * 80;
                  return (
                    <View key={`${entry.date}-${index}`} style={{ width: 60, alignItems: "center" }}>
                      <Text style={{ fontSize: 10, color: "#78a481", marginBottom: 6 }}>{entry.weight.toFixed(2)}</Text>
                      <View
                        style={{
                          height: 120,
                          width: 18,
                          borderRadius: 9,
                          backgroundColor: "#f4efe8",
                          justifyContent: "flex-end",
                          overflow: "hidden",
                        }}
                      >
                        <View
                          style={{
                            height: barHeight,
                            width: "100%",
                            backgroundColor: "#78a481",
                            borderRadius: 9,
                          }}
                        />
                      </View>
                      <Text style={{ fontSize: 9, color: "#999", marginTop: 6 }}>
                        {new Date(entry.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: "#f0f0f0",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: "#999", fontWeight: "600" }}>Starting Weight</Text>
              {editingStartWeight ? (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <TextInput
                    value={startWeightInput}
                    onChangeText={onStartWeightInputChange}
                    keyboardType="decimal-pad"
                    style={{ flex: 1, minHeight: 30 }}
                    mode="outlined"
                  />
                  <Text
                    onPress={onSaveStartWeight}
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#4CAF50",
                      paddingHorizontal: 8,
                    }}
                  >
                    Save
                  </Text>
                  <Text
                    onPress={onCancelEdit}
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#999",
                      paddingHorizontal: 8,
                    }}
                  >
                    Cancel
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#333" }}>{startingWeight.toFixed(2)} kg</Text>
                  <Text
                    onPress={onEditStartWeight}
                    style={{
                      fontSize: 11,
                      color: "#4CAF50",
                      fontWeight: "600",
                    }}
                  >
                    Edit
                  </Text>
                </View>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: "#999", fontWeight: "600" }}>Current Weight</Text>
              <Text style={{ fontSize: 14, fontWeight: "bold", color: "#333", marginTop: 4 }}>
                {currentWeight.toFixed(2)} kg
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: "#999", fontWeight: "600" }}>Progress</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: progress < 0 ? "#4CAF50" : "#FF6B6B",
                  marginTop: 4,
                }}
              >
                {progress < 0 ? "" : "+"}
                {progress.toFixed(2)} kg
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
