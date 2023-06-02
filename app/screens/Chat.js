import { useLayoutEffect } from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import ChatElement from '../components/ChatElement'

const Chat = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:true,
            title:"vivekz_"
           
        })
    })
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
        <ScrollView>

     <ChatElement name="Mohanlal"/>
     <ChatElement name="Mammootty"/>
     <ChatElement name="Vivek Aravikulathillam"/>
     <ChatElement name="Yadhu Gopakumar"/>
   
    
 
        </ScrollView>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})