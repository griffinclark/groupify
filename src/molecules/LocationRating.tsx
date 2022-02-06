import React from 'react';
import { GOLD_0, GREY_4 } from '../res/styles/Colors';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { AppText } from '../atoms/AtomsExports';

interface Props {
    rating: number | null;
    ratingTotal?: number | null;
    containerStyle?: Record<string, unknown>;
}

export const LocationRating: React.FC<Props> = ({ rating, ratingTotal, containerStyle = {} }: Props) => {
    const renderStars = () => {
        if (!rating) return null;
    
        const arr = Array(5).fill(GREY_4);
        const star = Math.round(rating);
        let i = 0;
        while (i < star) {
          arr[i] = GOLD_0;
          i++;
        }
    
        return (
          <View style={{ flexDirection: 'row' }}>
            {arr.map((ele, idx) => (
              <Icon color={ele} key={idx} name="star" type="font-awesome" size={15} />
            ))}
          </View>
        );
    };

    return (
        rating ? (
            <AppText style={[styles.rating, containerStyle]}>
                {rating.toFixed(1)} {renderStars()} {ratingTotal && (`(` + ratingTotal + `)`)}
            </AppText>
        ) : <AppText style={styles.rating}>No Rating</AppText>
    );
}

const styles = StyleSheet.create({
    rating: {
        fontSize: 12,
      },
});