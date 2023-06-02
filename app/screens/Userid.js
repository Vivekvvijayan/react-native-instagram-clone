import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../utils/Images'



import { setToken, setUser } from '../slice/userSlice'
import { collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage'

const Userid = ({ navigation, route }) => {
    const { email, password } = route.params
    const [accId, setAccId] = useState('')

    const [name, setName] = useState('')
    const [loader, setLoader] = useState(false)
    const [profileURL, setProfileURL] = useState(Images.user)
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    const setAccountId = async () => {
        setLoader(true)


        // update acc info

        try {
            createUserWithEmailAndPassword(auth, email, password).then(response => {

                const { user } = response
                const { email } = user


                const imageRef = ref(storage, `users/${email}/profile`);

                fetch(profileURL).then(profile => {
                    profile.blob().then(data => {
                        uploadBytes(imageRef, data).then((snapshot) => {


                            getDownloadURL(imageRef).then(uri => {
                                const userProfile = {
                                    accId,
                                    displayName: name,
                                    email,
                                    followers: [],
                                    following: [],
                                    profileURL:uri,
                                    posts: []

                                }


                                AsyncStorage.setItem('accessToken', email).then(() => {
                                    
                                    dispatch(setToken(email))
                                  
                                        
                                })
                                setDoc(doc(db, "users", email), userProfile).catch(err => {
                                    setError('Something went wrong!')
                                })
                                setLoader(false)

                            }).catch(err => {
                                console.log(err);
                                
                            })
                        }).catch(err => console.log(err))

                    });
                }).catch(err =>console.log(err))
            }).catch(err => console.log(alert(err.code)))




        } catch (err) {
            setError('Error')
        }





       

    }


    const selectPic = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,

        })

        if (!result?.canceled) {
            setProfileURL(result?.assets[0].uri)
        }
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
                height: 250,
                alignItems: 'center'

            }}>
                <TouchableWithoutFeedback onPress={selectPic}>

                    <Image
                        source={{ uri: profileURL }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}

                    />

                </TouchableWithoutFeedback>
                <View style={{ width: "100%", marginTop: 20 }}>
                    {
                        error != "" &&
                        {/* <Text style={{textAlign:'center',color:'#FD1D1D'}}>{error}</Text> */ }
                    }
                    <TextInput
                        placeholder='Create Account ID'
                        style={styles.textInput}
                        placeholderTextColor={"gray"}
                        onChangeText={accId => setAccId(accId)}
                        value={accId}
                        autoCapitalize='none'

                    />
                    <TextInput
                        placeholder='Name'
                        style={styles.textInput}
                        placeholderTextColor={"gray"}
                        onChangeText={name => setName(name)}
                        value={name}
                    />

                    <Pressable onPress={setAccountId} android_ripple={{ color: 'gray' }} style={{ width: '100%', height: 50, marginTop: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0163e1', borderRadius: 10 }}>

                        {

                            !loader ? <Text style={{ color: 'white', fontSize: 16 }}>Next</Text> : <ActivityIndicator color={"white"} />

                        }
                    </Pressable>



                </View>

            </View>

        </View>
    )
}

export default Userid

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        height: 50,

        borderBottomColor: 'white',
        borderBottomWidth: 1,
        padding: 10,
        marginTop: 15,
        color: 'white'
    }
})