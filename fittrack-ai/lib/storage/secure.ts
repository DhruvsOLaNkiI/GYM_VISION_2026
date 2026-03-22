import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Use require for dynamic loading to prevent web import errors
let SecureStore: any = null;

function getSecureStore() {
  if (Platform.OS === "web") return null;
  if (!SecureStore) {
    try {
      SecureStore = require("expo-secure-store");
    } catch {
      return null;
    }
  }
  return SecureStore;
}

/**
 * A cross-platform wrapper for secure storage.
 * On native, it uses Expo SecureStore.
 * On web, it falls back to AsyncStorage.
 */

export async function setSecureItem(key: string, value: string) {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(key, value);
  } else {
    const store = getSecureStore();
    if (store) {
      await store.setItemAsync(key, value);
    }
  }
}

export async function getSecureItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return await AsyncStorage.getItem(key);
  } else {
    const store = getSecureStore();
    if (store) {
      return await store.getItemAsync(key);
    }
    return null;
  }
}

export async function deleteSecureItem(key: string) {
  if (Platform.OS === "web") {
    await AsyncStorage.removeItem(key);
  } else {
    const store = getSecureStore();
    if (store) {
      await store.deleteItemAsync(key);
    }
  }
}
