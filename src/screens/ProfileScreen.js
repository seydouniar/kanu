import React, { Component } from 'react';
import { ImageBackground,View} from 'react-native';
import {Button} from 'react-native-elements'
import {Header, Profile} from '../components/common';
import UserProfileInfo from '../components/UserProfileInfo';
import {connect} from 'react-redux';
import * as actions from '../actions';
import * as ImagePicker from 'expo-image-picker';


class ProfileScreen extends Component {
    state = {visible:false,uri:null};

    UNSAFE_componentWillUpdate(){
        this.props.getUser()
    }
    async componentDidMount(){
        this.props.navigation.setOptions(
            {
                headerShown:false
            }
        );
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        
    }

    onRequestClose(){
        this.setState({visible:false})
    }

    gotoSetting(){
        this.props.navigation.navigate('setting')
    }
    async onPressIcon(){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }else{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [5, 6],
                quality: 1,
            });
            if(!result.cancelled){
                this.setState({uri:result.uri})
                this.props.updatePhoto( result.uri)
            }
             
            
        }
    }
    onPressImage(){
        this.setState({visible:true});
    }

    closeModal(){
        this.setState({visible:false});
        console.log(this.state.visible);
    }

    disconnect(){
        this.props.logoutFacebook(()=>{
            this.props.navigation.navigate('welcome',{screen:'loading'})
        })
    }
    render() {
        
        return(
            <ImageBackground 
            source = {require('../../assets/img/background.jpg')}
            style={styles.image}>
            <Header onPress={this.gotoSetting.bind(this)}/>
            <View style={styles.container}>
                <Profile 
                    onPressImage={this.onPressImage.bind(this)}
                    onPressIcon = {this.onPressIcon.bind(this)}
                    user = {this.props.user.user}
                    />
                <Button type="outline" title="Deconnexion" onPress={this.disconnect.bind(this)}/>
            </View>
            <UserProfileInfo 
            visible={this.state.visible}
            uri_image={this.props.user.user.photoURL} 
            closeModal={this.closeModal.bind(this)}
            onRequestClose={this.onRequestClose.bind(this)}/>
            </ImageBackground>
        )
    }
}

const styles = {
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fffd'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
      },
    
}

const mapStateToprops =  (state)=>{
    return {user:state.user}
}
export default connect(mapStateToprops,actions)(ProfileScreen);