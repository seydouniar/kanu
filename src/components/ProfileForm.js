import React, { Component } from 'react';
import {View,StyleSheet,Platform} from 'react-native'
import {Input,ListItem,Text,Button} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ActionSheet,GooglePlaceInput} from './common'
import {connect} from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';

class ProfileForm extends Component{
    static defaultProps = {
        name:"",
        birth:"01/01/2000",
        relation:"",
        job:"",
        sexe:"",
        localisation:{name:"",coords:{lat:0,lng:0}}
    }
    state = {
        show:false,
        visibleSexe:false,
        visibleRelation:false,
        visibleLocation:false
    }
    

    formatDate(date){
        return moment(date).format('DD/MM/YYYY');
    }
    setRelationChange(value){
        this.setState({visibleRelation:false});
        this.props.EditUserProp('relation',value)
    }
    onChangeName(name) {
        this.props.EditUserProp('name',name); 
    }
    setSexeChange(value){
        this.props.EditUserProp('sexe',value);
        this.setState({visibleSexe:false});
    }

    setDateChange(event,value){
        this.setState({show:false});
        this.props.EditUserProp('birth',this.formatDate(value));
        
        
    }
    setLocation(loc){
        this.setState({visibleLocation:false});
        this.props.EditUserProp('localisation',{
            name:loc.formatted_address,
            coords:loc.geometry.location
        });
    }

    onValideUser(){
        this.props.storeUser(this.props.user);
    }

    render(){
        const {name,birth,sexe,relation,localisation} = this.props.user;
        const {show,visibleRelation,visibleSexe,visibleLocation} = this.state;
        return (<View>
            <Input label="Nom" 
            value={name?name:this.props.name}
            placeholder="Nom complet" 
            onChangeText={this.onChangeName.bind(this)}
            leftIcon={{type:"font-awesome", name:"user"}}/>

            <ListItem bottomDivider onPress={()=> this.setState({show:true})}>
                <Icon name="birthday-cake" size={25} />
                <ListItem.Content>
                    <ListItem.Title>Né(e) le:</ListItem.Title>
                </ListItem.Content>
                <Text>{birth?birth:this.props.birth}</Text>
                <ListItem.Chevron />
            </ListItem>
            
            <ListItem bottomDivider onPress={()=>this.setState({visibleSexe:true})}>
                <Icon name="universal-access" size={25} />
                <ListItem.Content>
                    <ListItem.Title>Sexe</ListItem.Title>
                </ListItem.Content>
                <Text>{sexe?sexe:this.props.sexe}</Text>
                <ListItem.Chevron />
            </ListItem>

            <ListItem bottomDivider onPress={()=>this.setState({visibleRelation:true})}>
                <Icon name="heart" size={25} />
                <ListItem.Content>
                    <ListItem.Title>Relation</ListItem.Title>
                </ListItem.Content>
                <Text>{relation?relation:this.props.relation}</Text>
                <ListItem.Chevron />
            </ListItem>

            <ListItem bottomDivider onPress={()=>this.setState({visibleLocation:true})}>
                <Icon name="street-view" size={25} />
                <ListItem.Content>
                    <ListItem.Title>Localisation</ListItem.Title>
                </ListItem.Content>
                <Text>{localisation.name}</Text>
                <ListItem.Chevron />
            </ListItem>

            {this.props.isFirst&&<Button title="Enrégistrer" type="outline" onPress={this.onValideUser.bind(this)} />}

            {show && <DateTimePicker 
            mode="date"
            testID="dateTimePicker"
            onChange={this.setDateChange.bind(this)}
            display="spinner"
            value={new Date(birth?birth:this.props.birth)}
            
            />}

            <ActionSheet visible={visibleLocation}
                onDismiss={()=>{}}>
                <View style={{height:200}}>
                    <View style={{flex:1}}>
                        <GooglePlaceInput notifyChange={this.setLocation.bind(this)}/>
                    </View>
                    
                    
                    
                </View>
            </ActionSheet>

            <ActionSheet visible={visibleSexe}
                onDismiss={()=>{}}
                >
                <View>
                    <Button title="Homme" type="clear" 
                        onPress={this.setSexeChange.bind(this,'Homme')}
                    />
                    <Button title="Femme" type="clear" 
                         onPress={this.setSexeChange.bind(this,'Femme')}
                    />
                </View>
            </ActionSheet>

            <ActionSheet visible={visibleRelation}
                onDismiss={()=>{}}>
                <View>
                    <Button title="Celibataire" type="clear" onPress={this.setRelationChange.bind(this,'Celibataire')} />
                    <Button title="Marié(e)" type="clear" onPress={this.setRelationChange.bind(this,'Marié(e)')} />
                    <Button title="Divorcé(e)" type="clear" onPress={this.setRelationChange.bind(this,'Divorcé(e)')}/>
                    <Button title="Veuf(ve)" type="clear" onPress={this.setRelationChange.bind(this,'Veuf(ve)')} />
                </View>
            </ActionSheet>

            

        </View>);
    }
}




const styles = StyleSheet.create(
    {

    }
);

const mapStateToprops = state=>{
    user = state.user;
    return {user};
}

export default connect(mapStateToprops,actions)(ProfileForm);