import React, { Component } from 'react';
import {SocialIcon,Button} from 'react-native-elements';
import {
    ScrollView,
    View,
    Text,
    Dimensions, 
    ImageBackground,
} from 'react-native';
import * as actions from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import {firebase} from '../firebase/config'


const SCREEN_WIDTH = Dimensions.get('window').width;
class WelcomeScreen extends Component {

    onFacebookBtnPress=()=>{
        this.props.loginFacebook();
    }

    onGoogleBtnPress(){
        this.props.loginGoogle();
    }

    onButtonPress = (text)=>{
        this.props.navigation.navigate(text)
    }
    
render() {
    return (
    <ImageBackground style={styles.image}
    source={require('../../assets/img/background.jpg')}>
    <ScrollView horizontal pagingEnabled>
        <View style={styles.viewStyle}>
            <Text style={styles.text}>Welcome Screen</Text>
        </View>
        <View style={styles.viewStyle}>
            <Text style={styles.text}>Welcome Screen</Text>
        </View>
        <View style={styles.viewStyle}>
            <SocialIcon
                light
                style={{width:300}}
                title='Sign In With Facebook'
                button
                type='facebook'
                onPress={this.onFacebookBtnPress}
                />
            <SocialIcon
                button
                raised
                style={{width:300}}
                title="Avec Google"
                type='google'
                onPress={this.onGoogleBtnPress.bind(this)}
                />
            <Button  
            title="Créer un compte"
            buttonStyle={styles.button}
            onPress={()=>this.onButtonPress('create')}
            />
            
            <Button
                title="J'ai déjà un compte"
                type="clear"
                onPress={()=>this.onButtonPress('login')}
                />
        </View>
                
            </ScrollView>
        </ImageBackground>
    )
    }
}

const styles = {
    viewStyle:{
        flex:1,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        backgroundColor:'rgba(0,150,150,0.75)',
        width:300,
        borderRadius:10,
        marginTop: 20
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    text: {
        fontSize: 20,
        color: '#fff'
    }
}

const mapToStateProps = ({auth})=>{
    return { user:auth.user}
}
export default connect(mapToStateProps,actions)(WelcomeScreen);