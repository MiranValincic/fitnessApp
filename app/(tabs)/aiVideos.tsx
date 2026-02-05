import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Video from "react-native-video";

import { connectToDatabase } from "../../lib/appwrite";

export default function AiVideos() {
  const [documents, setDocuments] = useState<VideoDoc[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchResponse = async () => {
      try {
        const response = await connectToDatabase();
        if (isMounted) {
          const docs = Array.isArray(response?.documents) ? response.documents : [];
          setDocuments(docs as VideoDoc[]);
          setErrorMessage(null);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          const message = error instanceof Error ? error.message : String(error);
          setErrorMessage(message);
          setIsLoading(false);
        }
      }
    };

    fetchResponse();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
      }}
    >
      <Text style={{ marginBottom: 12, fontSize: 18, fontWeight: "600" }}>AI Assistant Response</Text>
      {isLoading ? (
        <Text>Loading videos...</Text>
      ) : errorMessage ? (
        <Text style={{ color: "#b00020" }}>Error: {errorMessage}</Text>
      ) : documents.length === 0 ? (
        <Text>No videos found.</Text>
      ) : (
        <View style={{ gap: 12 }}>
          {documents.map((doc) => (
            <View
              key={doc.$id}
              style={{
                padding: 12,
                borderRadius: 10,
                backgroundColor: "#f2f2f2",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>{doc.title}</Text>
              <Text style={{ color: "#4a4a4a", marginBottom: 8 }}>{doc.description}</Text>
              <Pressable
                onPress={() => setPlayingId((current) => (current === doc.$id ? null : doc.$id))}
                style={{ marginBottom: 10 }}
              >
                <Video
                  source={{ uri: doc.url }}
                  paused={playingId !== doc.$id}
                  resizeMode="cover"
                  style={{ height: 200, borderRadius: 8, backgroundColor: "#111" }}
                />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

type VideoDoc = {
  $id: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  uploadDate: string;
  viewCount: number;
  likeCount: number;
};

const formatDuration = (totalSeconds: number) => {
  if (!Number.isFinite(totalSeconds)) {
    return "-";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const pad = (value: number) => String(value).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }

  return `${minutes}:${pad(seconds)}`;
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString();
};
