import React from 'react';
import {View,Text, StyleSheet, Dimensions,TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const WIDTH_SCREEN = Dimensions.get("screen").width;
const InfoView = ({title,children,editable,onPressEdit}) => {
    return (
    <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
            {title && <Text style={styles.titleStyle}>{title}</Text>}
            {editable && <TouchableWithoutFeedback onPress={onPressEdit}>
                <View >
                    <Icon name="pencil" color="#5cf" size={30}/>
                </View>
                </TouchableWithoutFeedback>}
        </View>
        
        <View style={styles.viewStyle}>
            {children}
        </View>
    </View>);
}

const styles = StyleSheet.create(
    {
        container:{
            alignItems:'flex-start',
            margin:5,
            width:WIDTH_SCREEN-20,
            backgroundColor: '#fff',
            shadowColor:'#aaa',
            shadowOffset: {width:0,height:-10},
            shadowOpacity:0.2,
            elevation:1
            
        },
        titleStyle:{
            fontSize:25,
            padding:5,
            flex:1
        },
        viewStyle:{
            marginStart:10,
            width:WIDTH_SCREEN-20,
        }
    }

)

export {InfoView}