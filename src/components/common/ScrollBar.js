import React,{useState,useRef} from 'react';
import {View, StyleSheet,ScrollView} from 'react-native';


const ScrollBar = ({children,scrolling}) => {
    
    const scrollElementHeightPercent = 25;


    const [contentOffset,setContentOffset] = useState({x:0,y:0});
    const [contentSize,setContentSize] = useState(0);
    const [scrollHeightView,setScrollHeightView] = useState(0);
    const scrollRef = useRef()

    let scrolPosPercent;
    if(contentOffset.y>0){
        scrolPosPercent = 
            (contentOffset.y / (contentSize-scrollHeightView))*(100-scrollElementHeightPercent);
    }
    const onScroll=(event,p)=>{
        scrolling(event);
        if(p){
            scrollRef.current?.scrollTo({...event, animated:true})
        }
        setContentOffset(event.nativeEvent.contentOffset)
    };

    return (
    <View style={{backgroundColor:'#fff', borderRadius:8,overflow:'hidden'}}>
        <View style={styles.barStyle} >
            <View style={{
            width: 8,
            borderRadius: 8,
            backgroundColor: '#0af',
            height:scrollElementHeightPercent,
            top:scrolPosPercent,
            position:'absolute',
            left:-1
            
             } }/>
        </View>
        <ScrollView
            ref={scrollRef}
            onScroll={(event)=>onScroll(event)}
            showsVerticalScrollIndicator={false}
            
            onLayout={
                (e)=>{
                    setScrollHeightView(e.nativeEvent.layout.height)
                }
            }

            onContentSizeChange={(_,height)=>{
                setContentSize(height)
            }}
            disableScrollViewPanResponder
            automaticallyAdjustContentInsets={false}

            >
            {children}
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create(
    {
        
        barStyle:{
            width:6,
            height:100,
            borderRadius:8,
            position: 'absolute',
            right:10,
            top:10,
            backgroundColor:'#ccc7',
            elevation:1
        },
        
       
    }

)

export {ScrollBar}