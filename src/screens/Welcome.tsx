import React from "react";
import { Button } from "../atoms/Button";
import { Screen } from "../atoms/Screen";
import { Title } from "../atoms/Title";

interface Props {
  navigation: any;
}

export default function Welcome({ navigation }: Props) {
  return (
    <Screen>
      <Title>Welcome to Meep</Title>
      <Button
        onPress={()=>{navigation.navigate("CreateAccount", {step: 'create'})}}
        title={"Create Account"}
      />
      <Button
        onPress={()=>{navigation.navigate("Login")}}
        title={"Log In"}
      />
    </Screen>
  );
}
