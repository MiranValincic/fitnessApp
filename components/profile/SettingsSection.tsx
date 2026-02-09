import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, SegmentedButtons, TextInput } from "react-native-paper";

type SettingsSectionProps = {
  gender: string | null;
  setGender: Dispatch<SetStateAction<string | null>>;
  activityLevel: string | null;
  setActivityLevel: Dispatch<SetStateAction<string | null>>;
  age: number | null;
  setAge: Dispatch<SetStateAction<number | null>>;
  weight: number | null;
  setWeight: Dispatch<SetStateAction<number | null>>;
  height: number | null;
  setHeight: Dispatch<SetStateAction<number | null>>;
};

const ACTIVITY_LEVELS = [
  { value: "Sedentary", label: "Sedentary" },
  { value: "Lightly Active", label: "Lightly Active" },
  { value: "Moderately Active", label: "Moderately Active" },
  { value: "Very Active", label: "Very Active" },
  { value: "Extremely Active", label: "Extremely Active" },
];

export default function SettingsSection({
  gender,
  setGender,
  activityLevel,
  setActivityLevel,
  age,
  setAge,
  weight,
  setWeight,
  height,
  setHeight,
}: SettingsSectionProps) {
  const [weightInput, setWeightInput] = useState(weight !== null ? weight.toString() : "");
  const [isEditingWeight, setIsEditingWeight] = useState(false);

  useEffect(() => {
    if (isEditingWeight) {
      return;
    }
    setWeightInput(weight !== null ? weight.toString() : "");
  }, [weight, isEditingWeight]);

  return (
    <View>
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
        Settings
      </Text>

      <Card style={{ marginBottom: 12, backgroundColor: "#fff", elevation: 1 }}>
        <Card.Content style={{ paddingVertical: 12 }}>
          <Text
            style={{
              fontSize: 12,
              color: "#999",
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Gender
          </Text>
          <SegmentedButtons
            value={gender || ""}
            onValueChange={setGender}
            buttons={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
          />
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 12, backgroundColor: "#fff", elevation: 1 }}>
        <Card.Content style={{ paddingVertical: 12 }}>
          <Text
            style={{
              fontSize: 12,
              color: "#999",
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Activity Level
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activityLevelScroll}>
            {ACTIVITY_LEVELS.map((level) => (
              <Button
                key={level.value}
                mode={activityLevel === level.value ? "contained" : "outlined"}
                onPress={() => setActivityLevel(level.value)}
                style={styles.activityLevelButton}
                labelStyle={styles.activityLevelButtonLabel}
                compact
              >
                {level.label}
              </Button>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 12, backgroundColor: "#fff", elevation: 1 }}>
        <Card.Content style={{ paddingVertical: 12 }}>
          <Text
            style={{
              fontSize: 12,
              color: "#999",
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Age
          </Text>
          <TextInput
            label="Years"
            style={{ backgroundColor: "#fff", color: "#020202" }}
            value={age !== null ? age.toString() : ""}
            onChangeText={(text) => setAge(text ? parseInt(text) : null)}
            keyboardType="numeric"
            mode="outlined"
          />
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 12, backgroundColor: "#fff", elevation: 1 }}>
        <Card.Content style={{ paddingVertical: 12 }}>
          <Text
            style={{
              fontSize: 12,
              color: "#999",
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Weight (kg)
          </Text>
          <TextInput
            label="Kilograms"
            value={weightInput}
            style={{ backgroundColor: "#fff", color: "#020202 !important" }}
            onChangeText={(text) => {
              const normalized = text.replace(",", ".");
              if (normalized === "") {
                setWeightInput("");
                setWeight(null);
                return;
              }
              if (!/^\d*(\.\d{0,2})?$/.test(normalized)) {
                return;
              }
              setWeightInput(normalized);
              const parsed = parseFloat(normalized);
              setWeight(Number.isNaN(parsed) ? null : parsed);
            }}
            keyboardType="decimal-pad"
            mode="outlined"
            onFocus={() => setIsEditingWeight(true)}
            onBlur={() => setIsEditingWeight(false)}
          />
        </Card.Content>
      </Card>

      <Card style={{ marginBottom: 32, backgroundColor: "#fff", elevation: 1 }}>
        <Card.Content style={{ paddingVertical: 12 }}>
          <Text
            style={{
              fontSize: 12,
              color: "#999",
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Height (cm)
          </Text>
          <TextInput
            label="Centimeters"
            style={{ backgroundColor: "#fff", color: "#020202 !important" }}
            value={height !== null ? height.toString() : ""}
            onChangeText={(text) => setHeight(text ? parseInt(text) : null)}
            keyboardType="numeric"
            mode="outlined"
          />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  activityLevelScroll: {
    paddingVertical: 4,
  },
  activityLevelButton: {
    marginRight: 8,
    borderRadius: 999,
    borderColor: "#78A481",
  },
  activityLevelButtonLabel: {
    fontSize: 12,
    textTransform: "none",
  },
});
