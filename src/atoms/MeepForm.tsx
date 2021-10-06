import React, { ReactChild, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BLACK } from '../res/styles/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatIosTimeInput, formatTime, roundDate } from '../res/utilFunctions';
import { AppText } from './AppText';
import { AppTextInput } from './AppTextInput';

interface Props {
  children?: ReactChild;
  inputList: {
    title: string;
    placeholder: string;
    settings?: string;
    value?: string;
    func: React.Dispatch<React.SetStateAction<string>>;
  }[];
}

export const MeepForm: React.FC<Props> = ({ children, inputList }: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(roundDate(new Date()));

  const onDateChange = (
    event: Event,
    selectedDate: Date,
    item: { title: string; placeholder: string; settings?: string; func: React.Dispatch<React.SetStateAction<string>> },
  ) => {
    if (item.settings === 'time') {
      setShowTimePicker(false);
      setCurrentDate(selectedDate);
      if (Platform.OS === 'android') {
        const newTime = formatTime(selectedDate.toLocaleTimeString());
        item.func(newTime);
        return;
      }
      if (Platform.OS === 'ios') {
        const newTime = formatIosTimeInput(selectedDate.toLocaleTimeString());
        item.func(newTime);
        return;
      }
    }
    if (item.settings === 'date') {
      setShowDatePicker(false);
      setCurrentDate(selectedDate);
      const newDate = selectedDate.toLocaleDateString();
      item.func(newDate);
      return;
    }
  };

  const ListItems = inputList.map((item) => {
    if (item.settings === 'date') {
      return (
        <View key={item.title}>
          <AppText style={styles.text}>{item.title}</AppText>
          {showDatePicker && (
            <DateTimePicker
              testID={'dateTimePicker'}
              value={currentDate}
              mode={'date'}
              display={'default'}
              style={styles.dateTimePicker}
              /* eslint-disable */
              // @ts-expect-error
              onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
              /* eslint-enable */
              textColor={BLACK}
              themeVariant={'light'}
            />
          )}
          {Platform.OS === 'android' && (
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <AppText style={styles.dateTime}>
                {currentDate ? currentDate.toLocaleDateString() : 'no date selected'}
              </AppText>
            </TouchableOpacity>
          )}
          {Platform.OS === 'ios' && (
            <DateTimePicker
              style={styles.dateTimePicker}
              testID={'dateTimePicker'}
              value={currentDate}
              mode={'date'}
              display={'default'}
              /* eslint-disable */
              // @ts-expect-error
              onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
              /* eslint-enable */
              textColor={BLACK}
              themeVariant={'light'}
            />
          )}
        </View>
      );
    }
    if (item.settings === 'time') {
      return (
        <View key={item.title}>
          <AppText style={styles.text}>{item.title}</AppText>
          {showTimePicker && (
            <DateTimePicker
              style={styles.dateTimePicker}
              testID={'dateTimePicker'}
              value={currentDate}
              mode={'time'}
              display={'default'}
              /* eslint-disable */
              // @ts-expect-error
              onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
              /* eslint-enable */
              textColor={BLACK}
              themeVariant={'light'}
            />
          )}
          {Platform.OS === 'android' && (
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <AppText style={styles.dateTime}>{currentDate ? formatTime(currentDate) : 'no time selected'}</AppText>
            </TouchableOpacity>
          )}
          {Platform.OS === 'ios' && (
            <DateTimePicker
              style={styles.dateTimePicker}
              testID={'dateTimePicker'}
              value={currentDate}
              mode={'time'}
              display={'default'}
              /* eslint-disable */
              // @ts-expect-error
              onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
              /* eslint-enable */
              textColor={BLACK}
              themeVariant={'dark'}
            />
          )}
          {/* <View style={{ height: 15 }} /> */}
        </View>
      );
    }
    // if (item.settings === 'password') {
    //   return (
    //     <View key={item.title}>
    //       <AppTextInput
    //         label={item.title}
    //         onChangeText={(e) => item.func(e)}
    //         placeholder={item.placeholder}
    //         secureTextEntry={true}
    //         autoFocus={true}
    //       />
    //     </View>
    //   );
    // }
    if (item.settings === 'default') {
      return (
        <View key={item.title}>
          <AppTextInput
            label={item.title}
            onChangeText={(e) => item.func(e)}
            placeholder={item.placeholder}
            value={item.value}
          />
        </View>
      );
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>{ListItems}</View>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // flex: 1,
    justifyContent: 'flex-start',
  },
  formContainer: {
    padding: 20,
    // flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  dateTimePicker: {
    borderRadius: 5,
    borderColor: '#C5C5C5',
    // borderWidth: 1,
    marginVertical: 10,
    height: 43,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  dateTime: {
    color: 'dodgerblue',
  },
});
