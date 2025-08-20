import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import Restart from "react-native-restart";
import VersionNumber from "react-native-version-number"; // yarn add react-native-version-number

const LATEST_VERSION_URL = "https://roardev.blob.core.windows.net/bundles/latest-version.json";
const VERSION_KEY = "CURRENT_BUNDLE_VERSION";
const DEFAULT_VERSION = "1.0.0";

function compareVersions(v1, v2) {
  const splitV1 = v1.split(".").map(Number);
  const splitV2 = v2.split(".").map(Number);
  for (let i = 0; i < Math.max(splitV1.length, splitV2.length); i++) {
    const num1 = splitV1[i] || 0;
    const num2 = splitV2[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  return 0;
}

export async function getCurrentVersion() {
  try {
    const savedVersion = await AsyncStorage.getItem(VERSION_KEY);
    return savedVersion || DEFAULT_VERSION;
  } catch (e) {
    console.warn("Failed to get current version:", e);
    return DEFAULT_VERSION;
  }
}

async function setCurrentVersion(version) {
  try {
    await AsyncStorage.setItem(VERSION_KEY, version);
  } catch (e) {
    console.warn("Failed to save version", e);
  }
}

export async function checkForUpdate(currentBundleVersion) {
  try {
    console.log("[OTA] Checking latest version from server...");
    const response = await fetch(LATEST_VERSION_URL);
    const data = await response.json();

    const platform = Platform.OS;

    // Server values
    const serverApkVersion =
      platform === "android" ? data.androidApkVersion : data.iosApkVersion;
    const serverBundleVersion =
      platform === "android" ? data.androidBundleVersion : data.iosBundleVersion;
    const bundleUrl = data.bundleUrl;

    // Local native app version
    const localApkVersion = VersionNumber.appVersion;

    console.log("[OTA] Local APK Version:", localApkVersion);
    console.log("[OTA] Server APK Version:", serverApkVersion);

    // Step 1 — Ensure APK versions match before OTA update
    if (serverApkVersion !== localApkVersion) {
      console.log("[OTA] APK version mismatch. Skipping OTA update.");
      return;
    }

    // Step 2 — Compare bundle versions
    console.log("[OTA] Server Bundle Version:", serverBundleVersion);
    console.log("[OTA] Installed Bundle Version:", currentBundleVersion);

    const cmp = compareVersions(currentBundleVersion, serverBundleVersion);
    if (cmp >= 0) {
      console.log("[OTA] Local bundle version is up-to-date. No update required.");
      return;
    }

    console.log("[OTA] New bundle version detected. Starting download...");
    await downloadAndUpdate(bundleUrl, serverBundleVersion);

  } catch (error) {
    console.error("[OTA] Failed to check update:", error);
  }
}

async function downloadAndUpdate(bundleUrl, latestVersion) {
  const bundleFilename =
    Platform.OS === "android" ? "index.android.bundle" : "main.jsbundle";

  const localPath = `${RNFS.DocumentDirectoryPath}/${bundleFilename}`;

  try {
    // Delete old bundle if exists
    const existsBefore = await RNFS.exists(localPath);
    if (existsBefore) {
      console.log(`[OTA] Deleting old bundle at ${localPath}`);
      await RNFS.unlink(localPath);
    }

    console.log(`[OTA] Downloading new bundle from: ${bundleUrl}`);
    const downloadResult = await RNFS.downloadFile({
      fromUrl: bundleUrl,
      toFile: localPath,
    }).promise;

    if (downloadResult.statusCode === 200) {
      const existsAfter = await RNFS.exists(localPath);
      console.log(`[OTA] Download complete. Bundle saved at ${localPath}: ${existsAfter}`);

      if (!existsAfter) {
        console.warn("[OTA] Bundle file does not exist after download!");
        return;
      }

      await setCurrentVersion(latestVersion);
      console.log(`[OTA] Version updated to ${latestVersion}. Restarting app...`);
      Restart.restart();
    } else {
      console.warn(`[OTA] Failed to download update. Status code: ${downloadResult.statusCode}`);
    }
  } catch (err) {
    console.error("[OTA] Download error:", err.message);
  }
}
