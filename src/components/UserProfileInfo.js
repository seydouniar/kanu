import React, { Component } from 'react';
import {
    ScrollView,
     View, 
     Modal, 
     Dimensions, 
     Text,
     Image,
     TouchableWithoutFeedback
    } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons'


const SCREEN_HEIGHT = Dimensions.get('screen').height;

class UserProfileInfo extends Component {
    state = {top:true}
    

    onScroll(event){
        const y = event.nativeEvent.contentOffset.y;
        if(y<=10){
            this.setState({top:true})
        }else{
            this.setState({top:false})
        }
        
    }
    render(){
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.visible}
            style={styles.modalStyle}
            onRequestClose={this.props.onRequestClose}>
            <View style= {styles.container}>
                
                
                <ScrollView 
                onScroll={this.onScroll.bind(this)}
                style={styles.modalStyle}
                showsVerticalScrollIndicator={false}>
                    <Image source={{uri:this.props.uri_image}} style={styles.image}/>
                    <Text>Description</Text>
                    <Text>Description</Text>
                    <Text>Description</Text>
                    <Text>Description</Text>
                    <Text>Description</Text>
                </ScrollView>
                   {this.state.top?
                   <Text style={styles.textStyle}>Nom Prenom</Text>:null}
                <View style={styles.iconViewStyle}>
                    <TouchableWithoutFeedback onPress={()=>console.log('came')}>
                        <View style={styles.iconStyle}>
                            <IonIcons name="camera" color="green" size={40} />
                        </View> 
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>console.log('came')}>
                        <View style={styles.iconStyle}>
                            <IonIcons name="pencil" color="red" size={40} />
                        </View> 
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.iconCloseStyle}>
                    <TouchableWithoutFeedback onPress={this.props.closeModal}>
                        <View >
                            <IonIcons name="close" color="gray" size={40} />
                        </View> 
                    </TouchableWithoutFeedback>
                </View>
            </View>
            
        </Modal>
    }
}

const styles = {
    container:{
        flex:1,
        justifyContent:'center',
        marginTop: 22,
        marginBottom:22,
        borderRadius:20

    },

    textStyle:{
        fontSize:25,
        color: "white",
        position:'absolute',
        bottom: 100,
        alignSelf:'center'
        
    },
    image:{
        height:SCREEN_HEIGHT-170,
        borderRadius:20
    },
    modalStyle: {
        borderRadius:20,
        marginBottom:20,
        margin:20,
    },

    iconCloseStyle:{
        
        position:'absolute',
        top:20,
        right:20,
        elevation:2
    },
    iconStyle:{
        width:60,
        height:60,
        backgroundColor:'#fff',
        borderRadius:30,
        justifyContent:'space-around',
        alignItems:'center',
        margin:10
    },
    iconViewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        alignSelf:'center',
        bottom:20
    }

}
export default UserProfileInfo;