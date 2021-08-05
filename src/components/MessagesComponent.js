import React,{Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {Button} from 'react-native-elements';
import {StyleSheet} from 'react-native'
import * as actions from '../actions';
import {connect} from 'react-redux';

class MessagesComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {messages: []};
      this.onSend = this.onSend.bind(this);
    }
    UNSAFE_componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
          },
        ],
      });
    }


    onSend(messages = []) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages),
        };
      });
    }
    
    render() {

      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: 1,
          }}
        showUserAvatar
        alwaysShowSend
        />
      );
    }
  }

export default connect(null,actions)(MessagesComponent);