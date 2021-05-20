import { Alert } from 'react-native';

interface TwoButtonAlertProps {
  title: string;
  message: string;
  button1Text: string;
  button1OnPress: () => void;
  button2Text: string;
  button2OnPress: () => void;
}

const defaultFunction = () => {}

export const TwoButtonAlert: (props: TwoButtonAlertProps) => void = ({
  title,
  message,
  button1Text,
  button1OnPress = defaultFunction,
  button2Text,
  button2OnPress = defaultFunction,
}: TwoButtonAlertProps) => {
  Alert.alert(title, message, [
    { text: button1Text, onPress: button1OnPress },
    { text: button2Text, onPress: button2OnPress },
  ]);
};
