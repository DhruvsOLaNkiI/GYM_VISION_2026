import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { EXERCISES } from "@/constants/exercises";

export default function CameraScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <Text
          style={{
            fontFamily: "BebasNeue",
            fontSize: 32,
            color: Colors.textPrimary,
            letterSpacing: 1,
          }}
        >
          Exercise Tracking
        </Text>
        <Text
          style={{
            fontFamily: "DMSans-Regular",
            fontSize: 14,
            color: Colors.textSecondary,
            marginTop: 4,
          }}
        >
          Select an exercise to start tracking with AI
        </Text>
      </View>

      {/* Camera preview placeholder */}
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          height: 300,
          borderRadius: 24,
          backgroundColor: Colors.card,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: Colors.cardBorder,
          borderStyle: "dashed",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: Colors.bgLight,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Ionicons name="camera" size={36} color={Colors.accent} />
        </View>
        <Text
          style={{
            fontFamily: "DMSans-Bold",
            fontSize: 18,
            color: Colors.textPrimary,
          }}
        >
          Camera Preview
        </Text>
        <Text
          style={{
            fontFamily: "DMSans-Regular",
            fontSize: 13,
            color: Colors.textMuted,
            marginTop: 6,
            textAlign: "center",
            paddingHorizontal: 40,
          }}
        >
          Coming in Phase 3 — Pose detection & rep counting
        </Text>
      </View>

      {/* Exercise cards */}
      <ScrollView
        style={{ flex: 1, marginTop: 24 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontFamily: "BebasNeue",
            fontSize: 22,
            color: Colors.textPrimary,
            letterSpacing: 1,
            marginBottom: 12,
          }}
        >
          Available Exercises
        </Text>
        {EXERCISES.map((exercise) => (
          <Pressable
            key={exercise.id}
            style={{
              backgroundColor: Colors.card,
              borderRadius: 16,
              padding: 16,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: Colors.bgLight,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="fitness-center" size={24} color={Colors.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "DMSans-Bold",
                  fontSize: 16,
                  color: Colors.textPrimary,
                }}
              >
                {exercise.name}
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans-Regular",
                  fontSize: 12,
                  color: Colors.textSecondary,
                  marginTop: 2,
                }}
              >
                {exercise.targetMuscles.join(" • ")} | MET: {exercise.met}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
