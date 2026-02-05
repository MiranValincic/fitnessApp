import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";

type ProfileHeaderProps = {
  email?: string | null;
};

export default function ProfileHeader({ email }: ProfileHeaderProps) {
  return (
    <View
      style={{
        backgroundColor: "#d4c5b0",
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
            color: "#333",
            marginBottom: 4,
          }}
        >
          Fitness profile
        </Text>
        <Text style={{ fontSize: 13, color: "#666" }}>{email || "Loading..."}</Text>
      </View>

      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "#9aff9a",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Avatar.Image size={50} source={{ uri: "https://i.pravatar.cc/150?img=1" }} />
      </View>
    </View>
  );
}
