import React from 'react';
import {Modal,View,
  } from 'react-native';

const ActionSheet  =({visible,children,onRequestClose})=>{
    
    return (
        <Modal 
            animationType="slide"
            transparent={true}
            visible={visible}
            style={styles.modalStyle}
            onRequestClose={onRequestClose}
        >
        <View style={styles.overlay}>
             {children}
        </View> 
        </Modal>
    )
}

const styles = {
    overlay:{
        justifyContent:'flex-end',
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
   
}

export {ActionSheet};