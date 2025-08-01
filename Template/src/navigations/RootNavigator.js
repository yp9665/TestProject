import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';

const RootNavigator = () => {
  const isLoggedIn = true; // replace with auth logic

  return (
    <NavigationContainer>
      {isLoggedIn ? <AuthStack /> :  <DrawerNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
