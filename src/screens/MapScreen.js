import React, { Component } from 'react';
import { StyleSheet, View,Alert,BackHandler,Image} from 'react-native'
import Mapview,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import * as actions from '../actions'


class MapScreen extends Component {
  
    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
    
    
    UNSAFE_componentWillUnmount() {
        this.backHandler.remove();
      }

    render() {
        const {localisation,photoURL} = this.props.user;
        return(
          <View style={styles.container}>
            
            {localisation&&
            <View style={{flex:1}}>
            <Mapview 
              provider={PROVIDER_GOOGLE}
              scrollEnabled={false}
              zoomEnabled={true}
              style={{flex:1}}
              initialRegion={{
                latitude:localisation.coords.lat,
                longitude:localisation.coords.lng,
                latitudeDelta: 0.315,
                longitudeDelta: 0.021,
              }}
           >
             
             <Marker coordinate={{latitude:localisation.coords.lat,longitude:localisation.coords.lng}}>
                <View>
                  <Image source={{uri:photoURL}} style={styles.imgMarker}/>
                </View>
             </Marker>
            </Mapview>
            </View>}
          </View>
          
        )

        
    }
}

const styles = StyleSheet.create({
    itemImage:{
        width : 100,
        height: 100,
        borderRadius:100/2
    },
  
    container: {
      flex:1,
    },
    imgMarker:{
      height:50,
      width:50,
      borderRadius:25,
      justifyContent:'center',
      alignItems:'center'
    }
  });

const mapStateToprops = (state)=>{
  const user = state.user;
  return {user}
}
export default connect(mapStateToprops,actions)(MapScreen);