// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Pressable, Image } from 'react-native';
// import { Screen, Button, NavButton } from '../atoms/AtomsExports';
// import { RoutePropParams } from '../res/root-navigation';
// import { Auth } from 'aws-amplify';

// interface Props {
//   navigation: {
//     navigate: (ev: string, a?: { userID: string }) => void;
//   };
//   route: RoutePropParams;
// }

// export const AcceptDecline: React.FC<Props> = ({ navigation, route }: Props) => {
//   const pressed = () => {
//     console.warn('coming soon!');
//   };

//   const userName = async (): Promise<string> => {
//     const userInfo = await Auth.currentUserInfo();
//     return userInfo.attributes.name;
//   };
//   return (
//     <Screen>
//       <View style={{ top: 38, flexDirection: 'row', justifyContent: 'space-between' }}>
//         <Text style={{ fontSize: 25, color: '#31A59F', left: 20, fontWeight: 'bold' }}>Sabrina Cafe</Text>
//         <Pressable onPress={() => navigation.navigate('Attendees')}>
//           <Text style={{ color: '#31A59F', top: 5, fontWeight: 'bold', right: 11 }}>Back To Home</Text>
//         </Pressable>
//       </View>

//       {/* <Image style={styles.inviteImg} source={require('../../assets/pain.png')} /> */}
//       <View>
//         <Text style={styles.hostName}>Chelsea James</Text>
//         <Text style={styles.hostNameSmall}>Host</Text>
//       </View>

//       <View style={{ left: 20, top: 150 }}>
//         <Text>Tues, July 20, 2021.</Text>
//         <Text>12:00 PM - 2:00 PM</Text>
//         <Text style={styles.evText3}>Date</Text>
//         <TouchableOpacity style={{ height: 25 }} onPress={pressed}>
//           <Text style={styles.evText4}>Add to calendar</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ left: 180, top: 70, width: 180 }}>
//         <Text>Festival Hotel and suite'</Text>
//         <Text style={[styles.evText3]}>Location</Text>
//         <TouchableOpacity style={{ height: 25 }} onPress={pressed}>
//           <Text style={{ color: '#31A59F' }}>View map</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={{ top: 130 }}>
//         <Text>Join me for lunch at Sabrina's cafe.</Text>
//         <Text style={styles.desc1}>Description</Text>
//       </View>

//       <View style={{ top: 240, flexDirection: 'row', justifyContent: 'space-around' }}>
//         <Button title="Decline" onPress={pressed} />
//         <Button title="Accept" onPress={pressed} />
//       </View>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   inviteImg: {
//     width: '100%',
//     height: 200,
//     top: 40,
//   },
//   hostName: {
//     position: 'absolute',
//     width: 300,
//     top: 60,
//     marginLeft: 18,
//     fontSize: 25,
//     color: '#31A59F',
//   },
//   hostNameSmall: {
//     position: 'absolute',
//     width: 150,
//     top: 78,
//     marginLeft: 20,
//     marginTop: 10,
//     color: '#616060',
//   },

//   evText3: {
//     fontSize: 12,
//     color: '#616060',
//     width: 86,
//     height: 16,
//   },
//   evText4: {
//     fontSize: 12,
//     color: '#31A59F',
//   },
//   desc1: {
//     fontSize: 12,
//     color: '#616060',
//   },
//   button: {
//     width: 109,
//     height: 40,
//     top: 280,
//     left: 120,
//     backgroundColor: '#31A59F',
//     borderRadius: 20,
//   },
// });
