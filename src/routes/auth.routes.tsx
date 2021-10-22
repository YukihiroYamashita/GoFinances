import React from 'react';
import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen
        name="SignIn"
        component={SignIn}
      />
    </Navigator>
  );
}

export default AuthRoutes;