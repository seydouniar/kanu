import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons'

const URI_DEFAULT = '../../../assets/img/default_user.jpg';

const Profile =({onPressImage,onPressIcon,photoURL, name,age})=>  {
    
    return (
        <View>
            <TouchableWithoutFeedback onPress={onPressImage}>
                <View>
                {   
                    photoURL?
                    <Image source={{uri:photoURL}} style={styles.imageProfile} />:
                    <Image source={require(URI_DEFAULT)} style={styles.imageProfile} />
                }
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.iconStyle}>
                <TouchableWithoutFeedback onPress={onPressIcon}>
                    <View>
                        <IonIcons name="camera" color="#5cf" size={40} />
                    </View> 
                </TouchableWithoutFeedback>

            </View>
            
            <Text style={styles.textStyle}>{name}, {age}</Text>
            
        </View>
    );
}

const styles = {
 
    textStyle:{
        fontSize:25,
        marginTop:10
    },
    imageProfile:{
        width:200,
        height:200,
        borderRadius:200/2,
    },
    iconStyle:{
        position:'absolute',
        width:50,
        height:50,
        top:150,
        right:10,
        borderRadius:25,
        backgroundColor:'#000a',
        alignItems:'center',
        justifyContent:'center'
    }
}

export {Profile};