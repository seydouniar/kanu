import React from 'react';
import {ListItem,Avatar } from 'react-native-elements';
import {View,StyleSheet} from 'react-native';

const MatchItem = ({photo,name,lastMessage,onPress})=>{
    return <View style={styles.container}>
        <ListItem containerStyle={{borderRadius:10,backgroundColor:'#cccc'}} onPress={onPress}>
            <Avatar rounded source={{uri:photo}} />
            
            <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
                <ListItem.Subtitle>{lastMessage.length<30?lastMessage:`${lastMessage.substring(0,35)}...`}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    </View>
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        margin: 5,
        borderRadius:10,
       
    }
});

export { MatchItem};