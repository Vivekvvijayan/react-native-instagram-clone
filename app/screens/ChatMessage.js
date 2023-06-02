import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react'
import { Images } from '../../utils/Images'

import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'


const ChatMessage = ({ route, navigation }) => {
    const { user } = route.params

    const [messages, setMessages] = useState([])
    const [userMessage,setUserMessage] = useState('')
    useEffect(() => {
      
        setMessages([
            {
                id:1,
                userName:"vivek",
                message:"nee eppola varunne"

            },
            {
                id:2,
                userName:"vishal",
                message:"varoola ippol"
            },
            {
                id:3,
                userName:"vivek",
                message:"athenna"
            },
        ])
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: () => {
                return (
                    <View>
                        <Text style={{ fontSize: 16 }}>{user}</Text>

                    </View>
                )
            }
        })
    })


    const sendMessage = () => {
      setMessages([...messages,{
        id:Date.now(),
        userName:"vivek",
        message:userMessage
      }])
      setUserMessage('')
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <ScrollView>
                {
                    messages?.map((message) => <Message message={message} key={message.id}/>)
                }
            </ScrollView>



            {/* input box */}
            <View style={{ width: '100%', height: 45, position: 'absolute', bottom: 5, left: 5, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '93%', height: '100%', backgroundColor: 'lightgray', borderRadius: 25, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>

                    <TextInput
                        placeholder='Message...'
                        style={{
                            width: '80%',
                            padding: 5,

                            borderRadius: 25,

                            height: '100%',
                            

                        }}
                        onChangeText={text => setUserMessage(text)}
                        value={userMessage}
                    />

                    <Text style={{ fontSize: 18, paddingRight: 5, color: '#405de6' }} onPress={sendMessage}>Send</Text>
                </View>
            </View>

        </View>



    )


}

export default ChatMessage


const Message = ({ message }) => {
    const USER = "vivek"
    return (
        <View style={{maxWidth:'60%',backgroundColor:'#405de6',borderRadius:20,marginHorizontal:10,marginVertical:4,alignSelf:message.userName === USER ? 'flex-end':'flex-start'}}>

            <Text style={{padding:10,color:'white'}}>{message?.message}</Text>
        </View>
    )
}


const styles = StyleSheet.create({})