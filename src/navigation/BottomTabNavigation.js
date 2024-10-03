import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DashboardScreen from '../screens/DashboardScreen';
import ShareScreen from '../screens/ShareScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import MyFolderScreen from '../screens/MyFolderScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          } else if (route.name === 'Share Folder') {
            iconName = 'share';
          } else if (route.name === 'My Folder') {
            iconName = 'folder';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
      <Tab.Screen name="Share Folder" component={ShareScreen} />
      <Tab.Screen name="My Folder" component={MyFolderScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
