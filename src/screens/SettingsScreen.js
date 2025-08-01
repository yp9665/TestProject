import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import BottomTabNavigator from '../navigations/BottomTabNavigator';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.text}>
        This is the settings screen. Add your preferences, toggles, or account-related options here.
      </Text>
      <BottomTabNavigator />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1,justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, lineHeight: 24 },
});
