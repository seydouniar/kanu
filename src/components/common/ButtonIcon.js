import React from 'react';
import {Text, View,TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonIcon = ({onPress,color,name}) => {
  const {iconStyle, viewStyle} = styles;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={viewStyle}>
      <Ionicons name={name} size={40} color={color} style={iconStyle}/>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  iconStyle: {
    alignItems:'center',
    justifyContent:'center',
  },
  viewStyle: {
    backgroundColor: '#0000',
  },
};

export {ButtonIcon};
