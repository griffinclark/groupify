import React from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';
import { data } from '../res/staticData';
import { AcknowledgementTile } from '../atoms/AcknowledgementTile';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const Acknowledgements: React.FC<Props> = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={false}
        displayBackButton={true}
        displaySettings={false}
        route={route}
        title={'Acknowledgements'.toUpperCase()}
        targetScreen={'ProfileScreen'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.division}>Admin</Text>
        {data
          .filter((item) => item.division === 'Admin')
          .map(({ name, title, country, linkedIn }, index) => (
            <AcknowledgementTile key={index} name={name} title={title} country={country} linkedIn={linkedIn} />
          ))}
        <Text style={styles.division}>Developmment</Text>
        {data
          .filter((item) => item.division === 'Development')
          .map(({ name, title, country, linkedIn }, index) => (
            <AcknowledgementTile key={index} name={name} title={title} country={country} linkedIn={linkedIn} />
          ))}
        <Text style={styles.division}>Marketing</Text>
        {data
          .filter((item) => item.division === 'Marketing')
          .map(({ name, title, country, linkedIn }, index) => (
            <AcknowledgementTile key={index} name={name} title={title} country={country} linkedIn={linkedIn} />
          ))}
        <Text style={styles.division}>Advisors</Text>
        {data
          .filter((item) => item.division === 'Advisors')
          .map(({ name, country, linkedIn }, index) => (
            <AcknowledgementTile key={index} name={name} country={country} linkedIn={linkedIn} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  division: {
    fontSize: 20,
    fontFamily: JOST['500'],
    marginTop: 23,
    marginLeft: 13,
    marginBottom: 20,
  },
});
