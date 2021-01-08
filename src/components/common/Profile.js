import React, {useState} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {Button} from 'react-native-elements';
import IonIcons from 'react-native-vector-icons/Ionicons'

const URI_DEFAULT = '../../../assets/img/default_user.jpg';

const Profile = ({onPressImage, onPressIcon,user}) =>{
    
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onPressImage}>
                <View>
                {   
                    user.photoURL?
                    <Image source={{uri:user.photoURL}} style={styles.imageProfile} />:
                    <Image source={require(URI_DEFAULT)} style={styles.imageProfile} />
                }
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={onPressIcon}>
                <View style={styles.iconStyle}>
                    <IonIcons name="camera" color="green" size={40} />
                </View> 
            </TouchableWithoutFeedback>
            

            <Text style={styles.textStyle}>{user.name}, Age</Text>
            <Button type="clear" title="Modifier votre profile"/>
            
        </View>
    )
};

const styles = {
    container:{
        alignItems:'center',
    },
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
        width:70,
        height:70,
        right:20,
        bottom:70,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:40
    }
}

export {Profile};