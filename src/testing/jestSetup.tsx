'use strict';
import { View } from 'react-native';

// jest.mock('react-native-gesture-handler', () => {
//   const { View } = 'react-native';
//   return {
//     Swipeable: View,
//     DrawerLayout: View,
//     State: {},
//     ScrollView: View,
//     Slider: View,
//     Switch: View,
//     TextInput: View,
//     ToolbarAndroid: View,
//     ViewPagerAndroid: View,
//     DrawerLayoutAndroid: View,
//     WebView: View,
//     NativeViewGestureHandler: View,
//     TapGestureHandler: View,
//     FlingGestureHandler: View,
//     ForceTouchGestureHandler: View,
//     LongPressGestureHandler: View,
//     PanGestureHandler: View,
//     PinchGestureHandler: View,
//     RotationGestureHandler: View,
//     /* Buttons */
//     RawButton: View,
//     BaseButton: View,
//     RectButton: View,
//     BorderlessButton: View,
//     /* Other */
//     FlatList: View,
//     gestureHandlerRootHOC: jest.fn(),
//     Directions: {},
//   };
// });

jest.mock('react-native-gesture-handler', () => {
  const React = 'react-native';
  const { View } = React;
  return { TouchableWithoutFeedback: View };
  //   const View = require('react-native/Libraries/Components/View/View');
});
