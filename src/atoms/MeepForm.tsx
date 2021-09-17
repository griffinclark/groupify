import React, { ReactChild, useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BLACK, WHITE } from '../res/styles/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatIosTimeInput, formatTime, roundDate } from '../res/utilFunctions';
import { AppText, AppTextInput } from './AtomsExports';

interface Props {
  children: ReactChild;
  InputList: { title: string; placeholder: string; settings?: string; value?: string }[];
  updatedValues: (e: { title: string; value: string | undefined }[]) => void;
}

export const MeepForm: React.FC<Props> = ({ children, InputList, updatedValues }: Props) => {
  const [values, setValues] = useState<{ title: string; value: string | undefined }[]>([]);
  const [currentDate, setCurrentDate] = useState(roundDate(new Date()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (
    event: Event,
    selectedDate: Date = currentDate,
    item: { title: string; placeholder: string; settings?: string },
  ) => {
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      if (element.title == item.title) {
        if (item.settings === 'time') {
          setShowTimePicker(false);
          setCurrentDate(selectedDate);
          if (Platform.OS === 'android') {
            element.value = formatTime(selectedDate.toLocaleTimeString());
            updatedValues(values);
            return;
          }
          if (Platform.OS === 'ios') {
            element.value = formatIosTimeInput(selectedDate.toLocaleTimeString());
            updatedValues(values);
            return;
          }
        }
        if (item.settings === 'date') {
          setShowDatePicker(false);
          setCurrentDate(selectedDate);
          element.value = selectedDate.toLocaleDateString();
          updatedValues(values);
          return;
        }
      }
    }
  };

  useEffect(() => {
    const itemsArray: { title: string; value: string | undefined }[] = [];
    for (let i = 0; i < InputList.length; i++) {
      const element = InputList[i];
      itemsArray.push({
        title: element.title,
        value: element.value,
      });
      if (itemsArray[i].title === 'Date') {
        itemsArray[i].value = currentDate.toLocaleDateString();
      }
      if (itemsArray[i].title === 'Time') {
        if (Platform.OS === 'android') {
          itemsArray[i].value = formatTime(currentDate.toLocaleTimeString());
        }
        if (Platform.OS === 'ios') {
          itemsArray[i].value = formatIosTimeInput(currentDate.toLocaleTimeString());
        }
      }
    }
    setValues(itemsArray);
    updatedValues(itemsArray);
  }, []);

  const getValue = (title: string) => {
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      if (element.title == title) {
        const value = values[i].value;
        return value;
      }
    }
  };

  const setValue = (e: string, item: { title: string; placeholder: string }) => {
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      if (element.title == item.title) {
        element.value = e;
        updatedValues(values);
        return;
      }
    }
  };

  const ListItems = InputList.map((item) => {
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
              onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
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
              onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
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
              onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
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
              onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
              textColor={BLACK}
              themeVariant={'light'}
            />
          )}
          <View style={{ height: 15 }} />
        </View>
      );
    }
    if (item.settings === 'password') {
      return (
        <View key={item.title}>
          <AppTextInput
            label={item.title}
            onChangeText={(e) => setValue(e, item)}
            placeholder={item.placeholder}
            secureTextEntry={true}
            autoFocus={true}
          />
        </View>
      );
    }
    if (item.settings === 'default') {
      return (
        <View key={item.title}>
          <AppTextInput
            label={item.title}
            onChangeText={(e) => setValue(e, item)}
            placeholder={item.placeholder}
            value={getValue(item.title)}
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
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  dateTimePicker: {
    fontSize: 18,
    backgroundColor: WHITE,
    borderRadius: 5,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    padding: 8,
    opacity: 1,
    // marginVerticle: 10,
    flex: 1,
    height: 43,
    // marginTop: 5,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  dateTime: {
    color: 'dodgerblue',
  },
});
