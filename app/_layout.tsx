import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../lib/auth-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();

  const segments = useSegments();
  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";
    if (!user && !inAuthGroup) {
      // router.replace("/auth");
    } else if (user && inAuthGroup && !isLoadingUser) {
      // router.replace("/");
    }
  }, [user, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="VideoPlayer"
            options={{
              title: "Video Player",
              headerStyle: { backgroundColor: "#78A481" },
              headerTitleAlign: "center",
              headerTintColor: "#fff",
            }}
          />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
