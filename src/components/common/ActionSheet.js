import React, {Component} from 'react';
import {Modal,View, Animated,
    PanResponder,Dimensions,
    TouchableWithoutFeedback
  } from 'react-native';

class ActionSheet  extends Component {

    constructor(props) {
        super(props);
        this.state = {
          panY: new Animated.Value(Dimensions.get('screen').height)
        };
        this._resetPositionAnim = Animated.timing(this.state.panY, {
          toValue: 0,
          duration: 300,
          useNativeDriver:false
        });
        this._closeAnim = Animated.timing(this.state.panY, {
          toValue: Dimensions.get('screen').height,
          duration: 500,
          useNativeDriver:false
        });

        this._panResponders = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderMove: Animated.event([
                null, {dy: this.state.panY}
              ],{useNativeDriver:false}),
            onPanResponderRelease: (e, gs) => {
              if (gs.dy > 0 && gs.vy > 2e-7) {
                return this._closeAnim.start(() => this.props.onDismiss());
              }
              return this._resetPositionAnim.start();
            },
          });
      }

    componentDidUpdate(prevProps, prevState) {
        if (
          prevProps.visible !== this.props.visible 
          && this.props.visible
        ) {
          this._resetPositionAnim.start();
        }
      }
      _handleDismiss() {
        this._closeAnim.start(() => this.props.onDismiss());
      }

    render(){
        const top = this.state.panY.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0, 0, 1],
          });

        return (
            <Modal 
                animated
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                style={styles.modalStyle}
                onRequestClose={this._handleDismiss.bind(this)}
            >
            <TouchableWithoutFeedback >
              <View style={styles.overlay}>
                  <Animated.View style={[styles.container, {top}]} {...this._panResponders.panHandlers}>
                      {this.props.children}
                  </Animated.View>  
              </View> 
            </TouchableWithoutFeedback>
            </Modal>
        );
    }
}


const styles = {
    overlay:{
        justifyContent:'flex-end',
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    container: {
        backgroundColor: 'white',
        paddingTop: 10,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
      }
   
}

export {ActionSheet};