import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes/> : <AuthRoutes />}
    </NavigationContainer>
  );
}

export default Routes;