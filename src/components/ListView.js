import React, {Component} from 'react';
import {Text, View} from 'react-native';

class ListView extends Component {
    renderList(){
        return this.props.data.map(
            (item,i)=>{
                return this.props.renderItem(item)
            }
        )
    }
    render(){
        return <View style={styles.viewStyle}>
            <View  style={styles.listViewStyle}>
                {this.renderList()}
            </View>
        </View>
    }
}

const styles = {
    listViewStyle:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    viewStyle:{
        flex:1,
        backgroundColor:'#fffa',
    }
}
export default ListView;