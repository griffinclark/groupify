import { Alert } from 'react-native';

interface Props {
  title: string;
  message: string;
  button1Text: string;
  button1OnPress?: () => void;
  button2Text: string;
  button2OnPress: () => void;
}

const defaultFunction = () => void 0;

export const TwoButtonAlert: (props: Props) => void = ({
  title,
  message,
  button1Text,
  button1OnPress = defaultFunction,
  button2Text,
  button2OnPress = defaultFunction,
}: Props) => {
  Alert.alert(title, message, [
    { text: button1Text, onPress: button1OnPress },
    { text: button2Text, onPress: button2OnPress },
  ]);
};
