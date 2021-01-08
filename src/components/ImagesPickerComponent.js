import React, { Component } from 'react';
import { CameraRoll } from 'react-native';
import {Modal,View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class ImagePickerComponent extends Component{

    state = { photos: null, selectedPhoto: null };

    componentDidMount(){
        const { navigation } = this.props;
        navigation.setParams({ upload: this.upload });
        this.getPhotosAsync({ first: 100 });
    }

    async getPhotosAsync(params) {
        return new Promise((res, rej) =>
          CameraRoll.getPhotos(params)
            .then(data => {
              const assets = data.edges;
              const photos = assets.map(asset => asset.node.image);
              this.setState({ photos });
              res({ photos });
            })
            .catch(rej)
        );
      }
    render(){
        return (
            <Modal 
                animationType="slide"
                transparent={true}
                visible={this.props.visibleGalery}
                style={styles.modalStyle}
                onRequestClose={this.props.onRequestCloseGalery}
                >
                <View style={styles.container}>
                    <FlatList horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={photo => {
                        return this.renderPhoto(photo);
                    }}
                    keyExtractor={(photo, index) => index.toString()}
                    data={this.state.photos}
                    />
                </View>
            </Modal>
        )
        }  
    }

    const styles = {
        container:{
            flex:1,
            justifyContent:'center',
            marginTop: 22,
            marginBottom:22,
            borderRadius:20
    
        }
    }
    export default ImagePickerComponent;