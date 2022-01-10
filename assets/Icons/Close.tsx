import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface Props {
    onPress?: () => void;
}

export const CloseIcon: React.FC<Props> = ({ onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path 
                    d="M18.4375 1.5625L1.5625 18.4375" 
                    stroke="black" 
                    stroke-width="3" 
                    stroke-miterlimit="10" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
                <Path 
                    d="M18.4375 18.4375L1.5625 1.5625" 
                    stroke="black" 
                    stroke-width="3" 
                    stroke-miterlimit="10" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
            </Svg>
        </TouchableOpacity>
    );
}
