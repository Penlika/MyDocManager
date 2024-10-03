import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-config';
import { PaperProvider } from 'react-native-paper';

Amplify.configure(awsconfig);

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
