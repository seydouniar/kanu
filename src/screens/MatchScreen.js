import React, { Component } from 'react';
import {Dimensions, Text,ImageBackground} from 'react-native';
import Swipe from '../components/Swipe';
import {Card} from 'react-native-elements'

const WIN_HEIGHT = Dimensions.get('window').height;
const DATA = [
    { id: 1, text: 'Card #1', uri: 'https://www.linkpicture.com/q/7d9f4c4e593e55c5eb2f96b0b90db583.jpg' },
    { id: 2, text: 'Card #2', uri: 'https://www.linkpicture.com/q/57b567bc81e66408fb78988992eaaa07.jpg' },
    { id: 3, text: 'Card #3', uri: 'https://www.linkpicture.com/q/d540c54d3341a6996cae4c101a1f07bc.png' },
    { id: 4, text: 'Card #4', uri: 'https://www.linkpicture.com/q/57b567bc81e66408fb78988992eaaa07.jpg' },
    { id: 5, text: 'Card #5', uri: 'https://www.linkpicture.com/q/7d9f4c4e593e55c5eb2f96b0b90db583.jpg' },
    { id: 6, text: 'Card #6', uri: 'https://www.linkpicture.com/q/d540c54d3341a6996cae4c101a1f07bc.png' },
     ];

class MatchScreen extends Component {
    
  
   onSettingBtnPressed(){
       this.props.navigation.navigate('config',{screen:'setting'})
   }

   renderCard(item) {
    return (
      <Card key={item.id} containerStyle={{padding:0,borderRadius:20}}>
        <Card.Image source= {{ uri: item.uri }} style={{height:WIN_HEIGHT-220,borderRadius:20}}/>
        <Card.Title>{item.text}</Card.Title>
         
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="All Done!">
        <Text style={{ marginBottom: 10 }}>
          There's no more content here!
        </Text>
        
      </Card>
    );
  }

    render() {
        return(
            <ImageBackground 
            source = {require('../../assets/img/background.jpg')}
            style={styles.image}>
                <Swipe
                    data={DATA}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    />
                
            </ImageBackground>
        )
    }
}

const styles = {
    image: {
        flex: 1,
        resizeMode: 'cover',
        marginTop:20
      },
    
   
}

export default MatchScreen;