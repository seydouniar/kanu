import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import {View,Text,TouchableWithoutFeedback,Dimensions} from 'react-native';
import Moment from 'moment';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DatePicker = ({value,onChangeDate,placeholder,show,onPress}) => {
    
    const now = new Date(Moment.now());
    
    return(
        <View>
            <TouchableWithoutFeedback onPress={onPress}>
                <View>
                 <Text style={styles.textStyle}>Date de naissance: {value?value:placeholder}</Text>
                </View>
            </TouchableWithoutFeedback>
            {show?<DateTimePicker
                value={now}
                mode="date"
                display="default"
                onChange={onChangeDate} />:null}
        </View>
    )
}

const styles = {
    textStyle : {
        fontSize: 20,
        right: 10
    }
}

export {DatePicker};