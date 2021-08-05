import React, { Component } from 'react';
import {Dimensions, Text,ImageBackground,View,TouchableWithoutFeedback} from 'react-native';
import Swipe from '../components/Swipe';
import {Card} from 'react-native-elements';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as actions from '../actions';

const WIN_HEIGHT = Dimensions.get('window').height;
const DATA = [
    { id: 1, text: 'Card #1', uri: 'https://www.linkpicture.com/q/7d9f4c4e593e55c5eb2f96b0b90db583.jpg',l:0 },
    { id: 2, text: 'Card #2', uri: 'https://www.linkpicture.com/q/57b567bc81e66408fb78988992eaaa07.jpg',l:0},
    { id: 3, text: 'Card #3', uri: 'https://www.linkpicture.com/q/d540c54d3341a6996cae4c101a1f07bc.png',l:0},
    { id: 4, text: 'Card #4', uri: 'https://www.linkpicture.com/q/57b567bc81e66408fb78988992eaaa07.jpg',l:0 },
    { id: 5, text: 'Card #5', uri: 'https://www.linkpicture.com/q/7d9f4c4e593e55c5eb2f96b0b90db583.jpg',l:0 },
    { id: 6, text: 'Card #6', uri: 'https://www.linkpicture.com/q/d540c54d3341a6996cae4c101a1f07bc.png',l:0 },
     ];

class MatchScreen extends Component {
  
  state={data:DATA}
   
  componentDidMount(){
    this.props.getAllUser()
  }

  renderCard(item,onLike,onDislike) {  
    return (
      <Card key={item.id} containerStyle={{padding:0,borderRadius:20}}>
        <Card.Image source= {{ uri: item.photoURL }} style={{height:WIN_HEIGHT-240,borderRadius:20}}/>
        <Card.Title>{item.name}</Card.Title>
        <View style={styles.iconViewStyle}>
          <TouchableWithoutFeedback onPress={()=>onDislike()}>
            <View style={styles.iconStyle}>
                <IonIcons name="close" color="gray" size={40} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.iconStyle}>
                <IonIcons name="refresh" color="blue" size={40} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=>onLike()}>
            <View style={styles.iconStyle}>
                <IonIcons name="heart" color="red" size={40} />
            </View>
          </TouchableWithoutFeedback>
        </View>
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

  onLike() {
    console.log("like");
    
  }

  onDislike(){
    console.log("dislike");
    console.log(this.refs);
  }
    render() {
        return(
            <ImageBackground 
            source = {require('../../assets/img/background.jpg')}
            style={styles.image}>
                <Swipe
                    data={this.props.users}
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
      },

      iconStyle:{
        width:40,
        height:40,
        marginRight:30,
        backgroundColor:'#cccc',
        borderRadius:20,
        justifyContent:'space-around',
        alignItems:'center',
        elevation:2
        
    },

    iconViewStyle:{
      flex:1,
      flexDirection:'row',
      alignSelf:'center',
      marginBottom:10
  }
    
   
}
const mapStateToProps = state => {
  const users = state.match;
  return {users};
}
export default connect(mapStateToProps,actions)(MatchScreen);