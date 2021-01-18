import React, { Component } from 'react';
import {View,Text} from 'react-native';
import {ActionSheet} from './common'
class ActionSheetComponent extends Component{
    render(){
        return (
        <ActionSheet 
        visible={this.props.visibleSheet}
        onRequestClose={this.props.onRequestClose}>
           <View style={styles.container}>
             <Text>hello world</Text>  
            </View> 
        </ActionSheet>)
    }
}

const styles = {
    container:{
        backgroundColor:'white',
        borderTopRightRadius:12,
        borderTopLeftRadius:12,
        paddingTop: 20
    }
}
export default ActionSheetComponent;