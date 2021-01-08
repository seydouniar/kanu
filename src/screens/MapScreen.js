import React, { Component } from 'react';
import { ImageBackground,Text, Image, View} from 'react-native'
import ListView from '../components/ListView'

import {connect} from 'react-redux'
import * as actions from '../actions'

const DATA = [
    { id: 1, text: 'Card #1', uri: 'https://www.linkpicture.com/q/7d9f4c4e593e55c5eb2f96b0b90db583.jpg' },
    { id: 2, text: 'Card #2', uri: 'https://www.linkpicture.com/q/57b567bc81e66408fb78988992eaaa07.jpg' },
    { id: 3, text: 'Card #3', uri: 'https://www.linkpicture.com/q/d540c54d3341a6996cae4c101a1f07bc.png' },
    { id: 4, text: 'Card #4', uri: 'https://www.linkpicture.com/q/57b567bc81e66408fb78988992eaaa07.jpg' },
    { id: 5, text: 'Card #5', uri: 'https://www.linkpicture.com/q/7d9f4c4e593e55c5eb2f96b0b90db583.jpg' },
    { id: 6, text: 'Card #6', uri: 'https://www.linkpicture.com/q/d540c54d3341a6996cae4c101a1f07bc.png' },
     ];
class MapScreen extends Component {
    
    componentDidMount(){
        this.props.navigation.jumpTo('match')
    }

    renderItem(item){
        return (<View key={item.id} style={styles.viewStyle}>
            <Image source={{uri:item.uri}} style={styles.itemImage} />
            <Text>{item.text}</Text>
        </View>)
    }

    render() {
        return(
            <ImageBackground 
            source = {require('../../assets/img/background.jpg')}
            style={styles.image}>
                <ListView data={DATA}
                renderItem = {this.renderItem}/>
            </ImageBackground>
        )

        
    }
}

const styles = {
    image: {
        marginTop:20,
        flex: 1,
        resizeMode: 'cover',
       
      },
    viewStyle:{
        justifyContent:'center',
        alignItems:'center',
        margin:15,
    },
    itemImage:{
        width : 100,
        height: 100,
        borderRadius:100/2
    }
}
export default connect(null,actions)(MapScreen);