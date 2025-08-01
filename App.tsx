import React, { useEffect, useState } from 'react';
import RootNavigator from './src/navigations/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TextComponent from './src/components/TextComponent';
import { Alert } from 'react-native';
import ButtonComponent from './src/components/ButtonComponent';

const App = () => {
  const [statusVisible, setStatusVisible] = useState('');
  const handlePress = () => {
    Alert.alert('Saved successfully');
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <RootNavigator /> */}
      {/* <TextComponent variant="heading" text="Welcome to the App" />
      <TextComponent variant="button" text="Continue" alertMessage={statusVisible} onPress={handlePress} />
      <TextComponent variant="alert" text="Something went wrong!" />
      {/* <TextComponent variant="status" text="Saved successfully" /> 
      <TextComponent variant="heading" text="Centered Text" /> */}
    </GestureHandlerRootView>
  )

};

export default App;
