import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const SelectField = ({
    data, 
    labelField, 
    valueField, 
    placeholder, 
    value, 
    onChangeSelect
}) => {
  const [val, setVal] = useState(value);
  useEffect(() => {
    setVal(value);
  }, [value]);
    return (
    <View className="border border-neutral-200 rounded-full px-4 py-2">
    <Dropdown
      data={data}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      value={val}
      onChange={(item) =>{ 
        setVal(item[valueField]) ;onChangeSelect(item);
       }}
    />
  </View>
  )
}

export default SelectField