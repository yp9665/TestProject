import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import BottomTabNavigator from '../navigations/BottomTabNavigator';

const AboutUsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={styles.title}>About Us</Text>
      <Text style={styles.text}>
        This is a demo app created using React Native.
        You can customize this screen with more information about your team or product.
      </Text>
      <BottomTabNavigator />

    </SafeAreaView>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, lineHeight: 24 },
});
