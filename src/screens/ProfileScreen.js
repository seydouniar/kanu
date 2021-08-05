import React, { Component } from 'react';
import { View ,Text,ScrollView,PermissionsAndroid,TouchableOpacity} from 'react-native';
import {Button,ListItem,Input} from 'react-native-elements'
import {Header,Profile,ModalView,ActionSheet} from '../components/common';
import UserProfileInfo from '../components/UserProfileInfo';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {InfoView} from '../components/common';
import ListView from '../components/ListView';
import HobbiesList from '../components/HobbiesList';
import PhotosList from '../components/PhotosList';
import ProfileForm from '../components/ProfileForm';
import moment from 'moment';

class ProfileScreen extends Component {
    state = {visible:false,uri:null, visibleGalery:false,EditVisible:false,profileVisible:false};

   
    requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ],
            {
              title: "Authorisation camera",
              message:"Authoriser l'accès à votre appareil photo",
              buttonNeutral: "plutard",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
      
   
    setVisibleModal(visible){
        this.setState({visible})
    }

    setVisibleAction(visible) {
        this.setState({visibleGalery:visible})
    }


    async openGalery() {
        await this.requestCameraPermission();
        await this.props.takeFromLibrary(()=>{
            this.props.updatePhoto(this.props.uri,()=>{
                this.props.storeUser(this.props.user)
            });      
        });
        
        this.setVisibleAction(false);
    }
    async openCamera(){
            await this.requestCameraPermission();
            await this.props.takeFromCamera(()=>{
            this.props.updatePhoto(this.props.uri);
            });
        this.setVisibleAction(false)
    }
    gotoSetting(){
        this.props.navigation.navigate('setting')
    }
    
    onDismiss(){
        this.setVisibleAction(false);
        this.props.storeUser(this.props.user);

        this.setState({profileVisible:false})
       
    }
    disconnect(){
        this.props.logoutFacebook(()=>{
            this.props.navigation.navigate('welcome',{screen:'loading'})
        })
    }

    gotoEditItem(item){
        this.props.navigation.navigate('edit',{item})
    }
   

  

    closeModalEdit(){
        this.props.storeUser(this.props.user);
        this.setState({EditVisible:false})
    }

    render() {
        const {visible, visibleGalery,EditVisible,profileVisible} = this.state;
        const {photoURL,name,birth,desc,relation} = this.props.user;
        const age = moment(birth, "DD/MM/YYYY").fromNow().substring(0,3)
        return(
        <View style={styles.image}>
            <Header onPress={this.gotoSetting.bind(this)}/>
            <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity 
                onPress={()=>this.setState({profileVisible:true})}
                style={{position:'absolute',right:10,top:20}}>
                    <View >
                        <Icon5 name="user-edit" size={30} color='#0af'/>
                    </View>   
                </TouchableOpacity>
               
                
                <Profile 
                    onPressImage={()=>this.setVisibleModal(true)}
                    onPressIcon = {()=>this.setVisibleAction(true)}
                    photoURL = {photoURL}
                    name = {name}
                    age = {age}
                    />
                <InfoView title="A propos">
                    <Input 
                        value={desc}     
                        multiline
                        numberOfLines={3}
                        onChangeText={(value)=>{this.props.EditUserProp('desc',value)}} 
                        onEndEditing={()=>this.props.storeUser(this.props.user)}
                    />
                    <ListItem bottomDivider>
                        <Icon name="heart" size={18} />
                        <ListItem.Title>Relation</ListItem.Title>
                        <ListItem.Content>
                            <Text>{relation}</Text>
                        </ListItem.Content>
                    </ListItem>
                </InfoView>

                <InfoView title="Centre d'intérêts" editable={true} onPressEdit={()=>this.setState({EditVisible:true})}>
                   <HobbiesList 
                    renderHobbiesItem={this.renderHobbiesItem}
                    closeModalEdit={this.closeModalEdit.bind(this)}
                    EditVisible={EditVisible}/>
                </InfoView>

                <InfoView title="Mes photos">
                    <PhotosList editable={true}/>
                </InfoView>

                <InfoView title="Informations personnelle">
                    <ListView editable/>
                </InfoView>

                <Button type="outline" title="Deconnexion" onPress={this.disconnect.bind(this)}/>
            </View>
            </ScrollView>
            <ModalView
                visible={visible}
                closeModal={()=>this.setVisibleModal(!visible)}
            >
               <UserProfileInfo 
                uri_image={photoURL}
                name={name}
                user={this.props.user}
                />
            </ModalView>
            
            <ActionSheet 
            visible={profileVisible}
            onDismiss={this.onDismiss.bind(this)}
            onRequestClose={()=>this.setVisibleAction(false)}>
                <ProfileForm />
            </ActionSheet>
            
            <ActionSheet
                visible={visibleGalery}
                onDismiss={this.onDismiss.bind(this)}
                onRequestClose={()=>this.setVisibleAction(false)}
            >
                <View>
                    <View style={styles.lineHandler} />
                    <Button title=" Galerie" icon={
                        <Icon
                        name="photo"
                        size={15}
                        color="#0af"
                        />
                    } type="outline" 
                    onPress={this.openGalery.bind(this)}
                    raised/>
                    <Button  icon={
                        <Icon
                        name="camera"
                        size={15}
                        color="#0af"
                        />
                        } type="outline" raised 
                        title=" camera"
                        onPress={this.openCamera.bind(this)} />
                    <Button type="solid" 
                    title="Fermer" raised
                    buttonStyle={{backgroundColor:'#f00',marginLeft:5,marginRight:5}}
                    onPress={()=>this.setVisibleAction(false)}
                    />
                </View>
                
            </ActionSheet>
            

        </View>
        )
    }
}

const styles = {
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fffd',
        paddingTop:10
    },
    modal:{
        justifyContent:'center',
        alignItems:'center',
        marginRight:5,
        backgroundColor:'#fff',
        borderTopRightRadius:12,
        borderTopLeftRadius:12
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
      },
      lineHandler:{
          borderColor:'#ccc',
          borderWidth: 1,
          width: 50,
          alignItems:'center',
          alignSelf:'center',
          marginBottom:10
      }
}

const mapStateToprops =  (state)=>{
    const user=state.user;
    const image = state.image;
    return {user,uri:image.uri}
}
export default connect(mapStateToprops,actions)(ProfileScreen);