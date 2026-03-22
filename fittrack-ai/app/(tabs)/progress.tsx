import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

const TIME_PERIODS = ["Daily", "Weekly", "Monthly"] as const;

export default function ProgressScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <Text
            style={{
              fontFamily: "BebasNeue",
              fontSize: 32,
              color: Colors.textPrimary,
              letterSpacing: 1,
            }}
          >
            Your Progress
          </Text>
        </View>

        {/* Time period toggle */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginTop: 16,
            backgroundColor: Colors.card,
            borderRadius: 14,
            padding: 4,
          }}
        >
          {TIME_PERIODS.map((period, index) => (
            <Pressable
              key={period}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 12,
                backgroundColor: index === 0 ? Colors.accent : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "DMSans-Medium",
                  fontSize: 14,
                  color: index === 0 ? Colors.textPrimary : Colors.textMuted,
                }}
              >
                {period}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Weight chart placeholder */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans-Bold",
                fontSize: 16,
                color: Colors.textPrimary,
                marginBottom: 4,
              }}
            >
              Weight History
            </Text>
            <Text
              style={{
                fontFamily: "DMSans-Regular",
                fontSize: 12,
                color: Colors.textSecondary,
                marginBottom: 20,
              }}
            >
              Track your weight changes over time
            </Text>

            <View
              style={{
                height: 180,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: Colors.cardBorder,
                borderStyle: "dashed",
                borderRadius: 12,
              }}
            >
              <Ionicons name="trending-up" size={36} color={Colors.accent} />
              <Text
                style={{
                  fontFamily: "DMSans-Medium",
                  fontSize: 14,
                  color: Colors.textMuted,
                  marginTop: 8,
                }}
              >
                Charts coming in Phase 5
              </Text>
            </View>
          </View>
        </View>

        {/* Stats grid */}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 16,
            flexDirection: "row",
            gap: 12,
          }}
        >
          {[
            { label: "Total Workouts", value: "0", icon: "barbell", color: Colors.accent },
            { label: "Total Calories", value: "0", icon: "flame", color: Colors.gold },
          ].map((stat) => (
            <View
              key={stat.label}
              style={{
                flex: 1,
                backgroundColor: Colors.card,
                borderRadius: 16,
                padding: 16,
              }}
            >
              <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              <Text
                style={{
                  fontFamily: "BebasNeue",
                  fontSize: 32,
                  color: Colors.textPrimary,
                  marginTop: 8,
                }}
              >
                {stat.value}
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans-Regular",
                  fontSize: 12,
                  color: Colors.textSecondary,
                }}
              >
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Personal Records */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "BebasNeue",
              fontSize: 22,
              color: Colors.textPrimary,
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            Personal Records
          </Text>
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Ionicons name="trophy" size={36} color={Colors.gold} />
            <Text
              style={{
                fontFamily: "DMSans-Medium",
                fontSize: 14,
                color: Colors.textPrimary,
                marginTop: 12,
              }}
            >
              No records yet
            </Text>
            <Text
              style={{
                fontFamily: "DMSans-Regular",
                fontSize: 12,
                color: Colors.textMuted,
                marginTop: 4,
              }}
            >
              Complete workouts to set personal records!
            </Text>
          </View>
        </View>

        {/* Streak Calendar */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "BebasNeue",
              fontSize: 22,
              color: Colors.textPrimary,
              letterSpacing: 1,
              marginBottom: 12,
            }}
          >
            Streak Calendar
          </Text>
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Ionicons name="calendar" size={36} color={Colors.green} />
            <Text
              style={{
                fontFamily: "DMSans-Medium",
                fontSize: 14,
                color: Colors.textPrimary,
                marginTop: 12,
              }}
            >
              Activity Calendar Coming in Phase 5
            </Text>
            <Text
              style={{
                fontFamily: "DMSans-Regular",
                fontSize: 12,
                color: Colors.textMuted,
                marginTop: 4,
                textAlign: "center",
              }}
            >
              GitHub-style contribution grid showing your active workout days
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
