import React,{Component} from 'react';
import {View, StyleSheet,Text} from 'react-native';
import EditPropComponent from '../components/EditPropComponent'

class EditScreen extends Component {
   
    render (){
        console.log("in edit",this.props.route.params);
        const {item} = this.props.route.params
        return (<View style={styles.container}>
            <Text>{item.label}</Text>
            <EditPropComponent type={item.type} />
        </View>);
    }
}

const styles = StyleSheet.create({
 container:{
     alignItems:'center',
     justifyContent:'center',
     flex:1
 }
})

export default EditScreen;
