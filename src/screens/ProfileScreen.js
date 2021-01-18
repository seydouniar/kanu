import React, { Component } from 'react';
import { ImageBackground,View} from 'react-native';
import {Button} from 'react-native-elements'
import {Header,Profile} from '../components/common';
import UserProfileInfo from '../components/UserProfileInfo';
import {connect} from 'react-redux';
import * as actions from '../actions';



class ProfileScreen extends Component {
    state = {visible:false,uri:null, visibleGalery:false};

    UNSAFE_componentWillUpdate(){
        this.props.getUser()
    }
    async componentDidMount(){
        this.props.navigation.setOptions(
            {
                headerShown:false
            }
        );
    }

    childrenRender(){
        return (
        <View>
            <Button
            title="Galerie" 
            type='outline'
            onPress={()=>this.setState({visibleGalery:false})}/>
            <Button title="appareil" type="outline"
            onPress={()=>this.setState({visibleGalery:false})}
            />
        </View>)
    }
    onRequestClose(){
        this.setState({visible:false})
        this.setState({visibleGalery:false})
        console.log("on request close");
    }

    gotoSetting(){
        this.props.navigation.navigate('setting')
    }
    onPressIcon(){
        this.setState({visibleGalery: true});
    }
    onPressImage(){
        console.log("image pressed");
        //this.setState({visible:true});
    }

    closeModal(){
        this.setState({visible:false});
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
                    photoURL = {this.props.user.photoURL}
                    name = {this.props.user.name}
                    />
                <Button type="outline" title="Deconnexion" onPress={this.disconnect.bind(this)}/>
            </View>
            <UserProfileInfo 
                visible={this.state.visible}
                uri_image={this.props.user.photoURL} 
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
    const user=state.user.user;
    return {user}
}
export default connect(mapStateToprops,actions)(ProfileScreen);