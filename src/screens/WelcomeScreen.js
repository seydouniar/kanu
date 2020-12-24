import React, { Component } from 'react';
import {SocialIcon,Button} from 'react-native-elements';
import {
    ScrollView,
    View,
    Text,
    Dimensions, 
    AsyncStorage,
    ImageBackground
} from 'react-native';
import * as actions from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import AppLoading from 'expo-app-loading'

const SCREEN_WIDTH = Dimensions.get('window').width;
class WelcomeScreen extends Component {

    state = {token:null}
    async componentDidMount() {
      let token = await AsyncStorage.getItem('fb_token');
      if(token){
        this.setState({token})
        this.props.navigation.navigate('main')
      } else {
        this.setState({token:false})
      }
    }

    async UNSAFE_componentWillUpdate() {
        let token = await AsyncStorage.getItem('fb_token');
        if(token){
          this.setState({token})
          this.props.navigation.navigate('main')
        } else {
          this.setState({token:false})
        }
      }

    onFacebookBtnPress=()=>{
        this.props.loginFacebook();
    }

    onInstagramBtnPress(){

    }

    onButtonPress (){
        this.props.navigation.navigate('login')
    }
    
render() {

    if(_.isNull(this.state.token)){
        return <AppLoading />
    }

    return(
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
                title="Avec Instagram"
                type='instagram'
                />
            <Button  
            title="Créer un compte"
            buttonStyle={styles.button}
            onPress={this.onButtonPress.bind(this)}
            />
            
            <Button
                title="J'ai déjà un compte"
                type="clear"
                onPress={this.onButtonPress.bind(this)}
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
    return { token:auth.token}
}
export default connect(mapToStateProps,actions)(WelcomeScreen);