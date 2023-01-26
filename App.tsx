import React from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {store} from './app/store';
import {Provider} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Ships from './app/features/Ships';
import Rockets from './app/features/Rockets';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName: string = 'ios-list';

              if (route.name === 'Ships') {
                iconName = focused ? 'boat' : 'boat-outline';
              } else if (route.name === 'Rockets') {
                iconName = focused ? 'rocket' : 'rocket-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen
            name="Ships"
            component={Ships.ShipsScreen}
            // options={{tabBarBadge: 3}}
          />
          <Tab.Screen name="Rockets" component={Rockets.RocketsScreen} />
        </Tab.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
