import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../screens/Dashboard';
import Register from '../screens/Register';

const { Navigator, Screen } = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Navigator>
      <Screen 
        name="Listagem"
        component={Dashboard}
      />
      <Screen 
        name="Cadastrar"
        component={Register}
      />
      <Screen 
        name="Resumo"
        component={Register}
      />
    </Navigator>
  );
}

export default AppRoutes;