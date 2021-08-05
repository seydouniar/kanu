import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class ListRowView extends Component {
    renderList(){
        return this.props.data.map(
            (item,i)=>{
                return this.props.renderItem(item)
            }
        )
    }
    render(){
        return <View style={styles.viewStyle}>
            <View  style={styles.ListRowViewStyle}>
                {this.renderList()}
            </View>
        </View>
    }
}

const styles = StyleSheet.create( {
    ListRowViewStyle:{
        
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    viewStyle:{
        flex:1,
       
        backgroundColor:'#fffa',
    }
});

export default ListRowView;