import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../lib/auth-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();

  const segments = useSegments();
  useEffect(() => {
    if (isLoadingUser) {
      return;
    }

    const inAuthGroup = segments[0] === "auth";
    const isPublicRoute = inAuthGroup || segments[0] === "Terms";

    if (!user && !isPublicRoute) {
      router.replace("/auth");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, segments, isLoadingUser, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <RouteGuard>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="Terms" options={{ headerShown: false }} />
                <Stack.Screen
                  name="VideoPlayer"
                  options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: "#78A481" },
                    headerTitleAlign: "center",
                    headerTintColor: "#fff",
                  }}
                />
              </Stack>
            </RouteGuard>
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
