import React, {Component} from 'react';
import {View,StyleSheet,TouchableWithoutFeedback,Image} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {ActionSheet,PhotoViewer} from './common';
import {connect} from 'react-redux';
import * as actions from '../actions';

class PhotosList extends Component{
    
    constructor(props){
        super(props)
        this.state={visible:false,
            photoVisible:false,
            position:0,
            data:this.props.user.photos};
        //this.setPhotoUrlFirst();
        this.lastIndex = this.state.data.length;
    }
    componentDidMount(){
        this.uritoUrl();
        this.setPhotoUrlFirst();
    }
  
    async openGalery() {
        await this.props.takeFromLibrary(()=>{
            this.props.addPhoto(this.props.uri,()=>{
                this.props.storeUser(this.props.user)
            });      
        });
        
        this.setState({visible:false});
    }

    async openCamera(){
            await this.props.takeFromCamera(()=>{
            this.props.addPhoto(this.props.uri,()=>{
                this.props.storeUser(this.props.user)
            });
            });
            this.setState({visible:false});
    }

    addPhoto(){
        this.setState({visible:true});
    }

    setPhotoUrlFirst(){
        const {data} = this.state;
        const {photoURL}=this.props.user;
        const dataUp= data;
        if(!dataUp.some(it=>it.url===photoURL)){
            dataUp.push({url:photoURL})
        }
        const photo = dataUp.find(it=>it.url===photoURL);
        const index = dataUp.indexOf(photo);
        const temp = dataUp[index];
        dataUp[index]=dataUp[0];
        dataUp[0]=temp;
        this.setState({data:dataUp});
    }

    showFirstItem(item){
        const {data} = this.state;
        const index = data.indexOf(item);
        this.setState({position:index,photoVisible:true})
    }

    uritoUrl(){
        const {data} = this.state;
        const dataUp = data.map(it=>{
            if(it.uri){
                it['url']=it['uri']
                delete it['uri']
                return it
            }
            return it;
            
        });
        this.setState({data:dataUp})
    }
    renderItem(){
        
        const {data}=this.state;
        return data.map((item,i)=>{
            return <TouchableWithoutFeedback key={i} onPress={this.showFirstItem.bind(this,item)}>
                <View style={styles.itemView}>
                    <Image source={{uri:item.url}} style={styles.imageStyle}/>
                </View>
            </TouchableWithoutFeedback>
        })
    }
    onCloseModal(){
        this.setPhotoUrlFirst();
        this.setState({photoVisible:false});
    }
    render(){
        const {visible,photoVisible,data,position} = this.state;
        return <View style={styles.container}>
            {this.renderItem()}
           {(this.props.editable && this.lastIndex<5) &&
           <TouchableWithoutFeedback onPress= {this.addPhoto.bind(this)} >
                <View style={styles.itemAddView}>
                    <Icon name="plus" size={40} color="#fff" />
                </View>
            </TouchableWithoutFeedback>
            }
            <ActionSheet 
                visible={visible}
                onDismiss={()=>this.setState({visible:false})}
            >
                <View>
                    <Button title="Galérie" type="clear" onPress={this.openGalery.bind(this)}/>
                    <Button title="Camera" type="clear" onPress={this.openCamera.bind(this)} />
                </View>
            </ActionSheet>
            <PhotoViewer 
                images={data} 
                visible={photoVisible} 
                index = {position}
                onDismiss={()=>this.setState({photoVisible:false})}
                onRequestClose={this.onCloseModal.bind(this)} />
        </View>
    }
}

const styles = StyleSheet.create(
    {
        container:{
            justifyContent:'space-around',
            alignItems:'center',
            flexDirection:'row',
            flexWrap:'wrap',
            
        },

        itemView:{
            marginBottom:10,
            justifyContent:'center',
            alignItems:'flex-start',
            margin:5

        },

        imageStyle:{
            width:80,
            height:120
        },

        itemAddView:{
            height:120,
            width:80,
            alignSelf:'stretch',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#ccc'
        }
    }
)

const mapStateToProps = (state) => {
    const user = state.user;
    const image = state.image;
    return {user,uri:image.uri}
}

export default connect(mapStateToProps,actions)(PhotosList);