import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";

// Keep splash visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
    "DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Bold": require("../assets/fonts/DMSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, backgroundColor: "#1A0A2E" }} />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#1A0A2E" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#1A0A2E" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="prediction"
          options={{
            headerShown: true,
            headerTitle: "30-Day Prediction",
            headerStyle: { backgroundColor: "#1A0A2E" },
            headerTintColor: "#FFFFFF",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="plan"
          options={{
            headerShown: true,
            headerTitle: "Workout Plan",
            headerStyle: { backgroundColor: "#1A0A2E" },
            headerTintColor: "#FFFFFF",
            presentation: "modal",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
