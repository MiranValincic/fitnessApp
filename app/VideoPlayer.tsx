import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";

interface VideoPlayerRoute {
  videoUrl: string;
  title: string;
}

export default function VideoPlayer() {
  const route = useRoute();
  const { videoUrl, title } = (route.params as VideoPlayerRoute) || {
    videoUrl: "",
    title: "Video Player",
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          controls={true}
          resizeMode="contain"
          paused={!isPlaying}
          onLoad={(data) => setDuration(data.duration)}
          onProgress={(data) => setCurrentTime(data.currentTime)}
          onPlaybackStateChanged={(state) => setIsPlaying(state.isPlaying)}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.duration}>Duration: {formatTime(duration)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  videoContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
});
