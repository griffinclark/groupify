import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from '@testing-library/react-native';

const Stack = createStackNavigator();

const renderOtherComponents = (
  otherComponents: {
    name: string;
    Component: React.FC<any>;
    props?: any;
  }[],
  screenConfig = {},
) => {
  /* eslint-disable */
  return otherComponents.map(({ name, Component, props }) => {
    return <Stack.Screen {...screenConfig} key={name} name={name} children={() => <Component {...props} />} />;
  });
  /* eslint-enable */
};

export const renderWithNavigation = (
  MainComponent: React.FC<any>,
  mockProps: any,
  otherComponents: { name: string; Component: React.FC<any>; props: any }[] = [],
  { navigatorConfig = {}, screenConfig = {} } = {},
): any => {
  /* eslint-disable */
  const App = () => (
    <NavigationContainer>
      <Stack.Navigator {...navigatorConfig} screenOptions={{ animationEnabled: false }}>
        <Stack.Screen {...screenConfig} name="TestNavigator" children={() => <MainComponent {...mockProps} />} />
        {otherComponents && renderOtherComponents(otherComponents, screenConfig)}
      </Stack.Navigator>
    </NavigationContainer>
  );
  /* eslint-enable */

  return { ...render(<App />) };
};
