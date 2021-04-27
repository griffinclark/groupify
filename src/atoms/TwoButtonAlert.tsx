import React from "react";
import { Alert } from "react-native";


interface TwoButtonAlertProps {
  title: string;
  message: string;
  button1Text: string;
  button1OnPress?: any;
  button2Text: string;
  button2OnPress?: any;
}


export const TwoButtonAlert = ({
  title,
  message,
  button1Text,
  button1OnPress=()=>{},
  button2Text,
  button2OnPress=()=>{},
  }: TwoButtonAlertProps) => {
  
    return Alert.alert(
    title,
    message,
    [
      { text: button1Text, onPress: button1OnPress },
      { text: button2Text, onPress: button2OnPress }
    ]
  );
}
