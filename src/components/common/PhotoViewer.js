import React,{Component} from 'react';
import {Text,View,Modal, StyleSheet,Dimensions, Image} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


class PhotoViewer extends Component {
   
    
    render(){
        
        return <Modal
            animated
            animationType="slide"
            visible={this.props.visible}
            onRequestClose={this.props.onRequestClose}
            onDismiss={this.props.onDismiss}
        >

        <View style={styles.container}>
            <ImageViewer
                imageUrls={this.props.images}
                index={this.props.index}
                enableSwipeDown
                enablePreload
            />
            
        </View>
        </Modal>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
      }
});

export {PhotoViewer};