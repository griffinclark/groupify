import React from 'react';
import { globalStyles } from 'res/styles/GlobalStyles';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { TEST_IMAGE_URL } from 'res/styles/Colors';
import { SquareImageDisplay } from 'atoms/AtomsExports';
import { NavigationProp, ParamListBase } from '@react-navigation/core';

interface Props {
  UID: string;
  title: string;
  endpointUID: string;
  navigation: NavigationProp<ParamListBase>;
}
export const EndpointTile: React.FC<Props> = ({ title, endpointUID, navigation }: Props) => {
  const getImage = (endpointUID: string) => {
    // TODO @David return the image for an endpoint given its UID
    console.log(endpointUID); //Not sure what we are doing with this
    return TEST_IMAGE_URL;
  };

  const createEvent = () => {
    // TODO @David create a new event
  };

  return (
    <View style={styles.rootContainer}>
      {/* <Text>Tile rendered</Text> */}
      <View style={styles.rowConatiner}>
        <View style={styles.profileImageContainer}>
          <SquareImageDisplay imageURI={getImage(endpointUID)} />
        </View>
      </View>
      <View style={globalStyles.miniSpacer} />
      <View style={styles.rowConatiner}>
        <View style={globalStyles.defaultColumnContainer}>
          <View style={globalStyles.miniSpacer} />

          <Text style={globalStyles.title}> {title} </Text>
          <Button
            title={'Create This Event'}
            onPress={async () => {
              await createEvent(); // event needs to be created before we navigate
              navigation.navigate('ConfirmEvent');
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: 350,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    marginTop: 5,
  },
  profileImageContainer: {
    height: 200,
    width: 300,
    alignSelf: 'flex-start',
  },
  rowConatiner: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    margin: 15,
  },
});
