import React , {Component} from 'react';
import  {View, Slider,Text,StyleSheet,Dimensions} from 'react-native';
import {PickerIos} from './common';
import * as actions from '../actions';
import {connect} from 'react-redux';
const INPUT_TYPE="input";
const SELECT_TYPE="select";
const SLIDER_TYPE="slider";
class EditPropComponent extends Component {
    state ={slideV:1}
    renderEdit(){
        
        const {type} = this.props;
        switch (type) {
            case INPUT_TYPE:
                return <Text>input type</Text>;
            case SELECT_TYPE:
                return (<View style={{justifyContent:'center',alignItems:'center'}}>
                    <PickerIos values={this.props.values} 
                    multiple = {this.props.multiple}
                    max={this.props.max}
                    value={this.props.value} onValueChange={(value)=>this.props.onValueChange(value)}/>
                </View>);
            case SLIDER_TYPE:
                return  (<View style={styles.container}>
                    <Text style={{fontSize:30}}>{this.props.value?this.props.value.toFixed(2):1} {this.props.unit}</Text>
                    <Slider
                    style={{width: 180, height: 40,transform: [{ scaleX: 2 }, { scaleY: 2 }]}}
                        minimumValue={this.props.min}
                        maximumValue={this.props.max}
                        minimumTrackTintColor="#0cf"
                        maximumTrackTintColor="#a00"
                        thumbTintColor = "#0af"
                        step={this.props.step}
                        value={this.props.value?this.props.value:this.props.min}
                        onValueChange={(value)=>this.props.onValueChange(value)}
                />
                </View>);
               
        
            default:
                return null;
        }

    }
    render (){
       
           return (
               <View >
                   <Text style={styles.text}>{this.props.label}</Text>
                   {this.renderEdit()}
               </View>
           )

    }
}


const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent: 'center',
    },
    text:{
        alignSelf: 'center',
        fontSize:30,
        marginBottom:20
    }
})

export default connect(null,actions)(EditPropComponent);