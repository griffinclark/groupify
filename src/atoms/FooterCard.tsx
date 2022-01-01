/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-default-export */
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome5 , Feather} from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const FooterCard = () => {
    return (
        <View style={tw`bg-white mt-2`}>
        <View style={tw`mt-3 py-12 bg-green-700 `}>
            <View style={tw`flex-row items-center mx-4  mb-2`}>
              <FontAwesome5  name="heart" size={36} color="white" />
              <Text style={tw`text-lg mx-3 text-white font-medium`}>Make more plans with more friends by sharing our quickly evolving app!</Text>
            </View>
        <TouchableOpacity style={tw`flex-row items-center justify-center bg-green-600 mx-4 rounded-xl py-3 `}>
         <Feather name="upload" size={28} color="white" />
         <Text style={tw`text-xl text-white mx-2 font-semibold`}>Share Groupify</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
}

export default FooterCard;
