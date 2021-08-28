import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  selectedItem: (ev: string) => void;
}

export const DropdownSelector: React.FC<Props> = ({ selectedItem }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Carrot', value: 'carror' },
  ]);

  useEffect(() => {
    open ? Keyboard.dismiss : null;
  }, [open]);

  return (
    <TouchableOpacity onPress={() => setOpen(!open)}>
      <DropDownPicker
        style={{ backgroundColor: 'white', width: '90%', alignSelf: 'center' }}
        dropDownContainerStyle={{ width: '90%', alignSelf: 'center', backgroundColor: 'white', zIndex: 50000 }}
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        items={items}
        setItems={setItems}
      />
    </TouchableOpacity>
  );
};
