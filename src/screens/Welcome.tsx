import React from 'react';
import { RootStackParamList } from '../res/root-navigation';
import { Button, Title, Screen } from '../atoms/AtomsExports';

interface Props {
  navigation: RootStackParamList;
}

export const Welcome: React.FC<Props> = ({ navigation }: Props) => {
  const onPressCreateAccount = (): void => {
    navigation.navigate('CreateAccount', { step: 'create' });
  };

  const onPressLogIn = (): void => {
    navigation.navigate('Login');
  };

  return (
    <Screen>
      <Title style={{ fontSize: 45, margin: 40 }}>Welcome to Meep</Title>
      <Button onPress={onPressCreateAccount} title={'Create Account'} />
      <Button onPress={onPressLogIn} title={'Log In'} />
    </Screen>
  );
};
