
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style = {styles.container}>
    <Text style = {styles.title}>Login</Text>

      <TextInput style = {styles.input} placeholder = "Email" keyboardType = "email-address" />
      <TextInput style = {styles.input} placeholder = "Password" secureTextEntry />

      <Button title = "Login" onPress       = {() => navigation.replace('Dashboard')} />
      <Text   style = {styles.link} onPress = {() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title    : { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input    : {
    borderWidth : 1,
    borderColor : '#aaa',
    borderRadius: 8,
    padding     : 12,
    marginBottom: 12,
  },
  link: { color: 'blue', marginTop: 16, textAlign: 'center' },
});
