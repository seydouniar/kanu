import React, { Component } from 'react';
import {
     View,  
     Dimensions, 
     Text,
     Image,
    } from 'react-native';
import {InfoView,ScrollBar} from '../components/common'
import HobbiesList from '../components/HobbiesList';
import ListView from '../components/ListView'
import PhotosList from './PhotosList';


const SCREEN_HEIGHT = Dimensions.get('screen').height;
class UserProfileInfo extends Component {
    
    state = {top:true}
    scrolling(e){
        const y = e.nativeEvent.contentOffset.y;
        if(y<25){
            this.setState({top:true})
        }else{
            this.setState({top:false})
        }
    }
    render(){
        return (
        <View  style={styles.modalStyle}>
           <ScrollBar 
                scrolling={this.scrolling.bind(this)}
                showsVerticalScrollIndicator={false}>
                
                <Image source={{uri:this.props.uri_image}} style={styles.image}/>
                {this.state.top&&<View style={{position:'absolute',margin:5,elevation:1}}>
                    <HobbiesList EditVisible={false} />
                </View>}
                <View style={{borderRadius:8,marginBottom:20}}>
                    
                    <InfoView title="A propos">
                        <Text>{this.props.user.desc}</Text>
                    </InfoView>

                    <InfoView title="Centre d'intérêts">
                        <HobbiesList EditVisible={false} />
                    </InfoView>

                    <InfoView title="Mes photos">
                        <PhotosList />
                    </InfoView>
       

                    <InfoView title="Informations personnelle">
                        <ListView editable={false}/>
                    </InfoView>
                    
                    
                </View>  
            </ScrollBar>
            
            
            {this.state.top?<View style={styles.buttonNameViewStyle} >
                <Text style={styles.textStyle}>{this.props.name}</Text>
                 </View>:null}    
        </View>)
            
    }
}

const styles = {
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#ccc',
        marginBottom:20
    },

    
    textStyle:{
        fontSize:25,
        color: "white",
        alignSelf:'center'
    },
    image:{
        flex:1,
        height:SCREEN_HEIGHT-135,
        resizeMode: 'stretch',
   
    },
    modalStyle: {
        borderRadius:8,
        marginBottom:20,
        margin:5,
        marginTop:50,
        backgroundColor:'#ccc'
    },

 
    
    buttonNameViewStyle:{
        position:'absolute',
        justifyContent:'center',
        alignSelf:'center',
        bottom:100,
    },
    iconViewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'center',
    }

}
export default UserProfileInfo;