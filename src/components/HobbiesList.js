import React,{Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import * as actions from '../actions';
import {connect} from 'react-redux';
import { ModalView } from './common';
import EditPropComponent from './EditPropComponent';

const DATA = [
    {id:1,label:'Musique',value:'Musique'},{id:2,label:'Danse',value:'Danse'},{id:3,label:'Soirée',value:'Soirée'},
    {id:4,label:'Voyage',value:'Voyage'},{id:5,label:'Tourisme',value:'Tourisme'},{id:6,label:'Randonné',value:'Randonné'},
    {id:7,label:'Lecture',value:'Lecture'},{id:8,label:'Apéro',value:'Apéro'},{id:9,label:'Chanté',value:'Chanté'},
    {id:10,label:'Actualité',value:'Actualité'},{id:11,label:'Sport',value:'Sport'},{id:12,label:'Football',value:'Football'},
    {id:13,label:'Basket',value:'Basket'},{id:14,label:'Tenis',value:'Tenis'},{id:15,label:'Natation',value:'Natation'},
    {id:16,label:'Etudié',value:'Etudié'},{id:17,label:'Discuter',value:'Discuter'},{id:18,label:'Balade',value:'Balade'},
];
class HobbiesList extends Component {
    state = {visible:false};
    hobbiesEdits(){
        this.setState({visible:true})
    }

    isInHobbies=(value)=>{
        const {hobbies} = this.props.user;
        return hobbies.some(it=>it.value===value);
    }
    
    onValueChange(value){
        const {hobbies} = this.props.user;
        const colors = ['#fa0a','#0faa','#0afa','#af0a','#ddda']
        const temp = hobbies;
        const item = {id:value.toLowerCase(),label:value,value}
        console.log(this.isInHobbies(value));
        if(!this.isInHobbies(value)){
            temp.push(item);  
            this.props.EditUserProp('hobbies',temp)
        } else if(this.isInHobbies(value)){
            const rmvalue=temp.filter(it=>it.value!==value) ;
            this.props.EditUserProp('hobbies',rmvalue)
        } 
        
     }
    renderItem(){
        const {hobbies} = this.props.user;
        const len = hobbies.length;
        const colors = ['#f00a','#0faa','#ff0a','#0ffa','#00fa'];
        return hobbies.map((item,i)=>{
            return <Text style={{color:colors[i],fontSize:20}} key={item.id}>#{item.value}</Text>
        })
    }
    render(){
        return (
            <View>
                {this.renderItem()}
                <ModalView 
                    visible={this.props.EditVisible}
                    closeModal={()=>this.props.closeModalEdit()}
                    
                    >
                    <View style={styles.container}>
                       
                        <View style={styles.viewStyle}>
                           
                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            </View>
                            
                            <EditPropComponent type="select" values={DATA} 
                            onValueChange={(value)=>this.onValueChange(value)}
                            max={5}
                            value = {this.props.user.hobbies}
                            multiple={true}/>
                        </View>
                            
                    </View>
                    
                    
                </ModalView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor: '#fff',
    },
    viewStyle:{
        flex:1,
        backgroundColor: '#fff',
        marginTop:50,
        marginBottom:20
    }
});
mapStateToProps = (state)=>{
    const user = state.user;
    return {user}
}
export default connect(mapStateToProps,actions)(HobbiesList);