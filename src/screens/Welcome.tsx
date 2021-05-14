import React from "react";
import { Button, Title, Screen } from '../atoms/AtomsExports'

interface Props {
  navigation: any;
}

export default function Welcome({ navigation }: Props) {
  return (
    <Screen>
      <Title style={{fontSize: 45, margin: 40}}>Welcome to Meep</Title>
      <Button
        onPress={()=>{navigation.navigate("CreateAccount", {step: 'create'})}}
        title={"Create Account"}
      />
      <Button
        onPress={()=>{
          navigation.navigate("Login")}}
        title={"Log In"}
      />

    </Screen>
  );
}
