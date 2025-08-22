import { Stack, useRouter, useSegments } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/bricolage-grotesque";
import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
  Geist_800ExtraBold,
} from "@expo-google-fonts/geist";
import { useEffect } from "react";
import "./globals.css";

function useProtectedRoute(isAuth: boolean) {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (!isAuth && !inAuthGroup) {
      router.replace("/auth");
    } else if (isAuth && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [isAuth, segments]);
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // ✅ Load fonts properly
  const [loaded] = useFonts({
    BricolageGrotesque_400Regular,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
    Geist_400Regular,
    Geist_700Bold,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_800ExtraBold,

    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Replace this with your actual auth logic
  const isAuth = true;

  // Use the protected route hook
  useProtectedRoute(isAuth);
  if (!loaded) {
    return null; // Or show a splash/loading screen
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
