import React from 'react';
import {Text, View,TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({onPress,title}) => {
  const {iconStyle, viewStyle} = styles;
  return (
   
    <View style={viewStyle}>
       <TouchableWithoutFeedback onPress={onPress}>
          <View>
            <Ionicons name="arrow-back" size={30} style={iconStyle}/>
          </View>
       </TouchableWithoutFeedback>
      
       <Text style={styles.titleStyle}>{title}</Text>
    </View>
    
  );
};

const styles = {
  iconStyle: {
    justifyContent:'center',
    position:'absolute',
    marginTop:15,
    color:'white',
    left:10
  },
  viewStyle: {
    backgroundColor: '#0ac',
    height: 70,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:80,
    paddingTop: 10,
    shadowColor: '#aaaa',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity:0.5,
    shadowRadius:15,
    elevation: 2,
  },
  titleStyle:{
    alignSelf:'center',
    justifyContent:'center',
    color:'#fff',
    fontSize:30
  }
};

export {Header};
