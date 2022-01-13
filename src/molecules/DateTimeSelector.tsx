import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { formatTime, roundDate, formatDayOfWeekDate } from '../res/utilFunctions';
import { AppText } from '../atoms/AppText';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  onDateChange: (date: Date) => void;
  testID?: string;
}

export const DateTimeSelector: React.FC<Props> = ({ onDateChange, testID }: Props) => {
  const [currentDate, setCurrentDate] = useState(roundDate(new Date()));

  const onChange = (event: Event, selectedDate: Date, func: React.Dispatch<React.SetStateAction<Date>>) => {
    setCurrentDate(selectedDate);
    func(selectedDate);
    return;
  };
  return (
    <View>
      <View style={styles.dateTimeBlock}>
        <AppText>{formatTime(currentDate)}</AppText>
        <AppText style={styles.dateLine}>{formatDayOfWeekDate(currentDate.toLocaleDateString())}</AppText>
      </View>

      <DateTimePicker
        testID={testID ? testID : 'datetimepicker'}
        mode={'datetime'}
        display={'spinner'}
        minimumDate={new Date()}
        value={currentDate}
        /* eslint-disable */
                // @ts-expect-error
                onChange={(event: Event, date: Date) => onChange(event, date, onDateChange)}
                themeVariant={"dark"}
                format={'h:mm a'}
                minuteInterval={5}
                locale="en-US"
                textColor="black"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dateTimeBlock: {
        alignItems: 'center',
        marginTop: 40
    },
    dateLine: {
        fontSize: 20
    }
});