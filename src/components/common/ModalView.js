import React from 'react';
import {View, Modal,TouchableHighlight} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons'


const ModalView = ({children, visible,closeModal}) =>{
    return (
        <Modal
            animated
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}>
            <View style= {styles.container}>
                {children}
                <View style={styles.iconCloseStyle}>
                    <TouchableHighlight onPress={closeModal}>
                        <View >
                            <IonIcons name="arrow-back" color="gray" size={40} />
                        </View> 
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}

const styles = {
    container:{
        flex:1,
        justifyContent:'center',
    },

    iconCloseStyle:{
        position:'absolute',
        top:20,
        left:20,
        elevation:2
    },
    
}

export {ModalView};