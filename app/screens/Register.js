import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Pressable, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useId, useLayoutEffect, useRef, useState } from 'react'
import { Images } from '../../utils/Images'
import { color } from '@rneui/base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, db } from '../firebase'

import { collection, setDoc, addDoc, doc, updateDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'


const Register = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [userName, setUsername] = useState('')
    const [createPassword, setCreatepassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('')
    
 
    // handle regisetr process

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerShown: true,
            headerTintColor: 'white',
            title: 'Login'
        })
    },[])


    

    const handleRegister = async () => {
        setError('')
        if (userName != "" && createPassword != "") {
            setLoader(true)
            setError('')
        }
        
        setLoader(false)
        navigation.navigate('Userid',{email:email,password:createPassword})

        // register to fire base auth


    }

    // firebase add user



    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#1a303f",
            }}
        >

            <View style={{
                width: '90%',
                height: 'auto',
                alignItems: 'center',

            }}>

                <Text style={{ fontSize: 20, color: 'white' }}>Create new account</Text>
                {
                    error != "" &&
                    <Text style={{ fontSize: 14, color: 'red' }}>{error}</Text>

                }

                <View style={{ width: "100%", marginTop: 20 }}>

                    <TextInput
                        placeholder='Email'
                        style={styles.textInput}
                        placeholderTextColor={"gray"}
                        onChangeText={email => setEmail(email)}
                        keyboardType='email-address'
                      
                    
                 
                    />
                  
                    <TextInput
                        placeholder='Create password'
                        style={styles.textInput}
                        placeholderTextColor={"gray"}
                        secureTextEntry
                        onChangeText={createPassword => setCreatepassword(createPassword)}
                  
                    />
                   
                    

                    <Pressable onPress={handleRegister} android_ripple={{ color: 'gray' }} style={{ width: '100%', height: 50, marginTop: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10 }}>
                        {
                            !loader ?
                                <Text style={{ color: 'black', fontSize: 16 }}>Next</Text>
                                : <ActivityIndicator color={"black"} />
                        }

                    </Pressable>



                </View>

            </View>

        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        marginTop: 15,
        color: 'white'
    }
})