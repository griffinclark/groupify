import React, { useState } from 'react';
import { View, Button, ColorPropType } from 'react-native';

interface Props {
  title: string;
  setSelectedTags: (parentFunc: (selectedTags: string[]) => string[]) => void; // callback to parent
  selectedTags: string[];
}

export const Tag: React.FC<Props> = ({ title, setSelectedTags, selectedTags }: Props) => {
  const [pressed, setPressed] = useState(false);

  const tagPressed = () => {
    // TODO test to make sure this works as intended
    setPressed(!pressed); // change whether the tag is pressed or not
    if (!pressed) {
      // add to array
      setSelectedTags((selectedTags) => [...selectedTags, title]);
    } else {
      // remove from array
      selectedTags.filter((item, pos) => {
        if (item == title) {
          selectedTags.splice(pos, 1);
          setSelectedTags((selectedTags) => [...selectedTags]);
        }
      });
    }
  };

  const getColor = () => {
    if (pressed) {
      return 'green';
    } else {
      return 'gray';
    }
  };

  return (
    <View>
      <Button
        title={title}
        onPress={tagPressed}
        color={getColor()}
        // TODO change text color to make tags look like Tinder and Bumble
      />
    </View>
  );
};
