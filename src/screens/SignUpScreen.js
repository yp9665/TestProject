import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry />
      <TextInput style={styles.input} placeholder='Address' secureTextEntry multiline={2} />
      <Button title="Create Account" onPress={() => navigation.replace('Dashboard')} />
      <Text style={styles.link} onPress={() => navigation.goBack()}>
        Already have an account? Login
      </Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  link: { color: 'blue', marginTop: 16, textAlign: 'center' },
});
