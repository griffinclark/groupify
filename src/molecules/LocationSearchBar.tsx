import React from 'react';
import { BLACK } from '../res/styles/Colors';

export const LocationSearchBar = (setSearchInput) => {
  <TextInput
    style={styles.input}
    placeholder={'placeholder'}
    onChangeText={async (text) => {
      setSearchInput(text);
      setSuggestedLocationOverrides(await googlePlacesQuery(text));
      if (text.length == 0) {
        setSuggestedLocationOverrides([]);
      }
    }}
    onPressOut={async () => {
      setSuggestedLocations(await googlePlacesQuery(locationInput));
      // TODO users have to tap twice to get out of search. Yuck
    }}
    testID="SearchBar"
    onPressIn={() => setScreenToDisplay(ScreenName.LocationChange)}
    defaultValue={locationInput}
    selectTextOnFocus={true}
  />;
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingRight: 10,
    marginLeft: 5,
    color: BLACK,
  },
});
