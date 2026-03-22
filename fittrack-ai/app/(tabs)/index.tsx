import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/colors";
import { EXERCISE_CATEGORIES } from "@/constants/exercises";
import { useProfile } from "@/hooks/useProfile";

export default function DashboardScreen() {
  const router = useRouter();
  const { profile, metrics } = useProfile();
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
        {/* Header with gradient */}
        <LinearGradient
          colors={[Colors.accent, Colors.bgLight, Colors.bg]}
          style={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          {/* Top row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              {/* Avatar */}
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: Colors.gold,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "DMSans-Bold",
                    fontSize: 20,
                    color: Colors.textDark,
                  }}
                >
                  {firstName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "DMSans-Regular",
                    fontSize: 13,
                    color: Colors.textSecondary,
                  }}
                >
                  {getGreeting()} 👋
                </Text>
                <Text
                  style={{
                    fontFamily: "DMSans-Bold",
                    fontSize: 20,
                    color: Colors.textPrimary,
                  }}
                >
                  {firstName}
                </Text>
              </View>
            </View>
            <Pressable
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: Colors.card,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
            </Pressable>
          </View>

          {/* Health score badge */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              backgroundColor: Colors.overlay,
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <Ionicons name="heart" size={24} color={Colors.danger} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "DMSans-Medium",
                  fontSize: 13,
                  color: Colors.textSecondary,
                }}
              >
                Health Score
              </Text>
              <Text
                style={{
                  fontFamily: "BebasNeue",
                  fontSize: 28,
                  color: Colors.textPrimary,
                  letterSpacing: 1,
                }}
              >
                --%
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "DMSans-Regular",
                fontSize: 12,
                color: Colors.textMuted,
              }}
            >
              Complete profile to calculate
            </Text>
          </View>
        </LinearGradient>

        {/* Choose Your Exercise */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "BebasNeue",
              fontSize: 24,
              color: Colors.textPrimary,
              letterSpacing: 1,
              marginBottom: 14,
            }}
          >
            Choose Your Exercise
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {EXERCISE_CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => router.push("/(tabs)/camera")}
                style={{
                  width: 140,
                  height: 160,
                  borderRadius: 20,
                  backgroundColor: cat.color,
                  padding: 16,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name={cat.icon as any} size={28} color={cat.textColor} />
                </View>
                <Text
                  style={{
                    fontFamily: "DMSans-Bold",
                    fontSize: 16,
                    color: cat.textColor,
                  }}
                >
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Today's Stats */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Text
            style={{
              fontFamily: "BebasNeue",
              fontSize: 24,
              color: Colors.textPrimary,
              letterSpacing: 1,
              marginBottom: 14,
            }}
          >
            Today's Progress
          </Text>

          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 20,
              padding: 20,
            }}
          >
            {/* Calorie summary row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 16,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "DMSans-Regular",
                    fontSize: 12,
                    color: Colors.textSecondary,
                    marginBottom: 4,
                  }}
                >
                  Calories Burned
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="flame" size={18} color={Colors.gold} />
                  <Text
                    style={{
                      fontFamily: "BebasNeue",
                      fontSize: 32,
                      color: Colors.textPrimary,
                    }}
                  >
                    0
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "DMSans-Regular",
                    fontSize: 11,
                    color: Colors.textMuted,
                  }}
                >
                  kcal
                </Text>
              </View>

              <View
                style={{
                  width: 1,
                  backgroundColor: Colors.cardBorder,
                }}
              />

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "DMSans-Regular",
                    fontSize: 12,
                    color: Colors.textSecondary,
                    marginBottom: 4,
                  }}
                >
                  Workouts
                </Text>
                <Text
                  style={{
                    fontFamily: "BebasNeue",
                    fontSize: 32,
                    color: Colors.textPrimary,
                  }}
                >
                  0
                </Text>
                <Text
                  style={{
                    fontFamily: "DMSans-Regular",
                    fontSize: 11,
                    color: Colors.textMuted,
                  }}
                >
                  sessions
                </Text>
              </View>

              <View
                style={{
                  width: 1,
                  backgroundColor: Colors.cardBorder,
                }}
              />

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "DMSans-Regular",
                    fontSize: 12,
                    color: Colors.textSecondary,
                    marginBottom: 4,
                  }}
                >
                  Active Time
                </Text>
                <Text
                  style={{
                    fontFamily: "BebasNeue",
                    fontSize: 32,
                    color: Colors.textPrimary,
                  }}
                >
                  0
                </Text>
                <Text
                  style={{
                    fontFamily: "DMSans-Regular",
                    fontSize: 11,
                    color: Colors.textMuted,
                  }}
                >
                  minutes
                </Text>
              </View>
            </View>

            {/* Streak */}
            <View
              style={{
                backgroundColor: Colors.bgLight,
                borderRadius: 14,
                padding: 14,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Text style={{ fontSize: 24 }}>🔥</Text>
                <View>
                  <Text
                    style={{
                      fontFamily: "DMSans-Medium",
                      fontSize: 14,
                      color: Colors.textPrimary,
                    }}
                  >
                    Current Streak
                  </Text>
                  <Text
                    style={{
                      fontFamily: "DMSans-Regular",
                      fontSize: 12,
                      color: Colors.textSecondary,
                    }}
                  >
                    Start working out to build a streak!
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontFamily: "BebasNeue",
                  fontSize: 36,
                  color: Colors.gold,
                }}
              >
                0
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Text
            style={{
              fontFamily: "BebasNeue",
              fontSize: 24,
              color: Colors.textPrimary,
              letterSpacing: 1,
              marginBottom: 14,
            }}
          >
            Quick Actions
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={() => router.push("/prediction")}
              style={{
                flex: 1,
                backgroundColor: Colors.card,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: Colors.accent,
              }}
            >
              <Ionicons name="sparkles" size={24} color={Colors.accent} />
              <Text
                style={{
                  fontFamily: "DMSans-Bold",
                  fontSize: 14,
                  color: Colors.textPrimary,
                  marginTop: 8,
                }}
              >
                AI Prediction
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans-Regular",
                  fontSize: 11,
                  color: Colors.textSecondary,
                  marginTop: 2,
                }}
              >
                30-day forecast
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/plan")}
              style={{
                flex: 1,
                backgroundColor: Colors.card,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: Colors.gold,
              }}
            >
              <Ionicons name="calendar" size={24} color={Colors.gold} />
              <Text
                style={{
                  fontFamily: "DMSans-Bold",
                  fontSize: 14,
                  color: Colors.textPrimary,
                  marginTop: 8,
                }}
              >
                Workout Plan
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans-Regular",
                  fontSize: 11,
                  color: Colors.textSecondary,
                  marginTop: 2,
                }}
              >
                AI-generated plan
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
