import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import {Input} from 'react-native-elements';
import {View,TouchableWithoutFeedback} from 'react-native';
import Moment from 'moment';

const DatePicker = ({value,onChangeDate,placeholder,show,onPress}) => {
    
    const now = new Date(Moment.now());
    
    return(
        <View>
            <TouchableWithoutFeedback onPress={onPress}>
                <View>
                <Input 
                value={value} 
                placeholder={placeholder}
                editable={false} 
                focusable={false}
                />
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

export {DatePicker};