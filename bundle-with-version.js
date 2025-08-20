const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const plist = require("plist");

const versionFile = "./bundle-version.json";

// --- Function to get Android APK version from build.gradle ---
function getAndroidVersion() {
  try {
    const gradlePath = path.join(__dirname, "android/app/build.gradle");
    if (!fs.existsSync(gradlePath)) {
      console.warn("Android build.gradle not found!");
      return null;
    }
    const gradleContent = fs.readFileSync(gradlePath, "utf8");
    const versionNameMatch = gradleContent.match(/versionName\s+"(.+?)"/);
    if (versionNameMatch && versionNameMatch[1]) {
      return versionNameMatch[1];
    } else {
      console.warn("versionName not found in build.gradle");
      return null;
    }
  } catch (e) {
    console.warn("Error reading Android version:", e);
    return null;
  }
}

// --- Function to get iOS APK version from Info.plist ---
function getIosVersion() {
  try {
    // Replace 'YourApp' with your actual iOS app folder name
    const plistPath = path.join(__dirname, "ios/YourApp/Info.plist");
    if (!fs.existsSync(plistPath)) {
      console.warn("iOS Info.plist not found!");
      return null;
    }
    const plistContent = fs.readFileSync(plistPath, "utf8");
    const parsed = plist.parse(plistContent);
    if (parsed && parsed.CFBundleShortVersionString) {
      return parsed.CFBundleShortVersionString;
    } else {
      console.warn("CFBundleShortVersionString not found in Info.plist");
      return null;
    }
  } catch (e) {
    console.warn("Error reading iOS version:", e);
    return null;
  }
}

// Load existing versions or set default
let versions = { android: "1.0.0", ios: "1.0.0" };
if (fs.existsSync(versionFile)) {
  versions = JSON.parse(fs.readFileSync(versionFile, "utf8"));
}

// Get platform from args
const platform = process.argv[2] || "android";
const prevVersion = versions[platform];

// Increment patch version
function incrementVersion(version) {
  const parts = version.split(".").map(Number);
  parts[2] = (parts[2] || 0) + 1;
  return parts.join(".");
}

const newVersion = incrementVersion(prevVersion);
versions[platform] = newVersion;
fs.writeFileSync(versionFile, JSON.stringify(versions, null, 2));

console.log(`\n🔹 New ${platform} bundle version: ${newVersion}\n`);

// Determine correct bundle name and bundle URL
const bundleFileName =
  platform === "android" ? "index.android.bundle" : "main.jsbundle";

const bundleUrlBase = "https://roardev.blob.core.windows.net/bundles";
const bundleUrl = `${bundleUrlBase}/${bundleFileName}`;

// Paths
const bundleOutputPath =
  platform === "android"
    ? `./android/app/src/main/assets/${bundleFileName}`
    : `./ios/${bundleFileName}`;
const assetsDestPath =
  platform === "android"
    ? `./android/app/src/main/res`
    : `./ios`;

// Delete old local bundle
if (fs.existsSync(bundleOutputPath)) {
  fs.unlinkSync(bundleOutputPath);
  console.log(`🗑 Deleted old local bundle: ${bundleOutputPath}`);
}

// Bundle command
const bundleCmd = `npx react-native bundle --platform ${platform} --dev false --entry-file index.js --bundle-output ${bundleOutputPath} --assets-dest ${assetsDestPath}`;

try {
  console.log("📦 Bundling React Native app...");
  execSync(bundleCmd, { stdio: "inherit" });
  console.log("✅ Bundle created successfully!");
} catch (error) {
  console.error("❌ Error bundling:", error);
  process.exit(1);
}

// Delete old bundle from Azure
try {
  console.log("🗑 Deleting old bundle from Azure...");
  execSync(
    `az storage blob delete --account-name roardev --container-name bundles --name ${bundleFileName} --auth-mode login`,
    { stdio: "inherit" }
  );
  console.log("✅ Old bundle deleted from Azure!");
} catch {
  console.warn("⚠ No old bundle found in Azure to delete.");
}

// Get APK versions dynamically
const androidApkVersion = getAndroidVersion() || "1.0.0";
const iosApkVersion = getIosVersion() || "1.0.0";

// Decide which APK version to use based on platform
const apkVersion = platform === "android" ? androidApkVersion : iosApkVersion;


// Upload new bundle with version metadata
try {
  console.log("☁ Uploading new bundle to Azure with metadata...");
  execSync(
    `az storage blob upload --account-name roardev --container-name bundles --file ${bundleOutputPath} --name ${bundleFileName} --auth-mode login --metadata version=${newVersion} buildVersion=${apkVersion} `,
    { stdio: "inherit" }
  );
  console.log("✅ Upload successful!");
} catch (error) {
  console.error("❌ Error uploading bundle:", error);
  process.exit(1);
}


// Create latest-version.json content with bundle and APK versions
const latestVersionInfo = {
  androidApkVersion,
  androidBundleVersion: versions.android,
  iosApkVersion,
  iosBundleVersion: versions.ios,
  bundleUrl,
};

// Write latest-version.json locally
fs.writeFileSync(
  "./latest-version.json",
  JSON.stringify(latestVersionInfo, null, 2)
);

// Upload latest-version.json to Azure
try {
  console.log("☁ Uploading latest-version.json to Azure...");
  execSync(
    `az storage blob upload --account-name roardev --container-name bundles --file ./latest-version.json --name latest-version.json --auth-mode login --overwrite`,
    { stdio: "inherit" }
  );
  console.log("✅ latest-version.json uploaded successfully!");
} catch (error) {
  console.error("❌ Error uploading latest-version.json:", error);
  process.exit(1);
}
