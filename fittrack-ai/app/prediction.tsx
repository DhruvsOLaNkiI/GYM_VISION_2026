import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function PredictionScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 40,
        }}
      >
        <Ionicons name="sparkles" size={64} color={Colors.accent} />
        <Text
          style={{
            fontFamily: "BebasNeue",
            fontSize: 28,
            color: Colors.textPrimary,
            textAlign: "center",
            marginTop: 20,
            letterSpacing: 1,
          }}
        >
          30-Day Prediction
        </Text>
        <Text
          style={{
            fontFamily: "DMSans-Regular",
            fontSize: 15,
            color: Colors.textSecondary,
            textAlign: "center",
            marginTop: 10,
            lineHeight: 22,
          }}
        >
          AI-powered body transformation forecast based on your profile and workout plans.
          Coming in Phase 6.
        </Text>
      </View>
    </SafeAreaView>
  );
}
