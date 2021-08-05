import React, {useState,useEffect} from 'react';
import {ScrollView,View, Text, TouchableWithoutFeedback, StyleSheet,Dimensions} from 'react-native';

const WIDTH_SCREEN = Dimensions.get('screen').width;

const PickerIos = ({values,multiple=false,value,max,onValueChange}) =>{

    const {selectedItem,unSeletedItem,selectedText,unSelectedText} = styles;

    const [data,setData] = useState(values);

    useEffect(()=>{
        const updateData = data.map(it=>{
            if(it.value===value && !multiple){
                return {...it,selected:true};
            }else if(!multiple){
                return {...it,selected:false};
            }else if (multiple){
                if(value.some(item=>it.value===item.value)){
                    return {...it,selected:true};
                }else{
                    return {...it,selected:false};
                }
            }
            
            
        });
        setData(updateData);
    },[])
    
    const onSelectItem = (item)=>{
        const updateData = data.map(it=>{
            if(it.id===item.id){
                onValueChange(item.value);
                value=item.value;
                return {...item,selected:true};
            }else{     
                return {...it,selected:false};
            }
            
            
        });
        setData(updateData);
    }

    

    
    const onSelectMultipleItem = (item)=>{
        const selectedData = data.filter(item=>item.selected===true);
        const selectedCount = selectedData.length;
        
        const updateData = data.map((it,i)=>{
           
            if(it.id===item.id){
                if(!it.selected  && selectedCount<max){
                    onValueChange(item.value);
                    value=item.value;
                    return {...item,selected:!item.selected};
                }else if(it.selected && selectedCount<=max){
                    onValueChange(item.value);
                    return {...item,selected:!item.selected};
                }
                
            }
            return  it;
        });
        setData(updateData);
    }

    if(!multiple){
        
        return <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item,i)=>{
            return <View key={i} >
                    {
                    item.selected ?
                    <TouchableWithoutFeedback onPress={()=>onSelectItem(item)}>
                        <View style={selectedItem}>
                            <Text style={selectedText} key={item.label}>{item.label}</Text>
                        </View>
                    </TouchableWithoutFeedback> :
                    <TouchableWithoutFeedback onPress={()=>onSelectItem(item)}>
                        <View style={unSeletedItem}>
                            <Text style={unSelectedText} key={item.label}>{item.label}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    }
                </View>
             
            })}    
       </ScrollView>
    }else {
       
        return <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item,i)=>{
            return <View key={i} >
                {
                    item.selected ?
                    <TouchableWithoutFeedback onPress={()=>onSelectMultipleItem(item)}>
                        <View style={selectedItem}>
                            <Text style={selectedText} key={item.label}>{item.label}</Text>
                        </View>
                    </TouchableWithoutFeedback> :
                    <TouchableWithoutFeedback onPress={()=>onSelectMultipleItem(item)}>
                        <View style={unSeletedItem}>
                            <Text style={unSelectedText} key={item.label}>{item.label}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
                </View>
             
            })}
        </ScrollView>
    }
    
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        justifyContent:'center',
        bottom:0
    },
    selectedItem:{
        width:WIDTH_SCREEN-100,
        marginBottom:5,
        padding:5,
        borderWidth:1,
        borderRadius:8,
        borderColor:'#0cfa'
    },
    unSeletedItem:{
        width:WIDTH_SCREEN-100,
        marginBottom:5,
        padding:5,
        borderWidth:0.5,
        borderRadius:8,
        borderColor:'#555'

    },
    selectedText:{
        fontSize:25,
        color:'#0cfa'
    },

    unSelectedText:{
        fontSize:25,
        color:'#999'
    }


});

export {PickerIos};