import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Platform, Alert } from "react-native";


const App = () => {
  // const [progress, setProgress] = useState(null);
  // const [isUpdating, setIsUpdating] = useState(false);

  // useEffect(() => {
  //   const syncCodePush = async () => {
  //     try {
  //       CodePush.sync(
  //         {
  //           deploymentKey:
  //             Platform.OS === "android"
  //               ? "RlLjmxdOaJwQusOksXr9UvG8G05kEk6FMb6OGg"
  //               : "4t6uzEU2P4Pe2eGIJcE8236Zh99cEk6FMb6OGg",
  //           installMode: CodePush.InstallMode.IMMEDIATE,
  //           updateDialog: true, 
  //         },
  //         (status) => {
  //           console.log("CodePush Status:", status);
  //           switch (status) {
  //             case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
  //               console.log("Checking for update...");
  //               break;
  //             case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
  //               setIsUpdating(true);
  //               break;
  //             case CodePush.SyncStatus.INSTALLING_UPDATE:
  //               console.log("Installing update...");
  //               break;
  //             case CodePush.SyncStatus.UPDATE_INSTALLED:
  //               setIsUpdating(false);
  //               setProgress(null);
  //               Alert.alert(
  //                 "Update Installed",
  //                 "App will restart now.",
  //                 [{ text: "OK", onPress: () => CodePush.restartApp() }]
  //               );
  //               break;
  //             case CodePush.SyncStatus.UP_TO_DATE:
  //               setIsUpdating(false);
  //               setProgress(null);
  //               console.log("App is up to date!");
  //               break;
  //             case CodePush.SyncStatus.UNKNOWN_ERROR:
  //               setIsUpdating(false);
  //                 console.log("CodePush Unknown Errordd", status);
  //               setProgress(null);
  //               Alert.alert(
  //                 "Update Error",
  //                 "An unknown error occurred. Please check deployment key and binary version."
  //               );
  //               break;
  //           }
  //         },
  //         (downloadProgress) => {
  //           if (downloadProgress.totalBytes > 0) {
  //             const percent =
  //               (downloadProgress.receivedBytes /
  //                 downloadProgress.totalBytes) *
  //               100;
  //             setProgress(percent.toFixed(0));
  //             console.log(
  //               `Downloading: ${downloadProgress.receivedBytes} / ${downloadProgress.totalBytes} (${percent.toFixed(
  //                 0
  //               )}%)`
  //             );
  //           }
  //         }
  //       );
  //     } catch (err) {
  //       Alert.alert("CodePush Error", err.message || "Unknown error");
  //     }
  //   };

  //   syncCodePush();
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>🚀 Welcome template</Text>
    </View>
  );
};

// Wrap with CodePush HOC
export default App;
