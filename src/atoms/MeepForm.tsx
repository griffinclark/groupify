import React, { ReactChild, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { WHITE } from '../res/styles/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  children: ReactChild;
  InputList: { title: string; placeholder: string; settings?: string; value?: string }[];
  updatedValues: (e: { title: string; value: string | undefined }[]) => void;
  fullDate: (date: Date) => void;
}

export const MeepForm: React.FC<Props> = ({ children, InputList, updatedValues, fullDate }: Props) => {
  const [values, setValues] = useState<{ title: string; value: string | undefined }[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fullDate(currentDate);
  }, [currentDate]);

  const onDateChange = (
    event: Event,
    selectedDate: Date,
    item: { title: string; placeholder: string; settings?: string },
  ) => {
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      if (element.title == item.title) {
        if (item.settings === 'time') {
          setCurrentDate(selectedDate);
          element.value = selectedDate.toLocaleTimeString();
          updatedValues(values);
          return;
        }
        if (item.settings === 'date') {
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
        itemsArray[i].value = currentDate.toLocaleTimeString();
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
          <DateTimePicker
            testID={'dateTimePicker'}
            value={currentDate}
            mode={'date'}
            display={'compact'}
            onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
          />
          <Text style={styles.text}>{item.title}</Text>
          <View style={{ height: 15 }} />
        </View>
      );
    }
    if (item.settings === 'time') {
      return (
        <View key={item.title}>
          <DateTimePicker
            testID={'dateTimePicker'}
            value={currentDate}
            mode={'time'}
            onChange={(event: Event, date: Date) => onDateChange(event, date, item)}
          />
          <Text style={styles.text}>{item.title}</Text>
          <View style={{ height: 15 }} />
        </View>
      );
    }
    if (item.settings === 'password') {
      return (
        <View key={item.title}>
          <TextInput
            style={styles.textInputBody}
            onChangeText={(e) => setValue(e, item)}
            placeholder={item.placeholder}
            secureTextEntry={true}
          />
          <Text style={styles.text}>{item.title}</Text>
          <View style={{ height: 15 }} />
        </View>
      );
    }
    if (item.settings === 'default') {
      return (
        <View key={item.title}>
          <TextInput
            value={getValue(item.title)}
            style={styles.textInputBody}
            onChangeText={(e) => setValue(e, item)}
            placeholder={item.placeholder}
          />
          <Text style={styles.text}>{item.title}</Text>
          <View style={{ height: 15 }} />
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
  textInputBody: {
    fontSize: 18,
    backgroundColor: WHITE,
    borderRadius: 10,
    borderColor: '#BE8C2C',
    borderWidth: 1.5,
    padding: 8,
    marginTop: 5,
  },
  container: {
    width: '100%',
    flex: 5,
    justifyContent: 'space-between',
  },
  formContainer: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  text: {
    marginTop: 4,
    fontSize: 16,
  },
});