import { ActivityIndicator, Image, Pressable, TouchableHighlight } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Images } from '../../utils/Images'
import { Button } from 'react-native-elements'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setToken, setUser } from '../slice/userSlice'


const Welcome = ({ navigation,route }) => {
    const dispatch = useDispatch()
  const {accId,profileURL,userName,password} = route.params
  const [loader,setLoader] = useState(false)
  
  useEffect(() => {

    onAuthStateChanged(auth,user => {
        if(user) {
            AsyncStorage.setItem('accessToken',user?.email)
      
            dispatch(setToken(user?.email))
            setLoader(false)
    
        }
    })

}, [auth])

const handleEnter = async() => {
try{

    setLoader(true)
    await signInWithEmailAndPassword(auth,userName,password)
    .catch(err => {
        navigation.navigate('Login')
    })
}catch(err) {
    alert(err)
}
}


    return (
    <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:35}}>Welcome</Text>
        <View style={{width:'100%',height:250,justifyContent:'space-around',alignItems:'center'}}>
            <Image
            source={{uri:profileURL}}
            style={{
                width:100,height:100,
                borderRadius:50
            }}
            />

            <Pressable onPress={handleEnter} android_ripple={{color:'gray',radius:30}} style={{width:'80%',height:50,borderRadius:30,backgroundColor:'rgb(26,115,232)',justifyContent:'center',alignItems:'center'}}>
               {

               !loader ? <Text style={{color:'white'}}>Continue with {accId}</Text> :<ActivityIndicator color={"white"}/>

               }
            </Pressable>
        </View>
      
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})