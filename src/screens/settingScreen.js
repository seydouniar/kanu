import React, { Component } from 'react';
import {View, Text} from 'react-native'
import {ListItem,Button} from 'react-native-elements'
class SettingScreen extends Component {
    componentDidMount(){
        this.props.navigation.setOptions({
            title: 'Paramètres',
            
            headerStyle: {
                backgroundColor: '#0ac',
              },
            headerTitleStyle: {
                fontWeight: 'bold',
                alignItems:'center',
                color:'white'
              }
        })
    }
    render() {
        const list = [
            {
                title:'information personnel'
            },
            {
                title:'Mon compte'
            },
            {
                title:'Mes preferences'
            }
        ]
        return(
            <View>
                {
                list.map((l,i)=>{
                    return (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{l.title}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron/>
                    </ListItem>)
                })
                }
            </View>
        )
    }
}

export default SettingScreen;