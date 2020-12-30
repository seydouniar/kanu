import React from 'react';
import {Text, View} from 'react-native';

const Header = (props) => {
  const {textStyle, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.hearderText}</Text>

    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '5'
  },
  viewStyle: {
    backgroundColor: '#F8F8F878',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, heigth: 5},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
};

export {Header};
