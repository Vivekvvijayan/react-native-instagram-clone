import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React from 'react'
import StoryItems from './StoryItems'
import { Images } from '../../utils/Images'
import { useNavigation } from '@react-navigation/native'
const ChatElement = ({ name }) => {
    const navigation = useNavigation()
  return (
    <Pressable android_ripple={{color:"#ddddd"}} onPress={() =>navigation.navigate('ChatMessage',{user:name})}> 

    
    <View style={{width:'100%',padding:10 ,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>

      <StoryItems />
      <View style={{paddingLeft:10}}>
      <Text style={{fontSize:16}}>{name}</Text>
      <Text style={{color:'gray',fontSize:13}}>Active 1h ago</Text>

      </View>
      </View>
      <Image source={Images.camera}  style={{width:25,height:25,marginRight:15}}/>
    </View>
    </Pressable>
  )
}

export default ChatElement

const styles = StyleSheet.create({})