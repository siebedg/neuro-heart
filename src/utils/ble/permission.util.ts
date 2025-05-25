import {
  checkMultiple,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import { Platform } from "react-native";
import { errorLog, log } from "@/src/utils/log.util";

export async function requestBLEPermissions(): Promise<boolean> {
  if (Platform.OS !== "android") return true;

  const permissions = [
    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ];

  const statuses = await checkMultiple(permissions);

  const needsRequest = permissions.filter(
    (perm) => statuses[perm] !== RESULTS.GRANTED
  );

  if (needsRequest.length > 0) {
    const result = await requestMultiple(needsRequest);

    const allGranted = permissions.every(
      (perm) => result[perm] === RESULTS.GRANTED
    );

    if (!allGranted) {
      errorLog("🔒 BLE permissions denied", "PERMISSION");
      return false;
    }
  }

  log("✅ BLE permissions granted", "PERMISSION");
  return true;
}
