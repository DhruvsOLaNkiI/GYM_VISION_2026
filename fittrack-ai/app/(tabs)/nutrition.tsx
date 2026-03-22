import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { useProfile } from "@/hooks/useProfile";

export default function NutritionScreen() {
  const { profile } = useProfile();
  const firstName = profile.name?.split(" ")[0] || "Athlete";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

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
            {getGreeting()}, {firstName}!
          </Text>
          <Text
            style={{
              fontFamily: "DMSans-Regular",
              fontSize: 14,
              color: Colors.textSecondary,
              marginTop: 4,
            }}
          >
            Track your daily nutrition intake
          </Text>
        </View>

        {/* Calorie ring placeholder */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 24,
            backgroundColor: Colors.card,
            borderRadius: 24,
            padding: 30,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 180,
              height: 180,
              borderRadius: 90,
              borderWidth: 12,
              borderColor: Colors.cardBorder,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "BebasNeue",
                fontSize: 42,
                color: Colors.textPrimary,
              }}
            >
              0
            </Text>
            <Text
              style={{
                fontFamily: "DMSans-Regular",
                fontSize: 13,
                color: Colors.textSecondary,
              }}
            >
              Net Kcal
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "DMSans-Medium",
                  fontSize: 13,
                  color: Colors.textSecondary,
                }}
              >
                Eaten
              </Text>
              <Text
                style={{
                  fontFamily: "BebasNeue",
                  fontSize: 28,
                  color: Colors.success,
                }}
              >
                0
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "DMSans-Medium",
                  fontSize: 13,
                  color: Colors.textSecondary,
                }}
              >
                Burned
              </Text>
              <Text
                style={{
                  fontFamily: "BebasNeue",
                  fontSize: 28,
                  color: Colors.gold,
                }}
              >
                0
              </Text>
            </View>
          </View>
        </View>

        {/* Macro bars placeholder */}
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
            Macros
          </Text>

          {[
            { name: "Protein", color: Colors.accent, current: 0, target: 0 },
            { name: "Carbs", color: Colors.gold, current: 0, target: 0 },
            { name: "Fat", color: Colors.danger, current: 0, target: 0 },
          ].map((macro) => (
            <View
              key={macro.name}
              style={{
                backgroundColor: Colors.card,
                borderRadius: 14,
                padding: 14,
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "DMSans-Medium",
                    fontSize: 14,
                    color: Colors.textPrimary,
                  }}
                >
                  {macro.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "DMSans-Regular",
                    fontSize: 13,
                    color: Colors.textSecondary,
                  }}
                >
                  {macro.current} / {macro.target}g
                </Text>
              </View>
              <View
                style={{
                  height: 8,
                  backgroundColor: Colors.bgLight,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "0%",
                    backgroundColor: macro.color,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Coming soon */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            backgroundColor: Colors.card,
            borderRadius: 16,
            padding: 24,
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.cardBorder,
            borderStyle: "dashed",
          }}
        >
          <Ionicons name="add-circle" size={48} color={Colors.accent} />
          <Text
            style={{
              fontFamily: "DMSans-Bold",
              fontSize: 16,
              color: Colors.textPrimary,
              marginTop: 12,
            }}
          >
            AI Meal Analysis Coming in Phase 4
          </Text>
          <Text
            style={{
              fontFamily: "DMSans-Regular",
              fontSize: 13,
              color: Colors.textMuted,
              marginTop: 6,
              textAlign: "center",
            }}
          >
            Type your meals in plain text and get full macro breakdowns powered by Claude AI
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
