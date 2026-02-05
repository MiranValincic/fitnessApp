import { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";
import { Card, SegmentedButtons, TextInput } from "react-native-paper";

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
          <SegmentedButtons
            value={activityLevel || ""}
            onValueChange={setActivityLevel}
            buttons={[
              { value: "Sedentary", label: "Sed" },
              { value: "Lightly Active", label: "Light" },
              { value: "Moderately Active", label: "Mod" },
              { value: "Very Active", label: "Very" },
              { value: "Extremely Active", label: "Ext" },
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
            Age
          </Text>
          <TextInput
            label="Years"
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
            value={weight !== null ? weight.toString() : ""}
            onChangeText={(text) => setWeight(text ? parseInt(text) : null)}
            keyboardType="numeric"
            mode="outlined"
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
