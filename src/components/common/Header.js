import React from 'react';
import {Text, View,TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({onPress}) => {
  const {iconStyle, viewStyle} = styles;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={viewStyle}>
      <Ionicons name="settings" size={30} style={iconStyle}/>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  iconStyle: {
    alignItems:'center',
    position:'absolute',
    marginTop:15,
    color:'white',
    right:10
  },
  viewStyle: {
    backgroundColor: '#0000',
    height: 60,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, heigth: 5},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
};

export {Header};
