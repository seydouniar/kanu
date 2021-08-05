import React, {Component} from 'react';
import {TouchableHighlight, View,StyleSheet,Text} from 'react-native';
import {ListItem} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';

import {  ModalView } from './common';
import EditPropComponent from './EditPropComponent';
import {connect} from 'react-redux';
import * as actions from '../actions';
class ListView extends Component {
    state={visible:false,item:{}}
    onPressItem(item){
        this.setState({visible:true});
        this.setState({item});
        
    }

    uptdateItem(item,value){
        const {caracteres} = this.props.user;
        const updateData = caracteres.map(it=>{
            if(it.id===item.id){
                this.setState({item:{...item,value}});
                return {...item,value}
            }else{
                return it
            }
        });
        this.props.EditUserProp('caracteres',updateData);
       
    }

    onValueChange(value,item){
        this.uptdateItem(item,value);
    }
    onDismiss(){
        this.props.storeUser(this.props.user);
        this.setState({visible:false});
        console.log("dismiss");
    }

     //render caracteres
     renderInfoItem(item){
        
        return (
            <ListItem bottomDivider>
                <ListItem.Title>{item.label}</ListItem.Title>
                <ListItem.Content />
                {item.value?<Text>{typeof item.value ==='number'?`${item.value.toFixed(2)} ${item.values.unit}`:item.value} </Text>:<Text>non defini</Text>}
                <Icon name={item.icon} size={20} />
                <ListItem.Chevron/>
                
            </ListItem>
        )
    }

    renderList(){
        const {caracteres} = this.props.user;
        return caracteres.map(
            (item,i)=>{
                return <View key={i}>
                    <TouchableHighlight onPress={this.onPressItem.bind(this,item)}>
                        <View > 
                        {this.renderInfoItem(item)}
                        </View>
                    </TouchableHighlight>
                    
                </View>
            }
        )
    }
    render(){
        const {visible,item} = this.state;
        
        return <View>
            {this.renderList()}
            {this.props.editable && <ModalView
                visible={visible}
                closeModal = {this.onDismiss.bind(this)}
                >
               
                <View style={styles.container}>
                    { item.type==='slider'?
                    <EditPropComponent type={item.type} 
                    label={item.label} 
                    onValueChange={(value)=>this.onValueChange(value,item)}
                    value={item.value}
                    unit={item.values.unit}
                    max={item.values.max}
                    min={item.values.min}
                    step={item.values.step}
                    />:
                    <EditPropComponent type={item.type} 
                    label={item.label} 
                    onValueChange={(value)=>this.onValueChange(value,item)}
                    value={item.value}
                    values={item.values}
                    />}
                </View>
                
            </ModalView>}
        </View>
        
    }
}


const styles =  StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#fff',
        marginBottom:22,
        marginTop:22,

    }
})
const mapStateToprops =  (state)=>{
    const user=state.user;
    return {user}
}

export default connect(mapStateToprops,actions)(ListView);