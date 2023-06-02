import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Images } from '../../utils/Images'
import { color } from '@rneui/base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setUser } from '../slice/userSlice'
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

const Login = ({ navigation }) => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()


    const handleLogin = async () => {
        setError('')
        setLoader(true)
        
        // get firestore user data
        const docRef = doc(db, "users", userName);
        getDoc(docRef).then(doc => {
                    
            if(doc?.exists()){
                const {accId,profileURL} = doc?.data()
                
                navigation.navigate('Welcome',{ accId,profileURL,userName,password})
            }else{
                setError('Error')
            }
        })
            
           

            setLoader(false)
         
       
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#1a303f"
            }}
        >

            <View style={{
                width: '90%',
                height: 300,
                alignItems: 'center'

            }}>

                <Image
                    source={Images.insta}
                    style={{ width: 60, height: 60 }}
                />

                <View style={{ width: "100%", marginTop: 20 }}>
                    {
                        error != "" &&
                    <Text style={{textAlign:'center',color:'#FD1D1D'}}>{error}</Text>
                    }
                    <TextInput
                        placeholder='Username or Email'
                        style={styles.textInput}
                        placeholderTextColor={"gray"}
                        onChangeText={username => setUserName(username)}
                    />
                    <TextInput
                        placeholder='Password'
                        style={styles.textInput}
                        placeholderTextColor={"gray"}
                        secureTextEntry
                        onChangeText={password => setPassword(password)}

                    />
                    <Pressable onPress={handleLogin} android_ripple={{ color: 'gray' }} style={{ width: '100%', height: 50, marginTop: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0163e1', borderRadius: 10 }}>

                        {

                            !loader ? <Text style={{ color: 'white', fontSize: 16 }}>Sign In</Text> : <ActivityIndicator color={"white"} />

                        }
                    </Pressable>



                </View>

            </View>
                    <Pressable onPress={() => navigation.navigate('Register')} android_ripple={{ color: 'gray' }} style={{ width: '90%', height: 40, marginTop: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderColor: 'white', borderWidth: 1,position:'absolute',bottom:20 }}>

                        <Text style={{ color: 'white', fontSize: 16 }}>Create Account</Text>
                    </Pressable>

        </View>
    )
}

export default Login

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