import React, { Component } from 'react';
import {Button,Image} from 'react-native-elements';
import {Platform, View} from 'react-native';
import * as actions from '../actions';
import {connect} from 'react-redux'
import {DatePicker} from '../components/common'
import Moment from 'moment';

const URI_DEFAULT = 'https://linkpicture.com/q/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'
class UserProfileForm extends Component {
    state = {date:"",show:false}

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({show:Platform.OS === 'ios'});
        this.setState({date:this.formatDate(currentDate)});
        this.onDateChanged(this.state.date)
      };

    formatDate = (date)=>{
        Moment.locale('fr');
        return Moment(date).format('DD/MM/yyyy');
    };

    showDatepicker = () => {
        this.setState({show:true})  
      };

    onNameChanged(text){
        this.props.userNameChanged(text);
    }
    onDateChanged(text){
        this.props.userDateChanged(text);
    }

    onButtonPressed(){
        const {name,date}= this.props
        this.props.storeUser({name,date},()=>{
            console.log("success");
        })
    }
    render() {
        const {name,date}= this.props;
        const {image, container} = styles;
        return (
            <View style={container}>
                <Image source={{uri:URI_DEFAULT}} style={image} />
                
                <DatePicker 
                    onChangeDate={this.onChange.bind(this)}
                    value = {date}
                    placeholder="12/12/1995"
                    show={this.state.show}
                    onPress={this.showDatepicker.bind(this)}
                />
            </View>
        )
    }
}

const styles = {
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fffc'
    },
    image:{
        width:200,
        height:200,
        borderRadius:200/2,
        alignItems:'center'
    },

}
const mapStateToProps = (state)=>{
    const user = state.user
    return user;
}

export default connect(mapStateToProps,actions)(UserProfileForm);