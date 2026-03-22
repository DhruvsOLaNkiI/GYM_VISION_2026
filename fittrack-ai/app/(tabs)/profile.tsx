import { useState, useEffect } from "react";

import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Switch,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getSecureItem, setSecureItem, deleteSecureItem } from "@/lib/storage/secure";


import { Colors } from "@/constants/colors";
import { useProfile } from "@/hooks/useProfile";
import {
  ACTIVITY_LABELS,
  GOAL_LABELS,
  type ActivityLevel,
  type Gender,
  type Goal,
  kgToLbs,
  lbsToKg,
  cmToFeetInches,
  feetInchesToCm,
} from "@/lib/health/metrics";
import { AIProvider } from "@/types/profile";


const API_KEY_STORAGE = "fittrack_anthropic_key";

export default function ProfileScreen() {
  const { profile, updateProfile, metrics, isLoading } = useProfile();
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [showBodyMeasurements, setShowBodyMeasurements] = useState(false);

  const firstName = profile.name?.split(" ")[0] || "";
  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  // Load API key check on mount & whenever provider changes
  useEffect(() => {
    getSecureItem(`${API_KEY_STORAGE}_${profile.aiProvider}`).then((key) => {
      setApiKey(key || "");
      setApiKeySaved(!!key);
    });
  }, [profile.aiProvider]);




  const saveApiKey = async () => {
    if (!apiKey.trim()) return;
    try {
      await setSecureItem(`${API_KEY_STORAGE}_${profile.aiProvider}`, apiKey.trim());
      setApiKeySaved(true);
      Alert.alert("Saved", `${profile.aiProvider.charAt(0).toUpperCase() + profile.aiProvider.slice(1)} key stored securely`);
    } catch (error) {
      Alert.alert("Error", "Failed to save API key");
    }
  };

  const clearApiKey = async () => {
    try {
      await deleteSecureItem(`${API_KEY_STORAGE}_${profile.aiProvider}`);
      setApiKey("");
      setApiKeySaved(false);
      Alert.alert("Cleared", "API key removed from device");
    } catch (error) {
      Alert.alert("Error", "Failed to clear API key");
    }
  };



  const SectionHeader = ({ title, icon }: { title: string; icon: string }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 28,
        marginBottom: 14,
      }}
    >
      <Ionicons name={icon as any} size={20} color={Colors.accent} />
      <Text
        style={{
          fontFamily: "BebasNeue",
          fontSize: 22,
          color: Colors.textPrimary,
          letterSpacing: 1,
        }}
      >
        {title}
      </Text>
    </View>
  );

  const InputField = ({
    label,
    value,
    onChangeText,
    keyboardType = "default",
    placeholder,
    suffix,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: "default" | "numeric" | "email-address";
    placeholder?: string;
    suffix?: string;
  }) => (
    <View style={{ marginBottom: 12 }}>
      <Text
        style={{
          fontFamily: "DMSans-Medium",
          fontSize: 13,
          color: Colors.textSecondary,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.card,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: Colors.cardBorder,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          style={{
            flex: 1,
            fontFamily: "DMSans-Regular",
            fontSize: 16,
            color: Colors.textPrimary,
            paddingHorizontal: 14,
            paddingVertical: Platform.OS === "ios" ? 14 : 10,
          }}
        />
        {suffix && (
          <Text
            style={{
              fontFamily: "DMSans-Regular",
              fontSize: 14,
              color: Colors.textMuted,
              paddingRight: 14,
            }}
          >
            {suffix}
          </Text>
        )}
      </View>
    </View>
  );

  const OptionSelector = ({
    label,
    options,
    selected,
    onSelect,
  }: {
    label: string;
    options: { value: string; label: string }[];
    selected: string;
    onSelect: (value: string) => void;
  }) => (
    <View style={{ marginBottom: 12 }}>
      <Text
        style={{
          fontFamily: "DMSans-Medium",
          fontSize: 13,
          color: Colors.textSecondary,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <View style={{ gap: 6 }}>
        {options.map((opt) => (
          <Pressable
            key={opt.value}
            onPress={() => onSelect(opt.value)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: selected === opt.value ? Colors.accent + "20" : Colors.card,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: selected === opt.value ? Colors.accent : Colors.cardBorder,
              paddingHorizontal: 14,
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selected === opt.value ? Colors.accent : Colors.textMuted,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selected === opt.value && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: Colors.accent,
                  }}
                />
              )}
            </View>
            <Text
              style={{
                fontFamily: "DMSans-Regular",
                fontSize: 14,
                color: selected === opt.value ? Colors.textPrimary : Colors.textSecondary,
                flex: 1,
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const MetricCard = ({
    label,
    value,
    unit,
    icon,
    color,
    description,
  }: {
    label: string;
    value: string | number;
    unit: string;
    icon: string;
    color: string;
    description?: string;
  }) => (
    <View
      style={{
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 16,
        flex: 1,
        minWidth: "45%",
      }}
    >
      <Ionicons name={icon as any} size={22} color={color} />
      <Text
        style={{
          fontFamily: "BebasNeue",
          fontSize: 30,
          color: Colors.textPrimary,
          marginTop: 8,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "DMSans-Medium",
          fontSize: 12,
          color: Colors.textSecondary,
        }}
      >
        {unit}
      </Text>
      <Text
        style={{
          fontFamily: "DMSans-Regular",
          fontSize: 11,
          color: Colors.textMuted,
          marginTop: 2,
        }}
      >
        {label}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.bg, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontFamily: "DMSans-Regular", fontSize: 16, color: Colors.textSecondary }}>
          Loading profile...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Header */}
        <View style={{ alignItems: "center", paddingTop: 20, paddingBottom: 10 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: Colors.accent,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontFamily: "BebasNeue",
                fontSize: 32,
                color: Colors.textPrimary,
              }}
            >
              {initials}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "BebasNeue",
              fontSize: 28,
              color: Colors.textPrimary,
              letterSpacing: 1,
            }}
          >
            {profile.name || "Set Your Name"}
          </Text>
          <Text
            style={{
              fontFamily: "DMSans-Regular",
              fontSize: 14,
              color: Colors.textSecondary,
              marginTop: 2,
            }}
          >
            Your profile & health metrics
          </Text>
        </View>

        {/* ===== PERSONAL INFO ===== */}
        <SectionHeader title="Personal Info" icon="person-circle" />

        <InputField
          label="Full Name"
          value={profile.name}
          onChangeText={(text) => updateProfile({ name: text })}
          placeholder="Enter your name"
        />

        <InputField
          label="Age"
          value={profile.age > 0 ? String(profile.age) : ""}
          onChangeText={(text) => {
            const num = parseInt(text) || 0;
            if (num <= 120) updateProfile({ age: num });
          }}
          keyboardType="numeric"
          placeholder="25"
          suffix="years"
        />

        {/* Gender selector */}
        <OptionSelector
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          selected={profile.gender}
          onSelect={(value) => updateProfile({ gender: value as Gender })}
        />

        {/* ===== BODY MEASUREMENTS ===== */}
        <SectionHeader title="Body Measurements" icon="body" />

        {/* Unit toggle */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: Colors.card,
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "DMSans-Medium",
              fontSize: 14,
              color: Colors.textPrimary,
            }}
          >
            Use Metric Units (kg, cm)
          </Text>
          <Switch
            value={profile.useMetric}
            onValueChange={(value) => updateProfile({ useMetric: value })}
            trackColor={{ false: Colors.cardBorder, true: Colors.accent + "80" }}
            thumbColor={profile.useMetric ? Colors.accent : Colors.textMuted}
          />
        </View>

        <InputField
          label={profile.useMetric ? "Weight" : "Weight"}
          value={
            profile.weightKg > 0
              ? String(
                  profile.useMetric
                    ? profile.weightKg
                    : kgToLbs(profile.weightKg)
                )
              : ""
          }
          onChangeText={(text) => {
            const num = parseFloat(text) || 0;
            const kg = profile.useMetric ? num : lbsToKg(num);
            if (kg <= 300) updateProfile({ weightKg: kg });
          }}
          keyboardType="numeric"
          placeholder={profile.useMetric ? "70" : "154"}
          suffix={profile.useMetric ? "kg" : "lbs"}
        />

        <InputField
          label="Height"
          value={
            profile.heightCm > 0
              ? String(
                  profile.useMetric
                    ? profile.heightCm
                    : (() => {
                        const { feet, inches } = cmToFeetInches(profile.heightCm);
                        return `${feet}'${inches}"`;
                      })()
                )
              : ""
          }
          onChangeText={(text) => {
            if (profile.useMetric) {
              const num = parseFloat(text) || 0;
              if (num <= 300) updateProfile({ heightCm: num });
            } else {
              // Parse feet'inches" format
              const match = text.match(/(\d+)'?(\d*)"?/);
              if (match) {
                const feet = parseInt(match[1]) || 0;
                const inches = parseInt(match[2]) || 0;
                updateProfile({ heightCm: feetInchesToCm(feet, inches) });
              }
            }
          }}
          keyboardType={profile.useMetric ? "numeric" : "default"}
          placeholder={profile.useMetric ? "170" : "5'7\""}
          suffix={profile.useMetric ? "cm" : ""}
        />

        {/* Navy Method Body Fat Measurements */}
        <Pressable
          onPress={() => setShowBodyMeasurements(!showBodyMeasurements)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: Colors.card,
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "DMSans-Medium",
              fontSize: 14,
              color: Colors.textPrimary,
            }}
          >
            Body Fat Measurements (Optional)
          </Text>
          <Ionicons
            name={showBodyMeasurements ? "chevron-up" : "chevron-down"}
            size={20}
            color={Colors.textMuted}
          />
        </Pressable>

        {showBodyMeasurements && (
          <View>
            <InputField
              label="Waist Circumference"
              value={profile.waistCm > 0 ? String(profile.waistCm) : ""}
              onChangeText={(text) => updateProfile({ waistCm: parseFloat(text) || 0 })}
              keyboardType="numeric"
              placeholder="80"
              suffix="cm"
            />
            <InputField
              label="Neck Circumference"
              value={profile.neckCm > 0 ? String(profile.neckCm) : ""}
              onChangeText={(text) => updateProfile({ neckCm: parseFloat(text) || 0 })}
              keyboardType="numeric"
              placeholder="38"
              suffix="cm"
            />
            {profile.gender === "female" && (
              <InputField
                label="Hip Circumference"
                value={profile.hipCm > 0 ? String(profile.hipCm) : ""}
                onChangeText={(text) => updateProfile({ hipCm: parseFloat(text) || 0 })}
                keyboardType="numeric"
                placeholder="95"
                suffix="cm"
              />
            )}
          </View>
        )}

        {/* ===== GOAL SETTINGS ===== */}
        <SectionHeader title="Goal Settings" icon="flag" />

        <OptionSelector
          label="Activity Level"
          options={Object.entries(ACTIVITY_LABELS).map(([value, label]) => ({
            value,
            label,
          }))}
          selected={profile.activityLevel}
          onSelect={(value) => updateProfile({ activityLevel: value as ActivityLevel })}
        />

        <OptionSelector
          label="Fitness Goal"
          options={Object.entries(GOAL_LABELS).map(([value, label]) => ({
            value,
            label,
          }))}
          selected={profile.goal}
          onSelect={(value) => updateProfile({ goal: value as Goal })}
        />

        {/* ===== HEALTH METRICS ===== */}
        <SectionHeader title="Health Metrics" icon="pulse" />

        {/* BMI Card - Featured */}
        <View
          style={{
            backgroundColor: Colors.card,
            borderRadius: 20,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "DMSans-Medium",
                  fontSize: 14,
                  color: Colors.textSecondary,
                }}
              >
                Body Mass Index
              </Text>
              <Text
                style={{
                  fontFamily: "BebasNeue",
                  fontSize: 52,
                  color: Colors.textPrimary,
                  marginTop: 4,
                }}
              >
                {metrics.bmi > 0 ? metrics.bmi : "--"}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: metrics.bmiCategory.color + "20",
                borderRadius: 12,
                paddingHorizontal: 14,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "DMSans-Bold",
                  fontSize: 14,
                  color: metrics.bmiCategory.color,
                }}
              >
                {metrics.bmi > 0 ? metrics.bmiCategory.label : "N/A"}
              </Text>
            </View>
          </View>

          {/* BMI Scale Bar */}
          <View style={{ marginBottom: 8 }}>
            <View
              style={{
                flexDirection: "row",
                height: 10,
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              <View style={{ flex: 1, backgroundColor: "#3B82F6" }} />
              <View style={{ flex: 1, backgroundColor: "#22C55E" }} />
              <View style={{ flex: 1, backgroundColor: "#F59E0B" }} />
              <View style={{ flex: 1, backgroundColor: "#EF4444" }} />
            </View>
            {/* Indicator position */}
            {metrics.bmi > 0 && (
              <View
                style={{
                  position: "absolute",
                  left: `${Math.min(Math.max(((metrics.bmi - 15) / 25) * 100, 0), 100)}%`,
                  top: -4,
                }}
              >
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: metrics.bmiCategory.color,
                    borderWidth: 3,
                    borderColor: Colors.textPrimary,
                    marginLeft: -9,
                  }}
                />
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text style={{ fontFamily: "DMSans-Regular", fontSize: 10, color: "#3B82F6" }}>
              Under 18.5
            </Text>
            <Text style={{ fontFamily: "DMSans-Regular", fontSize: 10, color: "#22C55E" }}>
              18.5-24.9
            </Text>
            <Text style={{ fontFamily: "DMSans-Regular", fontSize: 10, color: "#F59E0B" }}>
              25-29.9
            </Text>
            <Text style={{ fontFamily: "DMSans-Regular", fontSize: 10, color: "#EF4444" }}>
              30+
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "DMSans-Regular",
              fontSize: 12,
              color: Colors.textMuted,
              marginTop: 12,
              textAlign: "center",
            }}
          >
            {metrics.bmi > 0 ? metrics.bmiCategory.description : "Enter weight and height to calculate"}
          </Text>
        </View>

        {/* Metrics Grid */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          <MetricCard
            label="Basal Metabolic Rate"
            value={metrics.bmr > 0 ? metrics.bmr.toLocaleString() : "--"}
            unit="kcal/day"
            icon="flame"
            color={Colors.gold}
            description="Calories burned at rest"
          />
          <MetricCard
            label="Daily Energy Expenditure"
            value={metrics.tdee > 0 ? metrics.tdee.toLocaleString() : "--"}
            unit="kcal/day"
            icon="flash"
            color={Colors.teal}
            description="Total daily calorie need"
          />
          <MetricCard
            label="Body Fat Estimate"
            value={metrics.bodyFat !== null ? `${metrics.bodyFat}%` : "--"}
            unit="body fat"
            icon="body"
            color={Colors.accent}
            description="Navy Method estimate"
          />
          <MetricCard
            label="Daily Protein Target"
            value={metrics.proteinTarget > 0 ? metrics.proteinTarget : "--"}
            unit="grams/day"
            icon="nutrition"
            color={Colors.success}
          />
          <MetricCard
            label="Water Intake"
            value={
              metrics.waterIntake.liters > 0
                ? `${metrics.waterIntake.liters}L`
                : "--"
            }
            unit={`${metrics.waterIntake.glasses} glasses`}
            icon="water"
            color={Colors.info}
          />
          <MetricCard
            label="Calorie Target"
            value={
              metrics.calorieTarget > 0 ? metrics.calorieTarget.toLocaleString() : "--"
            }
            unit="kcal/day"
            icon="restaurant"
            color={Colors.warning}
          />
        </View>

        {/* Macro Targets */}
        {metrics.calorieTarget > 0 && (
          <View style={{ marginTop: 16 }}>
            <Text
              style={{
                fontFamily: "DMSans-Bold",
                fontSize: 15,
                color: Colors.textPrimary,
                marginBottom: 10,
              }}
            >
              Daily Macro Targets
            </Text>
            {[
              {
                name: "Protein",
                value: metrics.macroTargets.protein,
                color: Colors.accent,
              },
              {
                name: "Carbs",
                value: metrics.macroTargets.carbs,
                color: Colors.gold,
              },
              {
                name: "Fat",
                value: metrics.macroTargets.fat,
                color: Colors.danger,
              },
            ].map((macro) => (
              <View
                key={macro.name}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: Colors.card,
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  marginBottom: 6,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 3,
                      backgroundColor: macro.color,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: "DMSans-Medium",
                      fontSize: 14,
                      color: Colors.textPrimary,
                    }}
                  >
                    {macro.name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "BebasNeue",
                    fontSize: 22,
                    color: Colors.textPrimary,
                  }}
                >
                  {macro.value}g
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ===== AI SETTINGS ===== */}
        <SectionHeader title="AI Settings" icon="sparkles" />

        <OptionSelector
          label="AI Model Provider"
          options={[
            { value: "anthropic", label: "Anthropic (Claude 3.5)" },
            { value: "groq", label: "Groq (Fast Llama 3)" },
            { value: "gemini", label: "Gemini (Flash - Free)" },
          ]}
          selected={profile.aiProvider}
          onSelect={(value) => updateProfile({ aiProvider: value as AIProvider })}
        />

        <View
          style={{
            backgroundColor: Colors.card,
            borderRadius: 16,
            padding: 16,
            marginTop: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "DMSans-Medium",
              fontSize: 14,
              color: Colors.textPrimary,
              marginBottom: 4,
            }}
          >
            {profile.aiProvider.charAt(0).toUpperCase() + profile.aiProvider.slice(1)} API Key
          </Text>
          <Text
            style={{
              fontFamily: "DMSans-Regular",
              fontSize: 12,
              color: Colors.textMuted,
              marginBottom: 12,
            }}
          >
            {profile.aiProvider === "gemini" 
              ? "Use your free Gemini API key from AI Studio." 
              : profile.aiProvider === "groq"
              ? "Get your ultra-fast Groq key from Groq Console."
              : "Required for Claude 3.5 Sonnet features."} Stored securely on device only.
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.bgLight,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: Colors.cardBorder,
            }}
          >
            <TextInput
              value={apiKey}
              onChangeText={setApiKey}
              secureTextEntry={!showApiKey}
              placeholder={
                profile.aiProvider === "anthropic" ? "sk-ant-..." : 
                profile.aiProvider === "groq" ? "gsk_..." : "AI..."
              }
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                flex: 1,
                fontFamily: "DMSans-Regular",
                fontSize: 14,
                color: Colors.textPrimary,
                paddingHorizontal: 14,
                paddingVertical: Platform.OS === "ios" ? 14 : 10,
              }}
            />
            <Pressable
              onPress={() => setShowApiKey(!showApiKey)}
              style={{ paddingHorizontal: 12 }}
            >
              <Ionicons
                name={showApiKey ? "eye-off" : "eye"}
                size={20}
                color={Colors.textMuted}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 12,
            }}
          >
            <Pressable
              onPress={saveApiKey}
              style={{
                flex: 1,
                backgroundColor: Colors.accent,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "DMSans-Bold",
                  fontSize: 14,
                  color: Colors.textPrimary,
                }}
              >
                {apiKeySaved ? "✓ Saved" : "Save Key"}
              </Text>
            </Pressable>
            {apiKeySaved && (
              <Pressable
                onPress={clearApiKey}
                style={{
                  backgroundColor: Colors.danger + "20",
                  borderRadius: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "DMSans-Bold",
                    fontSize: 14,
                    color: Colors.danger,
                  }}
                >
                  Clear
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Version info */}
        <Text
          style={{
            fontFamily: "DMSans-Regular",
            fontSize: 12,
            color: Colors.textMuted,
            textAlign: "center",
            marginTop: 30,
          }}
        >
          FitTrack AI v1.0.0 • Phase 2 Complete
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
