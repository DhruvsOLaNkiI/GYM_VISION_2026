import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

export default function PlanScreen() {
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
        <Ionicons name="calendar" size={64} color={Colors.gold} />
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
          Workout Plan
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
          AI-generated 4-week progressive workout plan tailored to your goals.
          Coming in Phase 6.
        </Text>
      </View>
    </SafeAreaView>
  );
}
